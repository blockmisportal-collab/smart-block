/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 Google Sheet Based
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
 LOAD USERS FROM API
=====================================================*/


async function loadUsers(){


const table =

document.getElementById(
"userTable"
);



table.innerHTML =

`
<tr>
<td colspan="7">
Loading...
</td>
</tr>
`;



try{


const response = await fetch(

API_URL +
"?action=users"

);



const result =

await response.json();



console.log(
"USER DATA",
result
);




if(
result.success
){


renderUsers(
result.data
);


}

else{


table.innerHTML =

`
<tr>

<td colspan="7">

${result.message}

</td>

</tr>
`;



}



}

catch(error){


console.error(
error
);



table.innerHTML =

`
<tr>

<td colspan="7">

Server Connection Failed

</td>

</tr>
`;



}


}








/*=====================================================
 RENDER USERS
=====================================================*/


function renderUsers(users){


const table =

document.getElementById(
"userTable"
);



table.innerHTML = "";





users.forEach(

function(user){



const username =

user.username || "";



const name =

user.name || "";



const role =

user.role || "";



const nyaya =

user.nyayaPanchayat || "";



const schoolCode =

user.schoolCode || "";



const schoolName =

user.schoolName || "";



const active =

user.active === true ||
String(user.active)
.toUpperCase()
==="TRUE";






table.innerHTML +=

`

<tr>


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

${schoolCode || "-"}

</td>


<td>

${schoolName || "-"}

</td>


<td>

<span class="badge">

${
active
?
"ACTIVE"
:
"INACTIVE"
}

</span>

</td>
${
active
?
"ACTIVE"
:
"INACTIVE"
}

</span>


</td>



</tr>

`;



}


);



}






/*=====================================================
 GLOBAL REFRESH BUTTON
=====================================================*/


window.loadUsers =
loadUsers;
