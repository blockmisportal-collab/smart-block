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


console.log(
"Dashboard Loaded"
);


loadDashboard();


setupLogout();


});





/*=====================================================
 DASHBOARD LOAD
=====================================================*/


function loadDashboard(){


const callback =
"dashboardCallback";



window[callback] =
function(result){


console.log(
"Dashboard Data",
result
);



if(result.success){


document
.getElementById(
"totalSchools"
)
.innerHTML =
result.data.totalSchools;



document
.getElementById(
"totalResponses"
)
.innerHTML =
result.data.totalResponses;



document
.getElementById(
"activeUsers"
)
.innerHTML =
result.data.activeUsers;



document
.getElementById(
"systemStatus"
)
.innerHTML =
result.data.systemStatus;



}


else{


console.error(
result.message
);


}


};




const script =
document.createElement(
"script"
);



script.src =
API_URL
+
"?action=dashboard&callback="
+
callback;



document.body.appendChild(
script
);


}





/*=====================================================
 LOGOUT
=====================================================*/


function setupLogout(){


const logoutBtn =
document.getElementById(
"logoutBtn"
);



if(!logoutBtn){

console.error(
"Logout Button Not Found"
);

return;

}



logoutBtn.onclick =
function(){



console.log(
"Logout Clicked"
);



localStorage.clear();

sessionStorage.clear();



// login page redirect

window.location.href =
"../login.html";



};



}
