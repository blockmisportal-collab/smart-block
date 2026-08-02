/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Login JavaScript
======================================================*/

"use strict";

/*=====================================================
 API URL
======================================================*/

const API_URL =
"https://script.google.com/macros/s/AKfycbzq-jTpW9im77vKBpZISbZ9aGPfkLKQ1gVyIzK2st6rFF3cAmk7IUjm94PxXD6bsNCevg/exec";

/*=====================================================
 DOM
======================================================*/

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = document.getElementById("loginBtn");

/*=====================================================
 LOGIN
======================================================*/

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    message.innerHTML = "";

    button.disabled = true;
    button.innerHTML = "Please Wait...";

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                action: "login",

                username: username,

                password: password

            })

        });

        const result = await response.json();

        if (result.success) {

            sessionStorage.setItem(

                "USER",

                JSON.stringify(result.user)

            );

            message.style.color = "green";

            message.innerHTML = "Login Successful";

            setTimeout(() => {

                redirect(result.user.role);

            }, 1000);

        }

        else {

            message.style.color = "red";

            message.innerHTML = result.message;

        }

    }

    catch (error) {

        console.error(error);

        message.style.color = "red";

        message.innerHTML =

            "Unable to connect server.";

    }

    button.disabled = false;

    button.innerHTML = "LOGIN";

});

/*=====================================================
 REDIRECT
======================================================*/

function redirect(role) {

    switch (role) {

        case "ADMIN":

            window.location.href =
                "admin/dashboard.html";

            break;

        case "BEO":

            window.location.href =
                "beo/dashboard.html";

            break;

        case "NODAL":

            window.location.href =
                "nodal/dashboard.html";

            break;

        case "SCHOOL":

            window.location.href =
                "school/dashboard.html";

            break;

        default:

            alert("Invalid Role");

    }

}
