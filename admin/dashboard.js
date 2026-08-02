/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JS
 File : dashboard.js
 Version : Production Final
=====================================================*/


"use strict";



/*=====================================================
 API URL
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


logout();


});





/*=====================================================
 LOAD USER SESSION
=====================================================*/


function loadUser(){


try{


const user =
JSON.parse(
sessionStorage.getItem("USER")
);



if(!user){

return;

}



document
.getElementById("userName")
.innerHTML =
user.name || "Administrator";



document
.getElementById("userRole")
.innerHTML =
user.role || "ADMIN";



}

catch(error){


console.error(error);


}


}







/*=====================================================
 LOAD DASHBOARD DATA
=====================================================*/


async function loadDashboard(){


try{



const response =
await fetch(
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
"Dashboard:",
result
);





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


console.error(
result.message
);


}



}

catch(error){


console.error(
"Dashboard API Error:",
error
);



document
.getElementById("systemStatus")
.innerHTML =
"OFFLINE";



}



}








/*=====================================================
 LOGOUT
=====================================================*/


function logout(){



const btn =
document
.getElementById("logoutBtn");



if(!btn){

return;

}



btn.onclick=function(){



sessionStorage.removeItem(
"USER"
);



window.location.href =
"../login.html";



};



}
