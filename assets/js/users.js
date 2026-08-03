/*=====================================================
 SMART FORM ENTERPRISE v6.1
 USER MANAGEMENT JS
======================================================*/


"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



document.addEventListener(
"DOMContentLoaded",
function(){


loadUsers();



const btn =
document.getElementById("refreshBtn");


if(btn){

btn.addEventListener(
"click",
function(){

loadUsers();

});

}



});





async function loadUsers(){



const table =
document.getElementById("userTableBody");



if(!table){


console.error(
"ERROR: userTableBody not found"
);


alert(
"userTableBody ID Missing"
);


return;

}



table.innerHTML=
`
<tr>
<td colspan="7">
Loading...
</td>
</tr>
`;




try{


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


});





const text =
await response.text();



console.log(
"SERVER RESPONSE",
text
);



const result =
JSON.parse(text);





if(!result.success){


throw new Error(
result.message ||
"Data Load Failed"
);


}




let users =
result.data || [];




table.innerHTML="";




users.forEach(
function(user){



let status =
user.active==true ||
user.active=="TRUE"
?
"ACTIVE"
:
"INACTIVE";




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
${user.nyayapanchayat || ""}
</td>


<td>
${user.schoolCode || ""}
</td>


<td>
${user.schoolName || ""}
</td>


<td>

<span class="status">
${status}
</span>

</td>


</tr>

`;



});





}
catch(error){


console.error(
"USER LOAD ERROR",
error
);



table.innerHTML=
`

<tr>

<td colspan="7">

Server Connection Failed

</td>

</tr>

`;



}



}
