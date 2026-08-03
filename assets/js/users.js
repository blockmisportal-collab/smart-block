/*=====================================================
 SMART FORM ENTERPRISE v6.1
 USER MANAGEMENT FINAL JS
 CORS SAFE VERSION
======================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";


let ALL_USERS = [];



/*=====================================================
 PAGE LOAD
=====================================================*/

document.addEventListener(
"DOMContentLoaded",
()=>{


loadUsers();



const refreshBtn =
document.getElementById("refreshBtn");


if(refreshBtn){

refreshBtn.onclick =
()=>loadUsers();

}



const search =
document.getElementById("searchBox");


if(search){

search.oninput =
filterUsers;

}



const role =
document.getElementById("roleFilter");


if(role){

role.onchange =
filterUsers;

}



const status =
document.getElementById("statusFilter");


if(status){

status.onchange =
filterUsers;

}



});





/*=====================================================
 LOAD USERS API
=====================================================*/


async function loadUsers(){


const tbody =
document.getElementById(
"userTableBody"
);



if(!tbody){

alert(
"userTableBody ID Missing"
);

return;

}



tbody.innerHTML =
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

}

);



const text =
await response.text();



console.log(
"USERS RESPONSE",
text
);



const result =
JSON.parse(text);




if(!result.success){

throw new Error(
result.message ||
"API Error"
);

}




ALL_USERS =
Array.isArray(result.data)
?
result.data
:
[];




const total =
document.getElementById(
"totalUsers"
);



if(total){

total.innerHTML =
ALL_USERS.length;

}



renderUsers(
ALL_USERS
);



}

catch(error){


console.error(
"USER ERROR",
error
);



tbody.innerHTML =
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
 DISPLAY USERS
=====================================================*/


function renderUsers(users){



const tbody =
document.getElementById(
"userTableBody"
);



if(!tbody){

return;

}



tbody.innerHTML="";




if(users.length===0){


tbody.innerHTML=

`

<tr>

<td colspan="7">

No User Found

</td>

</tr>

`;

return;

}




users.forEach(
(user)=>{



const active =
(
user.active===true ||
String(user.active)
.toUpperCase()
==="TRUE"
);



tbody.innerHTML +=

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

<span class="status ${active?"active":"inactive"}">

${active?"ACTIVE":"INACTIVE"}

</span>

</td>


</tr>

`;



});



}







/*=====================================================
 SEARCH FILTER
=====================================================*/


function filterUsers(){



const search =
document.getElementById(
"searchBox"
);



const role =
document.getElementById(
"roleFilter"
);



const status =
document.getElementById(
"statusFilter"
);




let s =
search?
search.value.toLowerCase()
:
"";



let r =
role?
role.value
:
"";



let st =
status?
status.value
:
"";




const filtered =
ALL_USERS.filter(

(user)=>{


const text =

(

(user.username || "")+
(user.name || "")+
(user.schoolCode || "")+
(user.schoolName || "")

)
.toLowerCase();





const active =
(
user.active===true ||
String(user.active)
.toUpperCase()
==="TRUE"
);



const userStatus =
active?
"ACTIVE":
"INACTIVE";





return

text.includes(s)

&&

(
r==="" ||
user.role===r
)

&&

(
st==="" ||
userStatus===st
);



}

);



renderUsers(
filtered
);



}
