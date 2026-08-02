/*=====================================================
 SMART FORM ENTERPRISE v6.0
 Admin Dashboard Controller
 File : dashboard.js
 Version : Production Final
=====================================================*/


"use strict";



/*=====================================================
 API URL
=====================================================*/


const API_URL =

"https://script.google.com/macros/s/AKfycbzq-jTpW9im77vKBpZISbZ9aGPfkLKQ1gVyIzK2st6rFF3cAmk7IUjm94PxXD6bsNCevg/exec";





/*=====================================================
 PAGE LOAD
=====================================================*/


document.addEventListener(

"DOMContentLoaded",

function(){


loadUser();

loadDashboard();

bindEvents();


}

);






/*=====================================================
 LOAD USER
=====================================================*/


function loadUser(){


const user =

JSON.parse(

sessionStorage.getItem("USER")

);



if(!user){


window.location.href="../login.html";

return;


}



document.getElementById(

"userName"

).innerHTML =

user.name || "Administrator";



document.getElementById(

"userRole"

).innerHTML =

user.role || "";



}








/*=====================================================
 DASHBOARD API
=====================================================*/


async function loadDashboard(){



try{


const token =

JSON.parse(

sessionStorage.getItem("USER")

).token;




const response =

await fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":

"text/plain;charset=utf-8"


},


body:JSON.stringify({


action:"dashboard",


token:token


})


});




const result =

await response.json();





if(!result.success){


console.log(
result.message
);


return;


}





const data =

result.data;





document.getElementById(

"totalSchools"

).innerHTML =

data.totalSchools;




document.getElementById(

"totalResponses"

).innerHTML =

data.totalResponses;




document.getElementById(

"activeUsers"

).innerHTML =

data.activeUsers;




document.getElementById(

"systemStatus"

).innerHTML =

data.systemStatus;




}

catch(error){


console.error(error);


}

}








/*=====================================================
 EVENTS
=====================================================*/


function bindEvents(){



const logout =

document.getElementById(

"logoutBtn"

);



if(logout){


logout.onclick =

function(){


sessionStorage.clear();


window.location.href="../login.html";


};


}



}
