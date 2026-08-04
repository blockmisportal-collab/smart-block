/*=====================================================
 SMART FORM ENTERPRISE v6.1
 NODAL DASHBOARD JS
 FINAL STABLE VERSION
=====================================================*/

"use strict";



document.addEventListener(
"DOMContentLoaded",
function(){

loadNodalUser();

});





function loadNodalUser(){


let user =

localStorage.getItem("USER")
||
sessionStorage.getItem("USER");



if(!user){

window.location.href="../index.html";

return;

}



try{


user =
JSON.parse(user);



console.log(
"NODAL USER",
user
);



document.getElementById(
"userName"
).innerHTML =

user.name ||
user.username ||
"NODAL USER";





document.getElementById(
"nyaya"
).innerHTML =

user.nyayaPanchayat ||
user.NyayaPanchayat ||
"-";





loadSchoolCount(
user.nyayaPanchayat
);



}

catch(error){


console.error(
"USER LOAD ERROR",
error
);


}



}





async function loadSchoolCount(nyaya){



const API_URL =

"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



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

action:"schools"

})


}

);



const text =

await response.text();



const result =

JSON.parse(text);




if(result.success){


let schools =

result.data || [];




if(nyaya){


schools =

schools.filter(

item =>

(
item.NyayaPanchayat ||
item.nyayaPanchayat
)

===

nyaya


);

}



document.getElementById(
"schoolCount"
).innerHTML =

schools.length;



}



}

catch(error){


console.error(
"SCHOOL COUNT ERROR",
error
);


}



}
