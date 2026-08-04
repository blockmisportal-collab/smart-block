/*=====================================================
 SMART FORM ENTERPRISE v6.1
 Login JavaScript
 FINAL STABLE VERSION
======================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwLMuH57q6Re4jjKoLzvbptYePUmd-QQQpPHgQCcfnqV37VtwRjxgGvhNWX3nmk3JRbdw/exec";



const form =
document.getElementById("loginForm");


const message =
document.getElementById("message");


const button =
document.getElementById("loginBtn");





form.addEventListener(
"submit",
async function(e){


e.preventDefault();



message.innerHTML="";


const username =
document.getElementById("username")
.value.trim();



const password =
document.getElementById("password")
.value.trim();



if(!username || !password){

message.innerHTML =
"Username / Password Required";

return;

}



button.disabled=true;

button.innerHTML="PLEASE WAIT...";



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


body:JSON.stringify({

action:"login",

username:username,

password:password

})


}

);



const text =
await response.text();



console.log(
"LOGIN RESPONSE",
text
);



const result =
JSON.parse(text);




if(result.success===true){



let user =
result.data || {};



/*===============================
 NORMALIZE USER DATA
================================*/


const USER = {


username:
user.username || username,


name:
user.name || "",


role:
String(
user.role || ""
)
.toUpperCase(),


schoolCode:

user.schoolCode ||
user.udise ||
user.UDISECode ||
"",



schoolName:

user.schoolName ||
user.SchoolName ||
"",



nyayaPanchayat:

user.nyayaPanchayat ||
user.NyayaPanchayat ||
""



};




console.log(
"FINAL USER",
USER
);





/* SAVE SESSION */


sessionStorage.setItem(

"USER",

JSON.stringify(USER)

);



localStorage.setItem(

"USER",

JSON.stringify(USER)

);





message.style.color="green";


message.innerHTML=
"Login Successful";




setTimeout(

()=>{

redirect(USER.role);

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
"LOGIN ERROR",
error
);

message.style.color="red";

message.innerHTML =
"ERROR : " + error.message;

}


message.innerHTML =
"Server Connection Failed";


}



button.disabled=false;

button.innerHTML="LOGIN";


}

);







function redirect(role){


role =
String(role)
.toUpperCase();



switch(role){


case "ADMIN":

location.href=
"admin/dashboard.html";

break;



case "BEO":

location.href=
"beo/dashboard.html";

break;



case "NODAL":

location.href=
"nodal/dashboard.html";

break;



case "SCHOOL":

location.href=
"school/dashboard.html";

break;



default:


alert(
"Invalid Role : "
+
role
);


}



}
