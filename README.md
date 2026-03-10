# Happy Herbivore Kiosk

Een gebruiksvriendelijke bestelkiosk voor het restaurant Happy Herbivore.

## Functionaliteiten

### 🌍 Meertalig Systeem

- Volledige ondersteuning voor 4 talen: Nederlands, Duits, Engels en Frans
- Taalvoorkeur wordt opgeslagen en toegepast op de hele kiosk
- Alle interface-elementen worden vertaald (knoppen, labels, meldingen)

### 🍔 Bestellen

- **Take-away**: Bestelling meenemen
- **Dine-in**: Hier ter plaatse eten
- Categorieën: Burgers, Drankjes, Bijgerechten, Desserts
- Product foto's met fallback ondersteuning
- Winkelwagen met verticale weergave

### 🎟️ Kortingscodes

- **WELCOME10**: 10% korting
- **SUMMER20**: 20% korting
- **EXTRAKORTING**: 15% korting
- **GROOTOOR**: €6,67 korting
- **KEUBURGER**: €10,00 korting

### 📱 Responsive Design

- Volledig responsive voor verschillende schermformaten
- Geoptimaliseerd voor kiosk-formaat (1080x1920 portrait)
- Mobile-first aanpak met breakpoints

### ✨ Extra Features

- Order nummers (1-100) op de bedankpagina
- Productafbeeldingen met fallback bij database uitval
- Smooth animaties en transitions
- Toegankelijkheidsondersteuning (ARIA labels)

## Technologie

- HTML5, CSS3, Vanilla JavaScript
- Custom font: Renos Rough
- LocalStorage voor data persistentie
- Modulaire language systeem (scripts/kiosk-language.js)

## Projectstructuur

- `index.html`, `menu.html`, `cart.html`: kiosk pagina's
- `styles/`: alle CSS bestanden
- `scripts/`: alle frontend JavaScript
- `backend/`: API/print/database bestanden (`server.js`, `xprint.php`, `connect.php`)
- `assets/`: afbeeldingen en logo's
- `media/videos/`: videobestanden
- `docs/`: documentatie

## Huisstijl

- Merkkleur oranje: `#ff7520`
- Merkkleur groen: `#8cd003`
- Accent kleur: `#053631`
- Schaduwen en layered effecten voor moderne uitstraling
