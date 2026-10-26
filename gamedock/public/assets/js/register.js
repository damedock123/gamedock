
// GameDock Registration JavaScript

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("register-form");


    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get the information from the form
        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check that the passwords match
        if (password !== confirmPassword) {

            alert("The passwords do not match.");

            return;
        }


        // Get existing users
        const users =
            JSON.parse(localStorage.getItem("gamedockUsers")) || [];


        // Check if the email already exists
        const existingUser = users.find(function (user) {

            return user.email === email;

        });


        if (existingUser) {

            alert(
                "An account with this email already exists. " +
                "Please use a different email."
            );

            return;
        }


        // Create the new customer account
        const newUser = {

            id: Date.now(),

            firstName: firstName,

            lastName: lastName,

            email: email,

            phone: phone,

            password: password,

            role: "Customer"

        };


        // Add the new user to the users array
        users.push(newUser);


        // Save users
        localStorage.setItem(
            "gamedockUsers",
            JSON.stringify(users)
        );


        // Save the currently logged-in user
        localStorage.setItem(
            "gamedockCurrentUser",
            JSON.stringify(newUser)
        );


        // Tell the customer the account was created
        alert(
            "Your GameDock account has been created successfully!"
        );


        // Send the customer to their account page
        window.location.href = "my-account.html";

    });

});

