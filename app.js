import { products } from "./products.js";
import { cart, addToCart } from "./cart.js";

// Render product cards
function renderProducts(productsToDisplay) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";

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
        button.textContent = "Add to Cart";

        // Handle clicks and display errors in the page
        button.addEventListener("click", function () {
            const errorMessage =
                document.getElementById("error-message");

            try {
                addToCart(product.productName);
                errorMessage.textContent = "";
            } catch (error) {
                errorMessage.textContent =
                    "Unable to add item: " + error.message;
            } finally {
                updateCart();
            }
        });

        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(button);

        productGrid.appendChild(card);
    }
}

// Update the cart badge, items, and total
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

// Render category filter buttons
function renderCategoryFilters() {
    const filterContainer =
        document.getElementById("category-filters");

    filterContainer.innerHTML = "";

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    const allButton = document.createElement("button");
    allButton.textContent = "All Products";

    allButton.addEventListener("click", function () {
        renderProducts(products);
        document.getElementById("error-message").textContent = "";
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
            document.getElementById("error-message").textContent = "";
        });

        filterContainer.appendChild(button);
    }
}

// Initialize the store
renderCategoryFilters();
renderProducts(products);
updateCart();
