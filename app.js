
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

// Declare an empty shopping cart
const cart = [];

// Log the entire products array
console.log("All Products: - app.js:39", products);

// Add a product to the cart by name
function addToCart(productName) {
    const product = products.find(
        item => item.productName === productName
    );

    if (!product) {
        console.log("Product not found: - app.js:48", productName);
    } else if (!product.inStock) {
        console.log("Sorry, this product is out of stock: - app.js:50", productName);
    } else {
        cart.push(product);
        console.log("Product added to cart: - app.js:53", product.productName);
    }
}

// Display cart items and calculate the total
function viewCart() {
    let total = 0;

    console.log("Shopping Cart: - app.js:61");

    for (const item of cart) {
        console.log(
            item.productName + " - $" + item.price.toFixed(2)
        );
        total += item.price;
    }

    console.log("Total Price: $ - app.js:70" + total.toFixed(2));
}

// Filter products by category
function filterByCategory(category) {
    const matchingProducts = products.filter(
        product => product.category === category
    );

    console.log("Products in category: - app.js:79", category);

    if (matchingProducts.length === 0) {
        console.log("No products found in this category. - app.js:82");
    } else {
        matchingProducts.forEach(product => {
            console.log(
                product.productName + " - $" + product.price.toFixed(2)
            );
        });
    }
}

