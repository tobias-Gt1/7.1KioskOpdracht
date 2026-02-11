// Kiosk menu
(function () {
  const categoryEl = document.getElementById("category-list");
  const gridEl = document.getElementById("product-grid");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const serviceChip = document.getElementById("service-mode");

  const CATEGORIES = [
    "Alles",
    "Bowls",
    "Salades",
    "Wraps & Sandwiches",
    "Sides & Snacks",
    "Sauces & Dips",
    "Breakfast",
    "Drinks & Smoothies",
  ];

  const PRODUCTS = [
    // Bowls
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

    // Salades
    {
      id: "salad-supergreen-harvest",
      name: "The Supergreen Harvest",
      price: 9.5,
      category: "Salades",
      image: "assets/The Supergreen Harvest (VG) – €9.50 (310 kcal).png",
    },

    // Wraps & Sandwiches
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

    // Sides & Snacks
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

    // Sauces & Dips
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

    // Breakfast
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

    // Drinks & Smoothies
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

  const currency = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });
  function formatPrice(n) {
    return currency.format(n);
  }

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  if (service === "take-away") serviceChip.textContent = "Meenemen";
  else if (service === "dine-in") serviceChip.textContent = "Hier eten";
  else serviceChip.textContent = "Bestellen";

  let cart = loadCart();
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

  function addToCart(productId) {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;
    const item = cart.items[productId] || { product: p, qty: 0 };
    item.qty += 1;
    cart.items[productId] = item;
    saveCart();
    renderCart();
  }
  function changeQty(productId, delta) {
    const item = cart.items[productId];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) delete cart.items[productId];
    saveCart();
    renderCart();
  }
  function removeItem(productId) {
    delete cart.items[productId];
    saveCart();
    renderCart();
  }

  function renderCategories() {
    categoryEl.innerHTML = "";
    CATEGORIES.forEach((cat, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", idx === 0 ? "true" : "false");
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".category-list button")
          .forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const selected = cat === "Alles" ? null : cat;
        renderProducts(selected);
      });
      categoryEl.appendChild(btn);
    });
  }

  function productCard(p) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("aria-label", p.name);

    const media = document.createElement("div");
    media.className = "product-media";
    const img = document.createElement("img");
    img.alt = p.name;
    img.src = p.image;
    img.onerror = () => {
      img.remove();
      media.textContent = p.category;
    };
    media.appendChild(img);
    const overlay = document.createElement("div");
    overlay.className = "product-overlay";
    const name = document.createElement("p");
    name.className = "product-name";
    name.textContent = p.name;
    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(p.price);
    overlay.appendChild(name);
    overlay.appendChild(price);
    media.appendChild(overlay);

    const actions = document.createElement("div");
    actions.className = "product-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "add-btn";
    add.textContent = "Toevoegen";
    add.addEventListener("click", () => addToCart(p.id));
    actions.appendChild(add);

    card.appendChild(media);
    card.appendChild(actions);
    return card;
  }

  function renderProducts(selectedCategory) {
    gridEl.innerHTML = "";
    const list = selectedCategory
      ? PRODUCTS.filter((p) => p.category === selectedCategory)
      : PRODUCTS;
    list.forEach((p) => gridEl.appendChild(productCard(p)));
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";
    const ids = Object.keys(cart.items);
    let total = 0;
    let count = 0;
    ids.forEach((id) => {
      const { product, qty } = cart.items[id];
      total += product.price * qty;
      count += qty;
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      const name = document.createElement("span");
      name.className = "cart-item-name";
      name.textContent = product.name;
      const qtyEl = document.createElement("div");
      qtyEl.className = "qty";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.className = "qty-btn";
      minus.setAttribute(
        "aria-label",
        `Verlaag hoeveelheid van ${product.name}`,
      );
      minus.textContent = "-";
      const value = document.createElement("span");
      value.className = "qty-value";
      value.textContent = String(qty);
      const plus = document.createElement("button");
      plus.type = "button";
      plus.className = "qty-btn";
      plus.setAttribute(
        "aria-label",
        `Verhoog hoeveelheid van ${product.name}`,
      );
      plus.textContent = "+";
      minus.addEventListener("click", () => changeQty(product.id, -1));
      plus.addEventListener("click", () => changeQty(product.id, +1));
      qtyEl.appendChild(minus);
      qtyEl.appendChild(value);
      qtyEl.appendChild(plus);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-btn";
      remove.textContent = "Verwijderen";
      remove.addEventListener("click", () => removeItem(product.id));
      itemEl.appendChild(name);
      itemEl.appendChild(qtyEl);
      itemEl.appendChild(remove);
      cartItemsEl.appendChild(itemEl);
    });
    cartCountEl.textContent = `${count} ${count === 1 ? "item" : "items"}`;
    cartTotalEl.textContent = formatPrice(total);
    checkoutBtn.disabled = count === 0;
  }

  checkoutBtn.addEventListener("click", () => {
    alert(
      `Afrekenen: ${cartCountEl.textContent} • Totaal ${cartTotalEl.textContent}`,
    );
  });

  renderCategories();
  renderProducts(null);
  renderCart();
})();
