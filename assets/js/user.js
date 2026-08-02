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
function(){


loadUsers();


});







/*=====================================================
 LOAD USERS
=====================================================*/


async function loadUsers(){


try{


const response =

await fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


action:"users"


})


});



const result =

await response.json();



console.log(result);



if(result.success){


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
"User API Error",
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

document.getElementById(
"userTable"
);



table.innerHTML="";




users.forEach(
function(user){



const row =

document.createElement(
"tr"
);



row.innerHTML = `


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

${user.active ? 
"ACTIVE":
"INACTIVE"}

</span>


</td>


`;



table.appendChild(row);



});


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


const response =

await fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


action:"createUser",


user:user


})


});





const result =

await response.json();





if(result.success){


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
