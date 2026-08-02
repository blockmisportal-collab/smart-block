/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JS
=====================================================*/


"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
()=>{


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



console.log(
"Dashboard:",
result
);





if(result.success){



document
.getElementById("totalSchools")
.innerText =
result.data.totalSchools;



document
.getElementById("totalResponses")
.innerText =
result.data.totalResponses;



document
.getElementById("activeUsers")
.innerText =
result.data.activeUsers;



document
.getElementById("systemStatus")
.innerText =
result.data.systemStatus;



}

else{


console.error(
result.message
);


}



}

catch(error){


console.error(
"Dashboard Error:",
error
);


}



}





/*========================
 LOGOUT
========================*/


const logoutBtn =
document.getElementById(
"logoutBtn"
);



if(logoutBtn){


logoutBtn.onclick=function(){


sessionStorage.clear();


window.location.href =
"../login.html";


};


}
