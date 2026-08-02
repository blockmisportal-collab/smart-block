/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 Production Version
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
 LOAD USERS
=====================================================*/


async function loadUsers(){


const table =

document.getElementById(
"userTable"
);



if(!table){

return;

}



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
"USER API RESPONSE",
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
 RENDER USER TABLE
=====================================================*/


function renderUsers(users){



const table =

document.getElementById(
"userTable"
);



table.innerHTML = "";





users.forEach(

(user)=>{


const active =

String(user.active)

.toUpperCase()

==="TRUE";





table.innerHTML +=

`

<tr>


<td>

${user.username || "-"}

</td>



<td>

${user.name || "-"}

</td>



<td>

${user.role || "-"}

</td>



<td>

${user.nyayaPanchayat || "-"}

</td>



<td>

${user.schoolCode || "-"}

</td>



<td>

${user.schoolName || "-"}

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



</tr>

`;



}


);



}






/*=====================================================
 REFRESH BUTTON
=====================================================*/


window.loadUsers =

loadUsers;
