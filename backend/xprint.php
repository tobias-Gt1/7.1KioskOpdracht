<?php

/**
 * Xprinter Network Print Service
 * Automatische bonprinter voor kiosk
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Printer configuratie
$PRINTER_HOST = getenv('PRINTER_HOST') ?: 'localhost';
$PRINTER_PORT = getenv('PRINTER_PORT') ?: 9100;
$PRINTER_TIMEOUT = 5;

function sendResponse($success, $message = '', $error = null)
{
    http_response_code($success ? 200 : 400);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'error' => $error,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

// Test verbinding
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['test'])) {
    try {
        $socket = @fsockopen($PRINTER_HOST, $PRINTER_PORT, $errno, $errstr, $PRINTER_TIMEOUT);

        if ($socket) {
            fclose($socket);
            sendResponse(true, 'Printer bereikbaar', null);
        } else {
            sendResponse(false, 'Printer niet bereikbaar', $errstr ?: 'Onbekende fout');
        }
    } catch (Exception $e) {
        sendResponse(false, 'Verbindingsfout', $e->getMessage());
    }
}

// Print aanvraag
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input || !isset($input['action']) || $input['action'] !== 'print') {
            sendResponse(false, 'Ongeldige aanvraag', 'Action print vereist');
        }

        if (!isset($input['items']) || !is_array($input['items'])) {
            sendResponse(false, 'Items ontbreken', 'Items array is verplicht');
        }

        $escPosReceipt = buildEscPosReceipt($input);

        // Verstuur naar printer
        $socket = @fsockopen($PRINTER_HOST, $PRINTER_PORT, $errno, $errstr, $PRINTER_TIMEOUT);

        if (!$socket) {
            sendResponse(false, 'Kan niet verbinden met printer', $errstr ?: 'Verbindingsfout');
        }

        fwrite($socket, $escPosReceipt);
        fclose($socket);

        sendResponse(true, 'Bon succesvol geprint', null);
    } catch (Exception $e) {
        sendResponse(false, 'Serverfout', $e->getMessage());
    }
} else {
    http_response_code(405);
    sendResponse(false, 'Methode niet toegestaan', 'Gebruik POST');
}

function buildEscPosReceipt($data)
{
    $cmd = [
        'init'      => "\x1B\x40",
        'center'    => "\x1B\x61\x01",
        'left'      => "\x1B\x61\x00",
        'bold_on'   => "\x1B\x45\x01",
        'bold_off'  => "\x1B\x45\x00",
        'cut'       => "\x1D\x56\x00",
        'newline'   => "\n"
    ];

    $output = $cmd['init'];
    $output .= $cmd['newline'] . $cmd['newline'];

    // Header
    $output .= $cmd['center'] . $cmd['bold_on'];
    $output .= "Happy Herbivore" . $cmd['newline'];
    $output .= $cmd['bold_off'];
    $output .= "Healthy in a Hurry" . $cmd['newline'];
    $output .= $cmd['newline'];

    // Ordernummer (groot en centered)
    if (isset($data['orderNumber'])) {
        $output .= $cmd['bold_on'];
        $output .= "ORDER #" . $data['orderNumber'] . $cmd['newline'];
        $output .= $cmd['bold_off'];
        $output .= $cmd['newline'];
    }

    // Service info
    $output .= $cmd['left'];
    $service = isset($data['service']) ?
        ($data['service'] === 'dine-in' ? 'Hier eten' : 'Meenemen') :
        'Bestelling';
    $output .= "Service: " . $service . $cmd['newline'];
    $output .= str_repeat("-", 40) . $cmd['newline'];

    // Items
    $total = 0;
    if (isset($data['items']) && is_array($data['items'])) {
        foreach ($data['items'] as $item) {
            $qty = str_pad($item['quantity'], 2, " ", STR_PAD_LEFT);
            $name = substr($item['name'], 0, 23);
            $name = str_pad($name, 23, " ");
            $price = $item['price'] * $item['quantity'];
            $priceStr = 'EUR' . str_pad(number_format($price, 2), 6, " ", STR_PAD_LEFT);

            $output .= $qty . "x " . $name . " " . $priceStr . $cmd['newline'];
            $total += $price;
        }
    }

    $output .= str_repeat("-", 40) . $cmd['newline'];

    // Totaal
    if (isset($data['discount']) && $data['discount'] > 0) {
        $output .= "Korting:        EUR" . str_pad(number_format($data['discount'], 2), 6, " ", STR_PAD_LEFT) . $cmd['newline'];
        $total -= $data['discount'];
    }

    if (isset($data['donation']) && $data['donation'] > 0) {
        $output .= "Donatie:        EUR" . str_pad(number_format($data['donation'], 2), 6, " ", STR_PAD_LEFT) . $cmd['newline'];
        $total += $data['donation'];
    }

    $output .= $cmd['bold_on'];
    $totalStr = number_format($total, 2);
    $output .= "TOTAAL:         EUR" . str_pad($totalStr, 6, " ", STR_PAD_LEFT) . $cmd['newline'];
    $output .= $cmd['bold_off'];

    // Footer
    $output .= $cmd['newline'];
    $output .= $cmd['center'];
    $output .= "Bedankt voor uw bestelling!" . $cmd['newline'];
    $output .= "Eet smakelijk!" . $cmd['newline'];
    $output .= $cmd['left'];
    $output .= $cmd['newline'] . $cmd['newline'] . $cmd['newline'] . $cmd['newline'];

    // Cut paper
    $output .= $cmd['cut'];

    return $output;
}
