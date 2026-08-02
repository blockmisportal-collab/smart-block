"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";


document.addEventListener(
"DOMContentLoaded",
()=>{

loadDashboard();

loadUser();

}
);



function loadUser(){

let user =
sessionStorage.getItem("USER");


if(user){

let data =
JSON.parse(user);


let name =
document.getElementById("adminName");


if(name){

name.innerHTML =
data.name || "Administrator";

}


let role =
document.getElementById("adminRole");


if(role){

role.innerHTML =
data.role || "ADMIN";

}

}

}





async function loadDashboard(){


try{


let response =
await fetch(

API_URL,

{

method:"POST",

headers:{
"Content-Type":
"text/plain;charset=utf-8"
},

body:JSON.stringify({

action:"dashboard"

})

}

);



let result =
await response.json();



if(result.success){


let d =
result.data;



document.getElementById("totalSchools").innerHTML =
d.totalSchools || 0;


document.getElementById("totalResponses").innerHTML =
d.totalResponses || 0;


document.getElementById("activeUsers").innerHTML =
d.activeUsers || 0;


document.getElementById("pendingForms").innerHTML =
d.pendingForms || 0;


document.getElementById("systemStatus").innerHTML =
d.systemStatus || "ONLINE";


}



}

catch(e){

console.log(e);

}



}





function logout(){

sessionStorage.removeItem("USER");

location.href="../login.html";

}
