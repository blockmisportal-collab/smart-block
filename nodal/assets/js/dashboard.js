/*=====================================================
 SMART FORM ENTERPRISE v6.1
 NODAL DASHBOARD JS
 SCHOOL LIST FINAL VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_SCHOOLS = [];

let NODAL_USER = {};





document.addEventListener(
"DOMContentLoaded",
function(){

loadUser();

loadSchools();

});






function loadUser(){


let data =

localStorage.getItem("USER")
||
sessionStorage.getItem("USER");



if(!data){

location.href="../index.html";

return;

}



try{


NODAL_USER =
JSON.parse(data);



document.getElementById(
"userName"
).innerHTML =

NODAL_USER.name ||
NODAL_USER.username ||
"NODAL USER";




document.getElementById(
"nyaya"
).innerHTML =

NODAL_USER.nyayaPanchayat ||
NODAL_USER.NyayaPanchayat ||
"-";



}

catch(error){

console.error(error);

}


}








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

body:JSON.stringify({

action:"schools"

})

}

);



const text =
await response.text();



const result =
JSON.parse(text);



console.log(
"SCHOOL DATA",
result
);



if(!result.success){

throw new Error(
result.message
);

}



let nyaya =

NODAL_USER.nyayaPanchayat ||
NODAL_USER.NyayaPanchayat ||
"";





ALL_SCHOOLS =

(result.data || [])
.filter(function(item){


let itemNyaya =

item.NyayaPanchayat ||
item.nyayaPanchayat ||
"";



return itemNyaya === nyaya;


});





document.getElementById(
"schoolCount"
).innerHTML =

ALL_SCHOOLS.length;



renderSchools(
ALL_SCHOOLS
);





let search =

document.getElementById(
"schoolSearch"
);



if(search){


search.addEventListener(

"input",

filterSchools

);


}



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
Server Error
</td>
</tr>
`;



}



}









function renderSchools(data){



const table =

document.getElementById(
"schoolList"
);



table.innerHTML="";




if(data.length===0){


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




data.forEach(function(item){



table.innerHTML +=


`

<tr>


<td>

${item.UDISECode || item.udise || "-"}

</td>



<td>

${item.SchoolName || item.schoolName || "-"}

</td>



<td>

${item.SchoolType || item.schoolType || "-"}

</td>



<td>

<span class="status">

${item.Status || item.status || "ACTIVE"}

</span>

</td>


</tr>

`;



});


}









function filterSchools(){



let value =

document.getElementById(
"schoolSearch"
)
.value
.toLowerCase()
.trim();




let result =

ALL_SCHOOLS.filter(function(item){


let text =

(

item.UDISECode +

" " +

item.SchoolName +

" " +

item.SchoolType

)

.toLowerCase();



return text.includes(value);



});



renderSchools(result);



}
