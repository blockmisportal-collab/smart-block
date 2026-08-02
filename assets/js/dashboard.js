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


setupLogout();


}

);







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

"text/plain"

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


document.getElementById(
"totalSchools"
).innerHTML =

result.data.totalSchools;



document.getElementById(
"totalResponses"
).innerHTML =

result.data.totalResponses;



document.getElementById(
"activeUsers"
).innerHTML =

result.data.activeUsers;



document.getElementById(
"systemStatus"
).innerHTML =

result.data.systemStatus;


}


}

catch(error){


console.error(

"Dashboard API Error",

error

);


}


}








function setupLogout(){


const btn =

document.getElementById(
"logoutBtn"
);



if(btn){


btn.onclick=function(){



sessionStorage.clear();



window.location.href=

"../login.html";



};


}


}
