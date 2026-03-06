// Kiosk menu
(function () {
  const API_URL = "http://localhost:3000/products";

  const categoryEl = document.getElementById("category-list");
  const gridEl = document.getElementById("product-grid");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const serviceChip = document.getElementById("service-mode");

  const DEFAULT_CATEGORIES = [
    "Alles",
    "Bowls",
    "Salades",
    "Wraps & Sandwiches",
    "Sides & Snacks",
    "Sauces & Dips",
    "Breakfast",
    "Drinks & Smoothies",
  ];

  const FALLBACK_PRODUCTS = [
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

  let categories = [...DEFAULT_CATEGORIES];
  let products = [...FALLBACK_PRODUCTS];

  function normalizeImageUrl(rawValue) {
    if (!rawValue) return "";
    if (/^https?:\/\//i.test(rawValue)) return rawValue;
    if (rawValue.startsWith("/")) return `http://localhost:3000${rawValue}`;
    return `http://localhost:3000/assets/${rawValue}`;
  }

  function normalizeProduct(apiProduct, index) {
    const id = String(
      apiProduct.product_id ?? apiProduct.id ?? apiProduct.productId ?? index + 1,
    );
    const name = apiProduct.name || apiProduct.product_name || `Product ${index + 1}`;
    const price = Number(apiProduct.price ?? apiProduct.product_price ?? apiProduct.prijs ?? 0);
    const category =
      apiProduct.category_name || apiProduct.category || apiProduct.category_label || "Overig";

    return {
      id,
      name,
      price: Number.isFinite(price) ? price : 0,
      category,
      image: normalizeImageUrl(apiProduct.image_url),
    };
  }

  async function loadProductsFromApi() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API status ${response.status}`);
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("Geen producten uit API");
    }

    products = rows.map(normalizeProduct);
    const uniqueCategories = [...new Set(products.map((item) => item.category))];
    categories = ["Alles", ...uniqueCategories];
  }

  const currency = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });
  function formatPrice(n) {
    return currency.format(n);
  }

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  localStorage.setItem("kiosk_service_mode", service || "bestellen");
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
    const p = products.find((x) => x.id === productId);
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
    categories.forEach((cat, idx) => {
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

    const body = document.createElement("div");
    body.className = "product-body";
    const name = document.createElement("p");
    name.className = "product-name";
    name.textContent = p.name;
    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(p.price);
    body.appendChild(name);
    body.appendChild(price);

    const actions = document.createElement("div");
    actions.className = "product-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "add-btn";
    add.textContent = "Toevoegen";
    add.addEventListener("click", () => addToCart(p.id));
    actions.appendChild(add);

    card.appendChild(media);
    card.appendChild(body);
    card.appendChild(actions);
    return card;
  }

  function renderProducts(selectedCategory) {
    gridEl.innerHTML = "";
    const list = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
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
    window.location.href = "cart.html";
  });

  async function init() {
    try {
      await loadProductsFromApi();
    } catch (error) {
      console.warn("API niet beschikbaar, fallback op lokale productlijst.", error);
      categories = [...DEFAULT_CATEGORIES];
      products = [...FALLBACK_PRODUCTS];
    }

    renderCategories();
    renderProducts(null);
    renderCart();
  }

  init();
})();
