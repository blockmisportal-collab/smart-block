/*=====================================================
 SMART FORM ENTERPRISE v6.1
 USER MANAGEMENT FINAL JS
======================================================*/


"use strict";



const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_USERS = [];





document.addEventListener(
"DOMContentLoaded",
function(){


loadUsers();



const refresh =
document.getElementById("refreshBtn");


if(refresh){

refresh.addEventListener(
"click",
function(){

loadUsers();

});

}




document
.getElementById("searchBox")
.addEventListener(
"input",
filterUsers
);



document
.getElementById("roleFilter")
.addEventListener(
"change",
filterUsers
);



document
.getElementById("statusFilter")
.addEventListener(
"change",
filterUsers
);



});








async function loadUsers(){



const tbody =
document.getElementById(
"userTableBody"
);



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
"USER API:",
text
);



const result =
JSON.parse(text);




if(!result.success){

throw new Error(
result.message
);

}




ALL_USERS =
result.data || [];



document
.getElementById(
"totalUsers"
)
.innerHTML =
ALL_USERS.length;



renderUsers(
ALL_USERS
);



}
catch(error){



console.error(
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








function renderUsers(users){


const tbody =
document.getElementById(
"userTableBody"
);



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

function(user){



let active =
(
user.active===true ||
String(user.active).toUpperCase()
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










function filterUsers(){



let search =
document
.getElementById("searchBox")
.value
.toLowerCase();



let role =
document
.getElementById("roleFilter")
.value;



let status =
document
.getElementById("statusFilter")
.value;





let filtered =
ALL_USERS.filter(

function(user){



let text =
(
String(user.username)+
String(user.name)+
String(user.schoolCode)+
String(user.schoolName)
)
.toLowerCase();




let active =
(
user.active===true ||
String(user.active).toUpperCase()
==="TRUE"
);



let userStatus =
active?
"ACTIVE":
"INACTIVE";





return


text.includes(search)

&&

(role==="" ||
user.role===role)


&&

(status==="" ||
userStatus===status);



}



);





renderUsers(filtered);



}
