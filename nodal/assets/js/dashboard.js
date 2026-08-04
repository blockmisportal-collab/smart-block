/*=====================================================
 SMART FORM ENTERPRISE v6.1
 NODAL DASHBOARD JS
 FINAL ENTERPRISE VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwLMuH57q6Re4jjKoLzvbptYePUmd-QQQpPHgQCcfnqV37VtwRjxgGvhNWX3nmk3JRbdw/exec";

let ALL_SCHOOLS = [];

let NODAL_USER = {};





document.addEventListener(
"DOMContentLoaded",
()=>{


loadUser();

loadSchools();


});







/*==============================
 USER SESSION
==============================*/


function loadUser(){


let data =

sessionStorage.getItem("USER")
||
localStorage.getItem("USER");



if(!data){

location.href="../index.html";

return;

}



try{


NODAL_USER =
JSON.parse(data);



document.getElementById(
"userName"
).textContent =

NODAL_USER.name
||
NODAL_USER.username
||
"NODAL USER";





document.getElementById(
"nyaya"
).textContent =

NODAL_USER.nyayaPanchayat
||
NODAL_USER.NyayaPanchayat
||
"-";



}

catch(e){

console.error(
"SESSION ERROR",
e
);

location.href="../index.html";

}


}










/*==============================
 LOAD SCHOOL DATA
==============================*/


async function loadSchools(){



const table =

document.getElementById(
"schoolList"
);



table.innerHTML =

`
<tr>
<td colspan="4">
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

action:"schools"

})


}

);



const text =
await response.text();



const result =
JSON.parse(text);



console.log(
"SCHOOL API",
result
);





if(
!result.success
){

throw new Error(
result.message
);

}






let nodalNyaya =

String(

NODAL_USER.nyayaPanchayat
||
NODAL_USER.NyayaPanchayat
||
""

)

.trim()
.toUpperCase();








ALL_SCHOOLS =


(result.data || [])

.filter(

school=>{


let schoolNyaya =

String(

school.NyayaPanchayat
||
school.nyayaPanchayat
||
""

)

.trim()
.toUpperCase();



return schoolNyaya===nodalNyaya;


}

)

.map(item=>{


return {

udise:

item.UDISECode
||
item.udise
||
"-",


schoolName:

item.SchoolName
||
item.schoolName
||
"-",


schoolType:

item.SchoolType
||
item.schoolType
||
"-",


status:

item.Status
||
item.status
||
"ACTIVE",


nyayaPanchayat:

item.NyayaPanchayat
||
item.nyayaPanchayat
||
""

};


});







document.getElementById(
"schoolCount"
).textContent =

ALL_SCHOOLS.length;





renderSchools(
ALL_SCHOOLS
);





bindSearch();



}


catch(error){



console.error(
"LOAD SCHOOL ERROR",
error
);



table.innerHTML =

`
<tr>
<td colspan="4">
Server Connection Error
</td>
</tr>
`;



}



}









/*==============================
 SEARCH
==============================*/


function bindSearch(){


const box =

document.getElementById(
"schoolSearch"
);



if(!box)
return;



box.oninput =
filterSchools;



}









function filterSchools(){


let value =

document.getElementById(
"schoolSearch"
)

.value

.toLowerCase()

.trim();





let data =


ALL_SCHOOLS.filter(

item=>{


let text =


(

item.udise+

" "+

item.schoolName+

" "+

item.schoolType+

" "+

item.nyayaPanchayat

)

.toLowerCase();



return text.includes(value);



}


);




renderSchools(data);



}










/*==============================
 RENDER TABLE
==============================*/


function renderSchools(data){



const table =

document.getElementById(
"schoolList"
);



table.innerHTML="";





if(
data.length===0
){


table.innerHTML=

`
<tr>
<td colspan="4">
No School Found
</td>
</tr>
`;

return;

}





data.forEach(

item=>{


table.innerHTML +=

`

<tr onclick="openSchool('${item.udise}')">


<td>
${item.udise}
</td>


<td>
${item.schoolName}
</td>


<td>
${item.schoolType}
</td>


<td>

<span class="status">
${item.status}
</span>

</td>


</tr>

`;



});


}








/*==============================
 FUTURE FORM BUILDER LINK
==============================*/


function openSchool(udise){


sessionStorage.setItem(

"SELECTED_SCHOOL",

udise

);


// Future Form Builder


// location.href="../forms/index.html";


}



window.loadSchools =
loadSchools;
