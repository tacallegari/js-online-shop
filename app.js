
const products = [
    {
        productName: "Gothic Black Hoodie",
        price: 49.99,
        category: "Clothing",
        inStock: true
    },
    {
        productName: "Black Platform Sneakers",
        price: 59.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Running Shoes",
        price: 74.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Gluten Free Chocolate Cookies",
        price: 4.99,
        category: "Food item",
        inStock: true
    },
    {
        productName: "Potato Chips",
        price: 3.49,
        category: "Food item",
        inStock: false
    }
];

const cart = [];

// Render product cards dynamically
function renderProducts(productsToDisplay) {
    const productGrid = document.getElementById("product-grid");

    // Clear existing cards before rendering
    productGrid.innerHTML = "";

    // Create a card for each product
    for (const product of productsToDisplay) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const name = document.createElement("h3");
        name.textContent = product.productName;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price.toFixed(2);

        const button = document.createElement("button");
        button.textContent = product.inStock
            ? "Add to Cart"
            : "Out of Stock";
        button.disabled = !product.inStock;

        // Call addToCart with this product's name
        button.addEventListener("click", function () {
            addToCart(product.productName);
        });

        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(button);

        productGrid.appendChild(card);
    }
}

// Add a product to the shopping cart
function addToCart(productName) {
    const product = products.find(
        item => item.productName === productName
    );

    if (!product) {
        console.log("Product not found: - app.js:85", productName);
        return;
    }

    if (!product.inStock) {
        console.log("Sorry, this product is out of stock: - app.js:90", productName);
        return;
    }

    cart.push(product);
    console.log("Product added to cart: - app.js:95", product.productName);

    updateCart();
}

// Update cart badge, cart items, and total
function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";

    let total = 0;

    for (const item of cart) {
        const cartItem = document.createElement("p");
        cartItem.textContent =
            item.productName + " - $" + item.price.toFixed(2);

        cartItems.appendChild(cartItem);
        total += item.price;
    }

    cartTotal.textContent = total.toFixed(2);
}

// Render buttons for each product category
function renderCategoryFilters() {
    const filterContainer = document.getElementById("category-filters");
    filterContainer.innerHTML = "";

    const categories = [...new Set(
        products.map(product => product.category)
    )];

    const allButton = document.createElement("button");
    allButton.textContent = "All Products";

    allButton.addEventListener("click", function () {
        renderProducts(products);
    });

    filterContainer.appendChild(allButton);

    for (const category of categories) {
        const button = document.createElement("button");
        button.textContent = category;

        button.addEventListener("click", function () {
            const filteredProducts = products.filter(
                product => product.category === category
            );

            renderProducts(filteredProducts);
        });

        filterContainer.appendChild(button);
    }
}

// Display the products and category filters when the page loads
renderCategoryFilters();
renderProducts(products);
updateCart();
