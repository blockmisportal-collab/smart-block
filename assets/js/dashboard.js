/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JS
 JSONP Version (CORS FIX)
=====================================================*/


"use strict";


// Google Apps Script Web App URL
const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){


console.log("Loading Dashboard...");


loadDashboard();


logoutHandler();


});





/*=====================================================
 LOAD DASHBOARD
=====================================================*/


function loadDashboard(){


const callbackName =
"dashboardCallback";



window[callbackName] =
function(result){


console.log(
"Dashboard Response:",
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


removeScript();

};





const script =
document.createElement("script");


script.id =
"dashboardAPI";


script.src =
API_URL
+
"?action=dashboard&callback="
+
callbackName;



document.body.appendChild(script);



}





/*=====================================================
 REMOVE JSONP SCRIPT
=====================================================*/


function removeScript(){


const old =
document.getElementById(
"dashboardAPI"
);


if(old){

old.remove();

}


}





/*=====================================================
 LOGOUT
=====================================================*/


function logoutHandler(){


const btn =
document.getElementById(
"logoutBtn"
);



if(!btn){

return;

}



btn.addEventListener(
"click",
function(){



localStorage.clear();

sessionStorage.clear();



window.location.href =
"../login.html";



});


}
