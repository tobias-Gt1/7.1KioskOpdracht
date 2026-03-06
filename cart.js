(function () {
  const cartListEl = document.getElementById("cart-list");
  const emptyStateEl = document.getElementById("empty-state");
  const countEl = document.getElementById("summary-count");
  const subtotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");
  const discountRowEl = document.getElementById("discount-row");
  const discountEl = document.getElementById("discount-amount");
  const voucherInput = document.getElementById("voucher-input");
  const voucherApplyBtn = document.getElementById("voucher-apply-btn");
  const voucherMessage = document.getElementById("voucher-message");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const serviceChip = document.getElementById("service-mode");
  const recommendationsGridEl = document.getElementById("recommendations-grid");
  const charityModal = document.getElementById("charity-modal");
  const charityDonateBtn = document.getElementById("charity-donate-btn");
  const charitySkipBtn = document.getElementById("charity-skip-btn");
  const thankYouScreen = document.getElementById("thank-you-screen");

  const PRODUCTS = [
    {
      id: "bowl-falafel-mediterranean",
      name: "Mediterranean Falafel Bowl",
      price: 10.0,
      category: "Bowls",
      image: "assets/Mediterranean Falafel Bowl (VG) – €10.00 (440 kcal).png",
    },
    {
      id: "bowl-tofu-power-tahini",
      name: "Tofu Power Tahini Bowl",
      price: 10.5,
      category: "Bowls",
      image: "assets/Tofu Power Tahini Bowl.png",
    },
    {
      id: "bowl-tempeh-teriyaki",
      name: "Warm Teriyaki Tempeh Bowl",
      price: 11.0,
      category: "Bowls",
      image: "assets/Warm Teriyaki Tempeh Bowl (VG) – €11.00 (500 kcal).png",
    },
    {
      id: "bowl-acai-morning-boost",
      name: "Morning Boost Açaí Bowl",
      price: 9.0,
      category: "Bowls",
      image: "assets/Morning Boost Açaí Bowl.png",
    },
    {
      id: "salad-supergreen-harvest",
      name: "The Supergreen Harvest",
      price: 9.5,
      category: "Salades",
      image: "assets/The Supergreen Harvest (VG) – €9.50 (310 kcal).png",
    },
    {
      id: "toastie-avocado-halloumi",
      name: "Avocado & Halloumi Toastie",
      price: 9.0,
      category: "Wraps & Sandwiches",
      image: "assets/Avocado & Halloumi Toastie (V) – €9.00 (460 kcal).png",
    },
    {
      id: "slider-jackfruit-bbq",
      name: "Smoky BBQ Jackfruit Slider",
      price: 7.5,
      category: "Wraps & Sandwiches",
      image: "assets/Smoky BBQ Jackfruit Slider (VG) – €7.50 (350 kcal).png",
    },
    {
      id: "wrap-zesty-chickpea",
      name: "Zesty Chickpea Hummus Wrap",
      price: 8.5,
      category: "Wraps & Sandwiches",
      image: "assets/Zesty Chickpea Hummus Wrap (VG) – €8.50 (410 kcal).png",
    },
    {
      id: "snack-falafel-bites",
      name: "Baked Falafel Bites - 5pcs",
      price: 5.0,
      category: "Sides & Snacks",
      image: "assets/Baked Falafel Bites - 5pcs (VG) – €5.00 (230 kcal).png",
    },
    {
      id: "snack-veggie-platter",
      name: "Mini Veggie Platter & Hummus",
      price: 4.0,
      category: "Sides & Snacks",
      image: "assets/Mini Veggie Platter & Hummus (VG) – €4.00 (160 kcal).png",
    },
    {
      id: "snack-sweet-potato-wedges",
      name: "Oven-Baked Sweet Potato Wedges",
      price: 4.5,
      category: "Sides & Snacks",
      image:
        "assets/Oven-Baked Sweet Potato Wedges (VG) – €4.50 (260 kcal).png",
    },
    {
      id: "snack-zucchini-fries",
      name: "Zucchini Fries",
      price: 4.5,
      category: "Sides & Snacks",
      image: "assets/Zucchini Fries (V) – €4.50 (190 kcal).png",
    },
    {
      id: "sauce-classic-hummus",
      name: "Classic Hummus",
      price: 2.5,
      category: "Sauces & Dips",
      image: "assets/Classic Hummus (VG) – 120 kcal.png",
    },
    {
      id: "sauce-avocado-lime-crema",
      name: "Avocado Lime Crema",
      price: 2.0,
      category: "Sauces & Dips",
      image: "assets/Avocado Lime Crema (VG) – 110 kcal.png",
    },
    {
      id: "sauce-peanut-satay",
      name: "Peanut Satay Sauce",
      price: 2.5,
      category: "Sauces & Dips",
      image: "assets/Peanut Satay Sauce (VG) – 200 kcal.png",
    },
    {
      id: "sauce-sriracha-mayo",
      name: "Spicy Sriracha Mayo",
      price: 2.0,
      category: "Sauces & Dips",
      image: "assets/Spicy Sriracha Mayo (VG) – 180 kcal.png",
    },
    {
      id: "sauce-yogurt-ranch",
      name: "Greek Yogurt Ranch",
      price: 2.0,
      category: "Sauces & Dips",
      image: "assets/Greek Yogurt Ranch (V) – 90 kcal.png",
    },
    {
      id: "breakfast-overnight-oats",
      name: "Overnight Oats Apple Pie Style",
      price: 4.5,
      category: "Breakfast",
      image: "assets/Overnight Oats Apple Pie Style.png",
    },
    {
      id: "breakfast-peanut-cacao-toast",
      name: "Peanut Butter & Cacao Toast",
      price: 4.5,
      category: "Breakfast",
      image: "assets/Peanut Butter & Cacao Toast.png",
    },
    {
      id: "drink-berry-blast",
      name: "Berry Blast Smoothie",
      price: 3.8,
      category: "Drinks & Smoothies",
      image: "assets/Berry Blast Smoothie - €3.80 (140 kcal)  (VG).webp",
    },
    {
      id: "drink-citrus-cooler",
      name: "Citrus Cooler",
      price: 3.0,
      category: "Drinks & Smoothies",
      image: "assets/Citrus Cooler - €3.00 (90 kcal)  (VG).webp",
    },
    {
      id: "drink-green-glow",
      name: "Green Glow Smoothie",
      price: 3.5,
      category: "Drinks & Smoothies",
      image: "assets/Green Glow Smoothie - €3.50 (120 kcal)  (VG).webp",
    },
    {
      id: "drink-matcha-latte",
      name: "Iced Matcha Latte",
      price: 3.0,
      category: "Drinks & Smoothies",
      image: "assets/Iced Matcha Latte - €3.00 (90 kcal)  (VG).webp",
    },
    {
      id: "drink-fruit-water",
      name: "Fruit-Infused Water",
      price: 1.5,
      category: "Drinks & Smoothies",
      image: "assets/Fruit-Infused Water - €1.50 (0 kcal)  (VG).webp",
    },
  ];

  const VOUCHERS = {
    WELCOME10: { discount: 10, type: "percent" },
    SUMMER20: { discount: 20, type: "percent" },
    EXTRAKORTING: { discount: 15, type: "percent" },
  };

  const currency = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  const storedService =
    localStorage.getItem("kiosk_service_mode") || "bestellen";
  if (storedService === "take-away") serviceChip.textContent = "Meenemen";
  else if (storedService === "dine-in") serviceChip.textContent = "Hier eten";
  else serviceChip.textContent = "Bestellen";

  let cart = loadCart();
  let currentDiscount = 0;
  let appliedVoucher = null;
  let charityDonation = 0;

  function loadCart() {
    try {
      const raw = localStorage.getItem("kiosk_cart");
      const parsed = raw ? JSON.parse(raw) : { items: {} };
      return parsed && parsed.items ? parsed : { items: {} };
    } catch {
      return { items: {} };
    }
  }

  function saveCart() {
    localStorage.setItem("kiosk_cart", JSON.stringify(cart));
  }

  function formatPrice(value) {
    return currency.format(value);
  }

  function getProductsNotInCart() {
    const inCart = new Set(Object.keys(cart.items));
    return PRODUCTS.filter((p) => !inCart.includes(p.id));
  }

  function getRandomProducts(count = 3) {
    const available = getProductsNotInCart();
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  function changeQty(productId, delta) {
    const item = cart.items[productId];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) delete cart.items[productId];
    saveCart();
    render();
  }

  function removeItem(productId) {
    delete cart.items[productId];
    saveCart();
    render();
  }

  function addRecommendation(productId) {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;
    const item = cart.items[productId] || { product: p, qty: 0 };
    item.qty += 1;
    cart.items[productId] = item;
    saveCart();
    render();
  }

  function applyVoucher(code) {
    const upper = code.toUpperCase().trim();
    const voucher = VOUCHERS[upper];
    if (!voucher) {
      voucherMessage.textContent = "Ongeldige voucher code.";
      voucherMessage.classList.remove("success");
      voucherMessage.classList.add("error");
      voucherMessage.hidden = false;
      return false;
    }
    appliedVoucher = upper;
    voucherMessage.textContent = `${upper} toegepast! ${voucher.discount}% korting.`;
    voucherMessage.classList.remove("error");
    voucherMessage.classList.add("success");
    voucherMessage.hidden = false;
    voucherInput.value = "";
    render();
    return true;
  }

  function renderItem(item) {
    const row = document.createElement("article");
    row.className = "cart-item";
    row.setAttribute("aria-label", item.product.name);

    const media = document.createElement("div");
    media.className = "cart-media";
    const img = document.createElement("img");
    img.src = item.product.image;
    img.alt = item.product.name;
    img.onerror = () => {
      img.remove();
      media.textContent = item.product.name;
    };
    media.appendChild(img);

    const middle = document.createElement("div");
    const name = document.createElement("p");
    name.className = "cart-name";
    name.textContent = item.product.name;
    const unitPrice = document.createElement("p");
    unitPrice.className = "cart-price";
    unitPrice.textContent = `${formatPrice(item.product.price)} per stuk`;

    const qty = document.createElement("div");
    qty.className = "qty";
    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "qty-btn";
    minus.textContent = "-";
    minus.setAttribute(
      "aria-label",
      `Verlaag hoeveelheid van ${item.product.name}`,
    );
    minus.addEventListener("click", () => changeQty(item.product.id, -1));

    const value = document.createElement("span");
    value.className = "qty-value";
    value.textContent = String(item.qty);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "qty-btn";
    plus.textContent = "+";
    plus.setAttribute(
      "aria-label",
      `Verhoog hoeveelheid van ${item.product.name}`,
    );
    plus.addEventListener("click", () => changeQty(item.product.id, +1));

    qty.appendChild(minus);
    qty.appendChild(value);
    qty.appendChild(plus);

    middle.appendChild(name);
    middle.appendChild(unitPrice);
    middle.appendChild(qty);

    const right = document.createElement("div");
    right.className = "cart-right";
    const lineTotal = document.createElement("span");
    lineTotal.className = "cart-line-total";
    lineTotal.textContent = formatPrice(item.qty * item.product.price);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-btn";
    remove.textContent = "Verwijderen";
    remove.addEventListener("click", () => removeItem(item.product.id));

    right.appendChild(lineTotal);
    right.appendChild(remove);

    row.appendChild(media);
    row.appendChild(middle);
    row.appendChild(right);
    return row;
  }

  function renderRecommendation(product) {
    const card = document.createElement("article");
    card.className = "recommendation-card";
    card.setAttribute("aria-label", product.name);

    const media = document.createElement("div");
    media.className = "recommendation-media";
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.onerror = () => {
      img.remove();
      media.textContent = product.name;
    };
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "recommendation-body";
    const name = document.createElement("p");
    name.className = "recommendation-name";
    name.textContent = product.name;
    const price = document.createElement("p");
    price.className = "recommendation-price";
    price.textContent = formatPrice(product.price);
    body.appendChild(name);
    body.appendChild(price);

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "recommendation-add";
    addBtn.textContent = "+ Toevoegen";
    addBtn.addEventListener("click", () => addRecommendation(product.id));

    card.appendChild(media);
    card.appendChild(body);
    card.appendChild(addBtn);
    return card;
  }

  function render() {
    cartListEl.innerHTML = "";
    const items = Object.values(cart.items);

    let totalItems = 0;
    let subtotal = 0;

    items.forEach((item) => {
      totalItems += item.qty;
      subtotal += item.qty * item.product.price;
      cartListEl.appendChild(renderItem(item));
    });

    currentDiscount = 0;
    if (appliedVoucher) {
      const v = VOUCHERS[appliedVoucher];
      if (v.type === "percent") {
        currentDiscount = (subtotal * v.discount) / 100;
      }
    }

    const total = subtotal - currentDiscount;

    countEl.textContent = String(totalItems);
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(total);

    if (currentDiscount > 0) {
      discountRowEl.hidden = false;
      discountEl.textContent = `- ${formatPrice(currentDiscount)}`;
    } else {
      discountRowEl.hidden = true;
    }

    const isEmpty = totalItems === 0;
    emptyStateEl.hidden = !isEmpty;
    placeOrderBtn.disabled = isEmpty;

    recommendationsGridEl.innerHTML = "";
    const recommendations = getRandomProducts(3);
    recommendations.forEach((p) => {
      recommendationsGridEl.appendChild(renderRecommendation(p));
    });
  }

  voucherApplyBtn.addEventListener("click", () => {
    const code = voucherInput.value.trim();
    if (!code) {
      voucherMessage.textContent = "Voer een code in.";
      voucherMessage.classList.add("error");
      voucherMessage.hidden = false;
      return;
    }
    applyVoucher(code);
  });

  voucherInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      voucherApplyBtn.click();
    }
  });

  placeOrderBtn.addEventListener("click", () => {
    // Show charity modal instead of placing order directly
    charityModal.hidden = false;
  });

  function completeOrder(withDonation) {
    charityDonation = withDonation ? 0.7 : 0;
    const items = Object.values(cart.items).reduce((acc, i) => acc + i.qty, 0);
    let subtotal = 0;
    Object.values(cart.items).forEach((item) => {
      subtotal += item.qty * item.product.price;
    });
    const discountAmount = appliedVoucher ? currentDiscount : 0;
    const total = subtotal - discountAmount + charityDonation;

    // Show thank you screen
    thankYouScreen.hidden = false;

    // After 3 seconds, redirect to home page
    setTimeout(() => {
      localStorage.removeItem("kiosk_cart");
      localStorage.removeItem("kiosk_service_mode");
      window.location.href = "index.html";
    }, 3000);
  }

  charityDonateBtn.addEventListener("click", () => {
    charityModal.hidden = true;
    completeOrder(true);
  });

  charitySkipBtn.addEventListener("click", () => {
    charityModal.hidden = true;
    completeOrder(false);
  });

  render();
})();
