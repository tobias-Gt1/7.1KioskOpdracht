(function () {
  const STORAGE_KEY = "kiosk_language";
  const SUPPORTED = ["nl", "de", "en", "fr"];

  const translations = {
    nl: {
      "index.takeAway": "Bestelling meenemen",
      "index.dineIn": "Hier aan tafel eten",
      "index.languageTitle": "Kies je taal",
      "lang.nl": "Nederlands",
      "lang.de": "Duits",
      "lang.en": "Engels",
      "lang.fr": "Frans",
      "menu.service.default": "Bestellen",
      "menu.service.takeAway": "Meenemen",
      "menu.service.dineIn": "Hier eten",
      "menu.categories": "Categorieen",
      "menu.products": "Onze producten",
      "menu.order": "Je bestelling",
      "menu.checkout": "Afrekenen",
      "menu.recommendations.title": "Vergeet deze niet!",
      "menu.recommendations.subtitle": "Maak je bestelling compleet",
      "menu.recommendations.continue": "Naar winkelwagen",
      "menu.noscript": "Schakel JavaScript in om te bestellen.",
      "menu.category.all": "Alles",
      "menu.category.bowls": "Bowls",
      "menu.category.salads": "Salades",
      "menu.category.wraps": "Wraps & Sandwiches",
      "menu.category.sides": "Sides & Snacks",
      "menu.category.sauces": "Sauces & Dips",
      "menu.category.breakfast": "Ontbijt",
      "menu.category.drinks": "Dranken & Smoothies",
      "menu.add": "Toevoegen",
      "menu.remove": "Verwijderen",
      "menu.decreaseQty": "Verlaag hoeveelheid van {name}",
      "menu.increaseQty": "Verhoog hoeveelheid van {name}",
      "menu.item": "item",
      "menu.items": "items",
      "cart.title": "Winkelmand",
      "cart.pageTitle": "Controleer je bestelling",
      "cart.empty":
        "Je winkelmand is leeg. Kies producten in het menu om verder te gaan.",
      "cart.recommendations": "Nog iets toevoegen?",
      "cart.summary": "Samenvatting",
      "cart.itemCount": "Aantal items",
      "cart.subtotal": "Subtotaal",
      "cart.voucher": "Voucher code",
      "cart.voucherPlaceholder": "Voer code in",
      "cart.voucherApply": "Toepassen",
      "cart.discount": "Korting",
      "cart.total": "Totaal",
      "cart.back": "Terug naar menu",
      "cart.placeOrder": "Bestelling plaatsen",
      "cart.charityTitle": "Wil je doneren aan goed doel?",
      "cart.charityDesc":
        "Voor slechts EUR 0,70 extra help je ons goed doel ondersteunen.",
      "cart.charityYes": "Ja, EUR 0,70 doneren",
      "cart.charityNo": "Nee, niet doneren",
      "cart.thanksTitle": "Bedankt voor je bestelling!",
      "cart.thanksSub": "Het wordt voor u klaargemaakt",
      "cart.orderNumberLabel": "Ordernummer",
      "cart.noscript": "Schakel JavaScript in om je winkelmand te bekijken.",
      "cart.perPiece": "per stuk",
      "cart.add": "+ Toevoegen",
      "cart.voucherInvalid": "Ongeldige voucher code.",
      "cart.voucherApplied": "{code} toegepast! {discount}% korting.",
      "cart.voucherAppliedAmount": "{code} toegepast! {amount} korting.",
      "cart.voucherEnter": "Voer een code in.",
      "cart.decreaseQty": "Verlaag hoeveelheid van {name}",
      "cart.increaseQty": "Verhoog hoeveelheid van {name}",
      "cart.remove": "Verwijderen",
    },
    de: {
      "index.takeAway": "Zum Mitnehmen",
      "index.dineIn": "Hier essen",
      "index.languageTitle": "Sprache waehlen",
      "lang.nl": "Niederlaendisch",
      "lang.de": "Deutsch",
      "lang.en": "Englisch",
      "lang.fr": "Franzoesisch",
      "menu.service.default": "Bestellen",
      "menu.service.takeAway": "Mitnehmen",
      "menu.service.dineIn": "Hier essen",
      "menu.categories": "Kategorien",
      "menu.products": "Unsere Produkte",
      "menu.order": "Ihre Bestellung",
      "menu.checkout": "Zur Kasse",
      "menu.recommendations.title": "Vergiss diese nicht!",
      "menu.recommendations.subtitle": "Vervollständige deine Bestellung",
      "menu.recommendations.continue": "Zum Warenkorb",
      "menu.noscript": "Bitte aktivieren Sie JavaScript, um zu bestellen.",
      "menu.category.all": "Alle",
      "menu.category.bowls": "Bowls",
      "menu.category.salads": "Salate",
      "menu.category.wraps": "Wraps & Sandwiches",
      "menu.category.sides": "Snacks & Beilagen",
      "menu.category.sauces": "Saucen & Dips",
      "menu.category.breakfast": "Fruehstueck",
      "menu.category.drinks": "Getraenke & Smoothies",
      "menu.add": "Hinzufuegen",
      "menu.remove": "Entfernen",
      "menu.decreaseQty": "Menge von {name} verringern",
      "menu.increaseQty": "Menge von {name} erhoehen",
      "menu.item": "Artikel",
      "menu.items": "Artikel",
      "cart.title": "Warenkorb",
      "cart.pageTitle": "Bestellung pruefen",
      "cart.empty": "Ihr Warenkorb ist leer. Waehlen Sie Produkte im Menu aus.",
      "cart.recommendations": "Noch etwas hinzufuegen?",
      "cart.summary": "Zusammenfassung",
      "cart.itemCount": "Anzahl Artikel",
      "cart.subtotal": "Zwischensumme",
      "cart.voucher": "Gutscheincode",
      "cart.voucherPlaceholder": "Code eingeben",
      "cart.voucherApply": "Anwenden",
      "cart.discount": "Rabatt",
      "cart.total": "Gesamt",
      "cart.back": "Zurueck zum Menu",
      "cart.placeOrder": "Bestellung aufgeben",
      "cart.charityTitle": "Moechten Sie fuer einen guten Zweck spenden?",
      "cart.charityDesc":
        "Mit nur EUR 0,70 extra unterstuetzen Sie unseren guten Zweck.",
      "cart.charityYes": "Ja, EUR 0,70 spenden",
      "cart.charityNo": "Nein, nicht spenden",
      "cart.thanksTitle": "Vielen Dank fuer Ihre Bestellung!",
      "cart.thanksSub": "Ihre Bestellung wird vorbereitet",
      "cart.orderNumberLabel": "Bestellnummer",
      "cart.noscript":
        "Bitte aktivieren Sie JavaScript, um den Warenkorb anzuzeigen.",
      "cart.perPiece": "pro Stueck",
      "cart.add": "+ Hinzufuegen",
      "cart.voucherInvalid": "Ungueltiger Gutscheincode.",
      "cart.voucherApplied": "{code} angewendet! {discount}% Rabatt.",
      "cart.voucherAppliedAmount": "{code} angewendet! {amount} Rabatt.",
      "cart.voucherEnter": "Bitte einen Code eingeben.",
      "cart.decreaseQty": "Menge von {name} verringern",
      "cart.increaseQty": "Menge von {name} erhoehen",
      "cart.remove": "Entfernen",
    },
    en: {
      "index.takeAway": "Take away order",
      "index.dineIn": "Dine in",
      "index.languageTitle": "Choose your language",
      "lang.nl": "Dutch",
      "lang.de": "German",
      "lang.en": "English",
      "lang.fr": "French",
      "menu.service.default": "Ordering",
      "menu.service.takeAway": "Take away",
      "menu.service.dineIn": "Dine in",
      "menu.categories": "Categories",
      "menu.products": "Our products",
      "menu.order": "Your order",
      "menu.checkout": "Checkout",
      "menu.recommendations.title": "Don't forget these!",
      "menu.recommendations.subtitle": "Complete your order",
      "menu.recommendations.continue": "Go to cart",
      "menu.noscript": "Enable JavaScript to place an order.",
      "menu.category.all": "All",
      "menu.category.bowls": "Bowls",
      "menu.category.salads": "Salads",
      "menu.category.wraps": "Wraps & Sandwiches",
      "menu.category.sides": "Sides & Snacks",
      "menu.category.sauces": "Sauces & Dips",
      "menu.category.breakfast": "Breakfast",
      "menu.category.drinks": "Drinks & Smoothies",
      "menu.add": "Add",
      "menu.remove": "Remove",
      "menu.decreaseQty": "Decrease quantity of {name}",
      "menu.increaseQty": "Increase quantity of {name}",
      "menu.item": "item",
      "menu.items": "items",
      "cart.title": "Cart",
      "cart.pageTitle": "Review your order",
      "cart.empty":
        "Your cart is empty. Choose products in the menu to continue.",
      "cart.recommendations": "Anything else to add?",
      "cart.summary": "Summary",
      "cart.itemCount": "Number of items",
      "cart.subtotal": "Subtotal",
      "cart.voucher": "Voucher code",
      "cart.voucherPlaceholder": "Enter code",
      "cart.voucherApply": "Apply",
      "cart.discount": "Discount",
      "cart.total": "Total",
      "cart.back": "Back to menu",
      "cart.placeOrder": "Place order",
      "cart.charityTitle": "Would you like to donate to charity?",
      "cart.charityDesc": "For only EUR 0.70 extra, you support our charity.",
      "cart.charityYes": "Yes, donate EUR 0.70",
      "cart.charityNo": "No, do not donate",
      "cart.thanksTitle": "Thank you for your order!",
      "cart.thanksSub": "Your order is being prepared",
      "cart.orderNumberLabel": "Order number",
      "cart.noscript": "Enable JavaScript to view your cart.",
      "cart.perPiece": "per item",
      "cart.add": "+ Add",
      "cart.voucherInvalid": "Invalid voucher code.",
      "cart.voucherAppliedAmount": "{code} applied! {amount} discount.",
      "cart.voucherApplied": "{code} applied! {discount}% discount.",
      "cart.voucherEnter": "Enter a code.",
      "cart.decreaseQty": "Decrease quantity of {name}",
      "cart.increaseQty": "Increase quantity of {name}",
      "cart.remove": "Remove",
    },
    fr: {
      "index.takeAway": "Commande a emporter",
      "index.dineIn": "Manger sur place",
      "index.languageTitle": "Choisissez votre langue",
      "lang.nl": "Neerlandais",
      "lang.de": "Allemand",
      "lang.en": "Anglais",
      "lang.fr": "Francais",
      "menu.service.default": "Commande",
      "menu.service.takeAway": "A emporter",
      "menu.service.dineIn": "Sur place",
      "menu.categories": "Categories",
      "menu.products": "Nos produits",
      "menu.order": "Votre commande",
      "menu.checkout": "Paiement",
      "menu.recommendations.title": "N'oubliez pas ceux-ci!",
      "menu.recommendations.subtitle": "Complétez votre commande",
      "menu.recommendations.continue": "Aller au panier",
      "menu.noscript": "Activez JavaScript pour commander.",
      "menu.category.all": "Tout",
      "menu.category.bowls": "Bowls",
      "menu.category.salads": "Salades",
      "menu.category.wraps": "Wraps & Sandwiches",
      "menu.category.sides": "Accompagnements & Snacks",
      "menu.category.sauces": "Sauces & Dips",
      "menu.category.breakfast": "Petit-dejeuner",
      "menu.category.drinks": "Boissons & Smoothies",
      "menu.add": "Ajouter",
      "menu.remove": "Supprimer",
      "menu.decreaseQty": "Reduire la quantite de {name}",
      "menu.increaseQty": "Augmenter la quantite de {name}",
      "menu.item": "article",
      "menu.items": "articles",
      "cart.title": "Panier",
      "cart.pageTitle": "Verifiez votre commande",
      "cart.empty":
        "Votre panier est vide. Choisissez des produits dans le menu.",
      "cart.recommendations": "Ajouter autre chose ?",
      "cart.summary": "Resume",
      "cart.itemCount": "Nombre d'articles",
      "cart.subtotal": "Sous-total",
      "cart.voucher": "Code promo",
      "cart.voucherPlaceholder": "Entrez le code",
      "cart.voucherApply": "Appliquer",
      "cart.discount": "Reduction",
      "cart.total": "Total",
      "cart.back": "Retour au menu",
      "cart.placeOrder": "Passer la commande",
      "cart.charityTitle": "Voulez-vous faire un don ?",
      "cart.charityDesc":
        "Pour seulement EUR 0,70 de plus, vous soutenez notre association.",
      "cart.charityYes": "Oui, donner EUR 0,70",
      "cart.charityNo": "Non, pas de don",
      "cart.thanksTitle": "Merci pour votre commande !",
      "cart.thanksSub": "Votre commande est en preparation",
      "cart.orderNumberLabel": "Numero de commande",
      "cart.noscript": "Activez JavaScript pour voir votre panier.",
      "cart.perPiece": "par article",
      "cart.add": "+ Ajouter",
      "cart.voucherInvalid": "Code promo invalide.",
      "cart.voucherAppliedAmount": "{code} applique ! {amount} de reduction.",
      "cart.voucherApplied": "{code} applique ! {discount}% de reduction.",
      "cart.voucherEnter": "Entrez un code.",
      "cart.decreaseQty": "Reduire la quantite de {name}",
      "cart.increaseQty": "Augmenter la quantite de {name}",
      "cart.remove": "Supprimer",
    },
  };

  function getStoredLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : "nl";
  }

  function interpolate(template, params) {
    if (!params) return template;
    return Object.keys(params).reduce(
      (acc, key) => acc.replaceAll(`{${key}}`, String(params[key])),
      template,
    );
  }

  function t(key, params) {
    const lang = getStoredLanguage();
    const fromLang = translations[lang]?.[key];
    const fallback = translations.nl[key] || key;
    return interpolate(fromLang || fallback, params);
  }

  function applyStaticTranslations() {
    const lang = getStoredLanguage();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", String(isActive));
      btn.classList.toggle("is-active", isActive);
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyStaticTranslations();
    document.dispatchEvent(
      new CustomEvent("kiosk-language-changed", { detail: { language: lang } }),
    );
  }

  function initLanguageButtons() {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
      });
    });
  }

  window.kioskLanguage = {
    t,
    setLanguage,
    getLanguage: getStoredLanguage,
  };

  applyStaticTranslations();
  initLanguageButtons();
})();
