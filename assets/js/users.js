/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 Google Sheet Based Version
=====================================================*/


"use strict";



const API_URL =

"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";





/*=====================================================
 PAGE LOAD
=====================================================*/


document.addEventListener(

"DOMContentLoaded",

function(){

loadUsers();

}

);







/*=====================================================
 LOAD USERS JSONP
=====================================================*/


function loadUsers(){


const callbackName =

"usersCallback";



window[callbackName] =

function(response){



console.log(
"Users Response",
response
);



if(response.success){


renderUsers(
response.data
);


}

else{


console.error(
response.message
);


alert(
response.message
);


}



removeScript();


};






const script =

document.createElement(
"script"
);



script.id =
"usersAPI";



script.src =

API_URL

+
"?action=users&callback="

+
callbackName;



document.body.appendChild(
script
);



}








/*=====================================================
 DISPLAY USERS
=====================================================*/


function renderUsers(users){


const table =

document.getElementById(
"userTable"
);



if(!table){

return;

}



table.innerHTML="";




users.forEach(

function(user){



const row =

document.createElement(
"tr"
);



row.innerHTML = `


<td>
${user.username || ""}
</td>


<td>
${user.name || ""}
</td>


<td>
${user.role || ""}
</td>


<td>
${user.nyayaPanchayat || ""}
</td>


<td>
${user.schoolCode || ""}
</td>


<td>

<span class="badge">

${
user.active
?
"ACTIVE"
:
"INACTIVE"
}

</span>

</td>


`;



table.appendChild(row);



}

);



}








/*=====================================================
 REMOVE JSONP SCRIPT
=====================================================*/


function removeScript(){


const script =

document.getElementById(
"usersAPI"
);



if(script){

script.remove();

}


}
