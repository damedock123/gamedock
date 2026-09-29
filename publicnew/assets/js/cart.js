// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("gamedockCart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("gamedockCart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    alert(name + " has been added to your cart!");
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    displayCart();
    updateCartCount();
}

// Clear entire cart
function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Update the cart count in the navigation
function updateCartCount() {
    const countElements = document.querySelectorAll(".cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    countElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Display cart contents (used on cart.html)
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        if (totalElement) totalElement.textContent = "$0.00";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="game-card" style="width: 90%; max-width: 500px; margin: 15px auto; text-align: left;">
                <div style="display: flex; gap: 20px; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 6px;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 8px 0;">${item.name}</h3>
                        <p style="margin: 4px 0;">$${item.price.toFixed(2)} × ${item.quantity}</p>
                        <p style="margin: 4px 0; font-weight: bold;">Subtotal: $${itemTotal.toFixed(2)}</p>
                        <button onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')" class="button" style="padding: 6px 12px; font-size: 0.9rem; background-color: #c0392b;">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    if (totalElement) totalElement.textContent = "$" + total.toFixed(2);
}

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCart();
});