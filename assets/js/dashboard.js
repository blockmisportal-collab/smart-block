/*=====================================================
 SMART FORM ENTERPRISE v6.1
 Admin Dashboard JS
 Production Version
=====================================================*/


"use strict";



const API_URL =

"https://script.google.com/macros/s/AKfycbwLMuH57q6Re4jjKoLzvbptYePUmd-QQQpPHgQCcfnqV37VtwRjxgGvhNWX3nmk3JRbdw/exec";




document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"Loading Dashboard..."
);



loadDashboard();



setupLogout();



});








/*=====================================================
 LOAD DASHBOARD DATA
=====================================================*/


function loadDashboard(){



const callbackName =

"dashboardCallback";




window[callbackName] =

function(response){



console.log(
"Dashboard Response:",
response
);




if(
response.success
){



const data =
response.data;



document
.getElementById(
"totalSchools"
)
.innerHTML =
data.totalSchools || 0;





document
.getElementById(
"totalResponses"
)
.innerHTML =
data.totalResponses || 0;





document
.getElementById(
"activeUsers"
)
.innerHTML =
data.activeUsers || 0;





if(
document.getElementById(
"pendingForms"
)
){


document
.getElementById(
"pendingForms"
)
.innerHTML =
data.pendingForms || 0;


}





document
.getElementById(
"systemStatus"
)
.innerHTML =
data.systemStatus || "OFFLINE";




}

else{


console.error(

"Dashboard Error:",

response.message

);


}



removeJSONPScript();



};






const script =

document.createElement(
"script"
);



script.id =

"dashboardJSONP";



script.src =

API_URL

+
"?action=dashboard&callback="

+
callbackName;




document.body.appendChild(
script
);



}









/*=====================================================
 REMOVE JSONP SCRIPT
=====================================================*/


function removeJSONPScript(){


const script =

document.getElementById(
"dashboardJSONP"
);



if(script){

script.remove();

}


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
"Logout Button Missing"
);


return;


}






logoutBtn.addEventListener(

"click",

function(){



console.log(
"Logout Clicked"
);




localStorage.clear();


sessionStorage.clear();





window.location.href =

"../login.html";



}



);



}
