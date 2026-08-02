/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JavaScript
 File : dashboard.js
=====================================================*/


"use strict";



/*=====================================================
 API CONFIGURATION
=====================================================*/


const API_URL =

"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";





/*=====================================================
 PAGE LOAD
=====================================================*/


document.addEventListener(

"DOMContentLoaded",

function(){


loadUser();


loadDashboard();


setupLogout();


}

);






/*=====================================================
 LOAD LOGIN USER
=====================================================*/


function loadUser(){


const user =

sessionStorage.getItem("USER");



if(user){


const data =

JSON.parse(user);



if(document.getElementById("userName")){


document.getElementById("userName")
.innerHTML =
data.name || "Administrator";


}



if(document.getElementById("userRole")){


document.getElementById("userRole")
.innerHTML =
data.role || "ADMIN";


}


}


}







/*=====================================================
 LOAD DASHBOARD DATA
=====================================================*/


async function loadDashboard(){


try{


console.log(
"Loading Dashboard..."
);



const response = await fetch(

API_URL,

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


action:"dashboard"


})


}


);



const result =

await response.json();



console.log(

"Dashboard Response",

result

);





if(result.success){



updateDashboard(

result.data

);



}

else{


console.error(

result.message

);


}


}



catch(error){


console.error(

"Dashboard API Error",

error

);


}



}








/*=====================================================
 UPDATE DASHBOARD UI
=====================================================*/


function updateDashboard(data){



if(document.getElementById("totalSchools")){


document.getElementById("totalSchools")
.innerHTML =

data.totalSchools || 0;


}





if(document.getElementById("totalResponses")){


document.getElementById("totalResponses")
.innerHTML =

data.totalResponses || 0;


}





if(document.getElementById("activeUsers")){


document.getElementById("activeUsers")
.innerHTML =

data.activeUsers || 0;


}





if(document.getElementById("systemStatus")){


document.getElementById("systemStatus")
.innerHTML =

data.systemStatus || "OFFLINE";


}



}








/*=====================================================
 LOGOUT
=====================================================*/


function setupLogout(){


const btn =

document.getElementById("logoutBtn");



if(btn){


btn.addEventListener(

"click",

function(){


sessionStorage.clear();



window.location.href =

"../login.html";



}

);


}


}
