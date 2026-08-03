"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){

loadUsers();

});





async function loadUsers(){


const tbody =
document.getElementById("userTableBody");


try{


tbody.innerHTML =
`
<tr>
<td colspan="7">
Loading...
</td>
</tr>
`;



const response =
await fetch(

API_URL,

{

method:"POST",

headers:{

"Content-Type":
"text/plain;charset=utf-8"

},

body:JSON.stringify({

action:"users"

})

}

);



const result =
await response.json();



console.log(result);



if(
!result.success
){

throw new Error(
result.message
);

}



tbody.innerHTML="";



result.data.forEach(
function(user){



tbody.innerHTML +=
`

<tr>

<td>${user.username || "-"}</td>

<td>${user.name || "-"}</td>

<td>${user.role || "-"}</td>

<td>${user.nyayaPanchayat || "-"}</td>

<td>${user.schoolCode || "-"}</td>

<td>${user.schoolName || "-"}</td>


<td>

<span class="status">

${user.active ? "ACTIVE":"INACTIVE"}

</span>

</td>


</tr>

`;



});


}

catch(error){


console.error(
"USER ERROR",
error
);


tbody.innerHTML=
`

<tr>

<td colspan="7">

Server Connection Failed

</td>

</tr>

`;


}



}





function goBack(){

window.location.href=
"dashboard.html";

}
