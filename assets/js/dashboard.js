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


setupLogout();


}

);






async function loadDashboard(){


try{


const response = await fetch(

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



const result =

await response.json();



console.log(

"Dashboard Response",

result

);



if(result.success){


document.getElementById(
"totalSchools"
).innerText =

result.data.totalSchools;



document.getElementById(
"totalResponses"
).innerText =

result.data.totalResponses;



document.getElementById(
"activeUsers"
).innerText =

result.data.activeUsers;



document.getElementById(
"systemStatus"
).innerText =

result.data.systemStatus;



}



}

catch(error){


console.error(

"Dashboard Error",

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


window.location.href =

"../login.html";


};


}


}
