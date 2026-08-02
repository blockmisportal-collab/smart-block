/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 Google Sheet Based
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){

loadUsers();

}

);





/*=====================================================
 LOAD USERS
=====================================================*/


function loadUsers(){


const callback =
"usersCallback";



window[callback] = function(response){


console.log(
"USER DATA",
response
);



if(
response.success
){


renderUsers(
response.data
);


}

else{


alert(
response.message
);


}


};



const script =
document.createElement("script");


script.src =
API_URL +
"?action=users&callback=" +
callback;



script.id =
"userApiScript";



document.body.appendChild(
script
);



}








/*=====================================================
 RENDER USERS
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



const username =
user.username ||
user.Username ||
"";



const name =
user.name ||
user.Name ||
"";



const role =
user.role ||
user.Role ||
"";



const nyaya =
user.nyayaPanchayat ||
user.NyayaPanchayat ||
"";



const schoolCode =
user.schoolCode ||
user.SchoolCode ||
"";



const schoolName =
user.schoolName ||
user.SchoolName ||
"";



const active =
String(
user.active ||
user.Active ||
""
)
.toUpperCase()
==="TRUE";





const row =
document.createElement(
"tr"
);



row.innerHTML =

`

<td>
${username}
</td>


<td>
${name}
</td>


<td>
${role}
</td>


<td>
${nyaya}
</td>


<td>
${schoolCode}
</td>


<td>
${schoolName}
</td>


<td>

<span class="badge">

${active ? "ACTIVE":"INACTIVE"}

</span>

</td>

`;



table.appendChild(row);



}

);


}





/*=====================================================
 REFRESH BUTTON SUPPORT
=====================================================*/


window.loadUsers = loadUsers;
