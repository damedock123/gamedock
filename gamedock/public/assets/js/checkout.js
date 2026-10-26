// GameDock Checkout

document.addEventListener("DOMContentLoaded", function () {

    // Load the same cart used by cart.js
    let cart = JSON.parse(localStorage.getItem("gamedockCart")) || [];

    const checkoutItems = document.getElementById("checkout-items");
    const checkoutSubtotal = document.getElementById("checkout-subtotal");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");


    // Update cart count
    const cartCount = document.querySelector(".cart-count");

    if (cartCount) {
        let totalItems = 0;

        cart.forEach(function (item) {
            totalItems += item.quantity;
        });

        cartCount.textContent = totalItems;
    }


    // Check if the cart is empty
    if (cart.length === 0) {

        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

        checkoutSubtotal.textContent = "$0.00";
        checkoutTotal.textContent = "$0.00";

        checkoutForm.style.display = "none";

        return;
    }


    // Display the products in the checkout
    let total = 0;

    cart.forEach(function (item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const itemElement = document.createElement("div");

        itemElement.className = "checkout-item";

        itemElement.innerHTML =
            "<div>" +
                "<strong>" + item.name + "</strong>" +
                "<p>Quantity: " + item.quantity + "</p>" +
            "</div>" +
            "<span>$" + itemTotal.toFixed(2) + "</span>";

        checkoutItems.appendChild(itemElement);
    });


    // Display totals
    checkoutSubtotal.textContent = "$" + total.toFixed(2);
    checkoutTotal.textContent = "$" + total.toFixed(2);


    // Handle the checkout form
    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get customer name
        const firstName =
            document.getElementById("firstName").value;

        const lastName =
            document.getElementById("lastName").value;


        // Create a demo order number
        const orderNumber =
            "GD-" + Math.floor(100000 + Math.random() * 900000);


        // Show order confirmation
        document.querySelector(".checkout-layout").innerHTML =
            "<section class='checkout-section order-confirmation'>" +

                "<h2>Order Successfully Placed!</h2>" +

                "<p>Thank you for shopping with GameDock, " +
                "<strong>" + firstName + " " + lastName + "</strong>!" +
                "</p>" +

                "<br>" +

                "<p>Your order number is:</p>" +

                "<h3>" + orderNumber + "</h3>" +

                "<p>Your order total is: " +
                "<strong>$" + total.toFixed(2) + "</strong>" +
                "</p>" +

                "<br>" +

                "<p>" +
                "This is a demo order for the GameDock school project. " +
                "No real payment was processed." +
                "</p>" +

                "<br>" +

                "<a href='index.html' class='button'>" +
                "Return to Home" +
                "</a>" +

            "</section>";


        // Clear the cart
        localStorage.removeItem("gamedockCart");

    });

});
