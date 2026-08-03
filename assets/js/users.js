/*=====================================================
 SMART FORM ENTERPRISE v6.1
 USER MANAGEMENT JS
 FINAL STABLE VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";


let ALL_USERS = [];




document.addEventListener(
"DOMContentLoaded",
function(){


loadUsers();



const search =
document.getElementById("searchBox");


if(search){

search.addEventListener(
"input",
filterUsers
);

}



const role =
document.getElementById("roleFilter");


if(role){

role.addEventListener(
"change",
filterUsers
);

}



const status =
document.getElementById("statusFilter");


if(status){

status.addEventListener(
"change",
filterUsers
);

}



const refresh =
document.getElementById("refreshBtn");


if(refresh){

refresh.addEventListener(
"click",
loadUsers
);

}



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


body:

JSON.stringify({

action:"users"

})


}

);



const text =
await response.text();



console.log(
"USER API RESPONSE",
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

(result.data || [])
.map(
normalizeUser
);






document.getElementById(
"totalUsers"
).innerHTML =

ALL_USERS.length;





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









function normalizeUser(user){



return {


username:

String(

user.username ||

user.Username ||

""

),




name:

String(

user.name ||

user.Name ||

""

),




role:

String(

user.role ||

user.Role ||

""

)
.toUpperCase(),





nyayaPanchayat:

String(

user.nyayaPanchayat ||

user.NyayaPanchayat ||

user.Nyaya ||

""

),





schoolCode:

String(

user.schoolCode ||

user.SchoolCode ||

""

),




schoolName:

String(

user.schoolName ||

user.SchoolName ||

""

),





active:

String(

user.active ??

user.Active ??

""

)
.toUpperCase()
==="TRUE"



};


}









function renderUsers(users){



const tbody =
document.getElementById(
"userTableBody"
);



tbody.innerHTML="";





if(
users.length===0
){


tbody.innerHTML =

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
user=>{


tbody.innerHTML +=

`

<tr>


<td>
${user.username}
</td>



<td>
${user.name}
</td>



<td>
${user.role}
</td>



<td>
${user.nyayaPanchayat}
</td>



<td>
${user.schoolCode}
</td>



<td>
${user.schoolName}
</td>



<td>


<span class="status ${user.active ? "active":"inactive"}">

${user.active ? "ACTIVE":"INACTIVE"}

</span>



</td>


</tr>

`;



});



}









function filterUsers(){



let search =

(
document.getElementById(
"searchBox"
)?.value || ""
)

.toLowerCase()
.trim();




let role =

(
document.getElementById(
"roleFilter"
)?.value || ""
)

.toUpperCase();





let status =

(
document.getElementById(
"statusFilter"
)?.value || ""
)

.toUpperCase();







let result =

ALL_USERS.filter(

user=>{



let text =

(

user.username+

" "+

user.name+

" "+

user.role+

" "+

user.nyayaPanchayat+

" "+

user.schoolCode+

" "+

user.schoolName

)

.toLowerCase();






let userStatus =

user.active ?

"ACTIVE" :

"INACTIVE";






return


text.includes(search)

&&


(
role==="" ||

user.role===role

)


&&


(
status==="" ||

userStatus===status

);



}

);





renderUsers(
result
);



}




window.loadUsers =
loadUsers;
