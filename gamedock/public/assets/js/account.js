
// GameDock Account JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Get the currently logged-in user
    const currentUser =
        JSON.parse(localStorage.getItem("gamedockCurrentUser"));


    // If there is no logged-in user, send them to the login page
    if (!currentUser) {

        window.location.href = "login.html";

        return;
    }


    // Display the customer's name
    document.getElementById("account-name").textContent =
        currentUser.firstName + " " + currentUser.lastName;


    // Display first name
    document.getElementById("account-first-name").textContent =
        currentUser.firstName;


    // Display last name
    document.getElementById("account-last-name").textContent =
        currentUser.lastName;


    // Display email
    document.getElementById("account-email").textContent =
        currentUser.email;


    // Display phone number
    document.getElementById("account-phone").textContent =
        currentUser.phone;


    // Display account role
    document.getElementById("account-role").textContent =
        currentUser.role;


    // Logout from the account
    const logoutButton =
        document.getElementById("logout-button");

    const logoutLink =
        document.getElementById("logout-link");


    function logout() {

        localStorage.removeItem("gamedockCurrentUser");

        alert("You have been logged out.");

        window.location.href = "login.html";
    }


    // Logout button
    logoutButton.addEventListener("click", function () {

        logout();

    });


    // Logout link at the top
    logoutLink.addEventListener("click", function (event) {

        event.preventDefault();

        logout();

    });

});

