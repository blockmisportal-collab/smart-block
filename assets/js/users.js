/*=====================================================
 SMART FORM ENTERPRISE v6.1
 User Management JS
 File : users.js
=====================================================*/


"use strict";



const API_URL =

"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";






document.addEventListener(
"DOMContentLoaded",
()=>{

loadUsers();

}

);








/*=====================================================
 API CALL
 CORS SAFE
=====================================================*/


async function apiCall(payload){


const response =

await fetch(
API_URL,
{


method:"POST",


body:

JSON.stringify(payload)


}
);



return await response.json();


}








/*=====================================================
 LOAD USERS
=====================================================*/


async function loadUsers(){


try{


console.log(
"Loading Users..."
);



const result =

await apiCall({

action:"users"

});



console.log(result);




if(
result.success
){


renderUsers(
result.data
);


}

else{


alert(
result.message
);


}



}


catch(error){


console.error(
error
);


alert(
"Server Connection Failed"
);


}


}









/*=====================================================
 DISPLAY USERS
=====================================================*/


function renderUsers(users){


const table =

document
.getElementById(
"userTable"
);



table.innerHTML="";



users.forEach(
user=>{


const row =

document.createElement(
"tr"
);



row.innerHTML =


`

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
 CREATE USER
=====================================================*/


async function createUser(){


const user = {


username:

document
.getElementById("username")
.value,



password:

document
.getElementById("password")
.value,



role:

document
.getElementById("role")
.value,



name:

document
.getElementById("name")
.value


};





if(
!user.username ||
!user.password ||
!user.name
){


alert(
"Please fill all fields"
);


return;


}





try{


const result =

await apiCall({

action:"createUser",

user:user

});




console.log(result);




if(
result.success
){


alert(
"User Created Successfully"
);



loadUsers();



}

else{


alert(
result.message
);


}



}


catch(error){


console.error(error);


alert(
"Create User Failed"
);


}



}
