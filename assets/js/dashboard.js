/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard JavaScript
 File : dashboard.js
 Version : JSONP API
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


setupLogout();


}

);







/*=====================================================
 LOAD USER
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



const name =
document.getElementById(
"userName"
);



const role =
document.getElementById(
"userRole"
);



if(name){

name.innerHTML =
user.name || "Administrator";

}



if(role){

role.innerHTML =
user.role || "ADMIN";

}



}

catch(error){


console.error(error);


}


}








/*=====================================================
 LOAD DASHBOARD JSONP
=====================================================*/


function loadDashboard(){



const callbackName =

"dashboardCallback";



window[callbackName] =

function(response){



console.log(

"Dashboard Response",

response

);



if(response.success){



document.getElementById(

"totalSchools"

).innerHTML =

response.data.totalSchools;



document.getElementById(

"totalResponses"

).innerHTML =

response.data.totalResponses;



document.getElementById(

"activeUsers"

).innerHTML =

response.data.activeUsers;



document.getElementById(

"systemStatus"

).innerHTML =

response.data.systemStatus;



}

else{


console.error(

response.message

);


}



};





const script =

document.createElement("script");



script.src =

API_URL +

"?action=dashboard&callback="

+

callbackName;



script.onerror = function(){


console.error(

"Dashboard API Failed"

);


};



document.body.appendChild(script);



}








/*=====================================================
 LOGOUT
=====================================================*/


function setupLogout(){


const btn =

document.getElementById(

"logoutBtn"

);



if(btn){



btn.onclick=function(){



sessionStorage.clear();



window.location.href =

"../login.html";



};



}


}
