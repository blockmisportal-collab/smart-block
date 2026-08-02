/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JS
=====================================================*/


"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){


loadDashboard();


});




async function loadDashboard(){


try{


const response =
await fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


action:"dashboard"


})


});



const result =
await response.json();



console.log(result);



if(result.success){


document
.getElementById("totalSchools")
.innerHTML =
result.data.totalSchools;



document
.getElementById("totalResponses")
.innerHTML =
result.data.totalResponses;



document
.getElementById("activeUsers")
.innerHTML =
result.data.activeUsers;



document
.getElementById("systemStatus")
.innerHTML =
result.data.systemStatus;



}

else{


console.log(
result.message
);


}


}

catch(error){


console.error(error);


}


}
