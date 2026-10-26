
// GameDock Login JavaScript

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get information from the login form
        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const password =
            document.getElementById("password").value;


        // Get all registered users
        const users =
            JSON.parse(localStorage.getItem("gamedockUsers")) || [];


        // Find a user with the matching email and password
        const user = users.find(function (account) {

            return account.email === email &&
                   account.password === password;

        });


        // Check if the account was found
        if (!user) {

            alert(
                "Invalid email or password. " +
                "Please try again."
            );

            return;
        }


        // Save the logged-in user
        localStorage.setItem(
            "gamedockCurrentUser",
            JSON.stringify(user)
        );


        // Login successful
        alert(
            "Welcome back, " +
            user.firstName +
            "!"
        );


        // Send the customer to their account page
        window.location.href = "my-account.html";

    });

});

