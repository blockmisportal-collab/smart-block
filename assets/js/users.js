/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 POST API VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){

loadUsers();

});




async function loadUsers(){


const table =
document.getElementById("userTable");


table.innerHTML =
`
<tr>
<td colspan="6">
Loading...
</td>
</tr>
`;



try{


const response = await fetch(
API_URL,
{

method:"POST",

headers:
{
"Content-Type":"text/plain"
},

body:JSON.stringify({

action:"users"

})

}

);



const result =
await response.json();



console.log(
"USER RESPONSE",
result
);



if(result.success){


renderUsers(
result.data
);


}

else{


table.innerHTML =
`
<tr>
<td colspan="6">
${result.message}
</td>
</tr>
`;

}



}

catch(error){


console.error(error);



table.innerHTML =
`
<tr>
<td colspan="6">
Server Connection Failed
</td>
</tr>
`;

}



}




function renderUsers(users){


const table =
document.getElementById("userTable");



table.innerHTML="";



users.forEach(user=>{


table.innerHTML +=

`

<tr>

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


</tr>

`;



});


}




window.loadUsers =
loadUsers;
