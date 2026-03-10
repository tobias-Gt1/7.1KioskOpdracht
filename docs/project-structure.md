# Project Structure


## Root
- `index.html` - startscherm
- `menu.html` - productoverzicht
- `cart.html` - winkelmand en afrekenen
- `README.md` - projectinformatie
- `package.json` - Node configuratie

## Mappen
- `assets/` - logo's en productafbeeldingen
- `styles/` - alle stylesheets (start, menu, cart, animatie)
- `scripts/` - alle client-side JavaScript
- `backend/` - server- en PHP-bestanden (`server.js`, `connect.php`, `xprint.php`)
- `media/videos/` - videobestanden (zoals `Videokiosk.mp4`)
- `docs/` - documentatie
- `renos-rough-font (1)/` - font bestanden

## Belangrijke routes/paden
- Frontend scripts worden geladen vanaf `scripts/`
- Frontend CSS wordt geladen vanaf `styles/`
- Netwerkprint endpoint: `backend/xprint.php`
