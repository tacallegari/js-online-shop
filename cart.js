
import { products } from "./products.js";

export const cart = [];

export function addToCart(productName) {
    const product = products.find(
        item => item.productName === productName
    );

    if (!product) {
        throw new Error("Product not found. Please check the product name.");
    }

    if (!product.inStock) {
        throw new Error(
            product.productName + " is currently out of stock."
        );
    }

    cart.push(product);

    return product;
}
