/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Login JavaScript
======================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



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
message.style.color="red";



const username =
document.getElementById("username")
.value
.trim();



const password =
document.getElementById("password")
.value
.trim();



if(!username){

message.innerHTML=
"Please Enter Username";

return;

}



if(!password){

message.innerHTML=
"Please Enter Password";

return;

}



button.disabled=true;

button.innerHTML=
"Please Wait...";



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

});


const result =
await response.json();



console.log(result);



if(result.success){


sessionStorage.setItem(

"USER",

JSON.stringify(
result.data
)

);



message.style.color="green";

message.innerHTML=
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


message.innerHTML=
result.message ||
"Login Failed";


}



}

catch(error){


console.error(error);


message.innerHTML=
"Server Connection Failed";


}



button.disabled=false;

button.innerHTML=
"LOGIN";



});





function redirect(role){


role =
String(role)
.toUpperCase();



switch(role){


case "ADMIN":

window.location.href=
"admin/dashboard.html";

break;



case "BEO":

window.location.href=
"beo/dashboard.html";

break;



case "NODAL":

window.location.href=
"nodal/dashboard.html";

break;



case "SCHOOL":

window.location.href=
"school/dashboard.html";

break;



default:

alert(
"Invalid User Role : "+role
);


}



}
