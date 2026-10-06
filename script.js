// // ================= SEARCH BOOKS =================

// const searchInput = document.getElementById("searchInput");
// const searchButton = document.querySelector(".search-button");
// const resetButton = document.querySelector(".reset-button");

// searchButton.addEventListener("click", searchBooks);

// searchInput.addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//         searchBooks();
//     }
// });

// function searchBooks() {

//     const searchText = searchInput.value.toLowerCase().trim();

//     const rows = document.querySelectorAll("#bookTable tr");

//     rows.forEach(function(row) {

//         const rowText = row.textContent.toLowerCase();

//         if (rowText.includes(searchText)) {
//             row.style.display = "";
//         } else {
//             row.style.display = "none";
//         }

//     });
// }


// // ================= RESET SEARCH =================

// resetButton.addEventListener("click", function() {

//     searchInput.value = "";

//     const rows = document.querySelectorAll("#bookTable tr");

//     rows.forEach(function(row) {
//         row.style.display = "";
//     });

// });


// // ================= ADD BOOK BUTTON =================

// const addButton = document.querySelector(".add-button");

// addButton.addEventListener("click", function() {

//     alert("Add Book feature will be connected to the Java backend soon.");

// });


// // ================= SIDEBAR MENU =================

// const menuItems = document.querySelectorAll(".menu-item");

// menuItems.forEach(function(item) {

//     item.addEventListener("click", function(event) {

//         event.preventDefault();

//         menuItems.forEach(function(menu) {
//             menu.classList.remove("active");
//         });

//         item.classList.add("active");

//     });

// });


// // ================= PAGE LOAD =================

// console.log("Library Dashboard loaded successfully.");


/* =========================================
   LIBRARY MANAGEMENT SYSTEM
   MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   DASHBOARD FUNCTIONS
   ========================================= */

const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".search-button");
const resetButton = document.querySelector(".reset-button");


/* Search */

if (searchButton && searchInput) {

    searchButton.addEventListener("click", searchBooks);

    searchInput.addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            searchBooks();
        }

    });

}


function searchBooks() {

    const searchText = searchInput.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#bookTable tr");

    rows.forEach(function(row) {

        const rowText = row.textContent.toLowerCase();

        row.style.display =
            rowText.includes(searchText) ? "" : "none";

    });

}


/* Reset */

if (resetButton) {

    resetButton.addEventListener("click", function() {

        searchInput.value = "";

        const rows = document.querySelectorAll("#bookTable tr");

        rows.forEach(function(row) {

            row.style.display = "";

        });

    });

}


/* Add Book */

const addButton = document.querySelector(".add-button");

if (addButton) {

    addButton.addEventListener("click", function() {

        alert("Add Book feature will be connected to the Java backend soon.");

    });

}


/* Sidebar */

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        menuItems.forEach(function(menu) {

            menu.classList.remove("active");

        });

        item.classList.add("active");

    });

});


/* =========================================
   LOGIN PAGE
   ========================================= */

const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");

const showPasswordButton =
    document.getElementById("showPassword");

const forgotPasswordButton =
    document.getElementById("forgotPassword");

const darkModeButton =
    document.getElementById("darkModeButton");

const loginMessage =
    document.getElementById("loginMessage");

const rememberCheckbox =
    document.getElementById("remember");

const usernameInput =
    document.getElementById("username");


/* =========================================
   SHOW / HIDE PASSWORD
   ========================================= */

if (showPasswordButton && passwordInput) {

    showPasswordButton.addEventListener("click", function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            showPasswordButton.textContent = "Hide";

        } else {

            passwordInput.type = "password";

            showPasswordButton.textContent = "Show";

        }

    });

}


/* =========================================
   REMEMBER USERNAME
   ========================================= */

if (usernameInput && rememberCheckbox) {

    const savedUsername =
        localStorage.getItem("libraryUsername");

    if (savedUsername) {

        usernameInput.value = savedUsername;

        rememberCheckbox.checked = true;

    }

}


/* =========================================
   LOGIN VALIDATION
   ========================================= */
/* LOGIN VALIDATION */

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const role = document.getElementById("role").value;

        if (username === "" || password === "") {

            loginMessage.textContent =
                "Please enter username and password.";

            loginMessage.style.color = "#e05252";

            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password,
                        role: role
                    })
                }
            );

            const result = await response.text();

            loginMessage.textContent = result;
            loginMessage.style.color = "#1f6feb";

        } catch (error) {

            loginMessage.textContent =
                "Cannot connect to the Java server.";

            loginMessage.style.color = "#e05252";

            console.error(error);
        }

    });

}



/* =========================================
   FORGOT PASSWORD
   ========================================= */

if (forgotPasswordButton) {

    forgotPasswordButton.addEventListener("click", function() {

        window.location.href = "reset-password.html";

    });

}
if (darkModeButton) {

    darkModeButton.addEventListener("click", function() {

        document.body.classList.toggle("login-dark");

        if (document.body.classList.contains("login-dark")) {

            darkModeButton.textContent =
                "☀️ Light Mode";

        } else {

            darkModeButton.textContent =
                "🌙 Dark Mode";

        }

    });

}


/* =========================================
   CONSOLE MESSAGE
   ========================================= */

console.log(
    "Library Management System loaded successfully."
);