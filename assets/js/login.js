/*=====================================================
 SMART FORM ENTERPRISE v6.1
 Login JavaScript
 CORS Compatible Version
======================================================*/

"use strict";



/*=====================================================
 GOOGLE APPS SCRIPT WEB APP URL
======================================================*/

const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



/*=====================================================
 ELEMENTS
======================================================*/


const form =
document.getElementById("loginForm");


const message =
document.getElementById("message");


const button =
document.getElementById("loginBtn");




/*=====================================================
 LOGIN SUBMIT
======================================================*/


form.addEventListener(
"submit",
async function(e){


e.preventDefault();



message.innerHTML="";
message.style.color="red";



const username =
document
.getElementById("username")
.value
.trim();



const password =
document
.getElementById("password")
.value
.trim();



if(!username){


message.innerHTML =
"Username Required";


return;


}



if(!password){


message.innerHTML =
"Password Required";


return;


}



button.disabled=true;

button.innerHTML =
"PLEASE WAIT...";



try{


const response =

await fetch(

API_URL,

{


method:"POST",


headers:{


"Content-Type":
"text/plain;charset=utf-8"


},



body:

JSON.stringify({

action:"login",

username:username,

password:password

})


}

);





const responseText =
await response.text();



console.log(
"API RESPONSE:",
responseText
);





let result;



try{


result =
JSON.parse(responseText);


}

catch(error){


throw new Error(
"Invalid Server Response"
);


}





if(result.success === true){



/* SAVE USER SESSION */


sessionStorage.setItem(

"USER",

JSON.stringify(
result.data

)

);



message.style.color =
"green";


message.innerHTML =
"Login Successful";





setTimeout(

function(){


redirect(
result.data.role
);


},

1000

);



}

else{


message.innerHTML =

result.message ||

"Invalid Login";


}



}

catch(error){


console.error(
"LOGIN ERROR:",
error
);



message.style.color =
"red";


message.innerHTML =

"Server Connection Failed";


}



button.disabled=false;


button.innerHTML =
"LOGIN";


}

);





/*=====================================================
 ROLE REDIRECT
======================================================*/


function redirect(role){


role =

String(role)
.toUpperCase();



switch(role){



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


alert(
"Invalid User Role : "
+
role
);


}



}
