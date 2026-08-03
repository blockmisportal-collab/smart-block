/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT JS
 FINAL FIX VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";


let ALL_SCHOOLS = [];



document.addEventListener(
"DOMContentLoaded",
()=>{


loadSchools();


const refresh =
document.querySelector(".refresh");


if(refresh){

refresh.onclick =
loadSchools;

}



const search =
document.getElementById("searchBox");


if(search){

search.addEventListener(
"input",
filterSchools
);

}



const filter =
document.getElementById("nyayaFilter");


if(filter){

filter.addEventListener(
"change",
filterSchools
);

}


});






async function loadSchools(){


const tbody =
document.getElementById(
"schoolTableBody"
);



tbody.innerHTML =
`
<tr>
<td colspan="5">
Loading...
</td>
</tr>
`;



try{


const res =
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
await res.text();



console.log(
"SCHOOL RESPONSE",
text
);



const result =
JSON.parse(text);



if(!result.success){

throw new Error(
result.message
);

}



ALL_SCHOOLS =
result.data || [];




document.getElementById(
"totalSchools"
).innerHTML =
ALL_SCHOOLS.length;




createNyayaFilter();



renderSchools(
ALL_SCHOOLS
);



}

catch(err){


console.error(err);


tbody.innerHTML =
`
<tr>
<td colspan="5">
Server Connection Failed
</td>
</tr>
`;

}



}









function createNyayaFilter(){



const select =
document.getElementById(
"nyayaFilter"
);



if(!select)
return;




let values =
[];




ALL_SCHOOLS.forEach(

s=>{


let np =

s.NyayaPanchayat ||

s.nyayaPanchayat ||

"";



if(
np &&
!values.includes(np)
){

values.push(np);

}


}

);



values.sort();




select.innerHTML =
`
<option value="">
All Nyaya Panchayat
</option>
`;



values.forEach(

v=>{


select.innerHTML +=
`
<option value="${v}">
${v}
</option>
`;

}

);



}









function renderSchools(data){



const tbody =
document.getElementById(
"schoolTableBody"
);



tbody.innerHTML="";




if(
data.length===0
){

tbody.innerHTML=
`
<tr>
<td colspan="5">
No School Found
</td>
</tr>
`;

return;

}





data.forEach(

s=>{


tbody.innerHTML +=
`

<tr>

<td>
${s.UDISECode || s.udise || "-"}
</td>


<td>
${s.SchoolName || s.schoolName || "-"}
</td>


<td>
${s.NyayaPanchayat || s.nyayaPanchayat || "-"}
</td>


<td>
${s.SchoolType || s.schoolType || "-"}
</td>


<td>

<span class="status">
${s.Status || "ACTIVE"}
</span>

</td>


</tr>

`;

}

);



}









function filterSchools(){



let search =

document
.getElementById("searchBox")
.value
.toLowerCase()
.trim();




let np =

document
.getElementById("nyayaFilter")
.value
.toLowerCase()
.trim();





let filtered =

ALL_SCHOOLS.filter(

s=>{


let code =

String(
s.UDISECode || ""
)
.toLowerCase();



let name =

String(
s.SchoolName || ""
)
.toLowerCase();



let nyaya =

String(
s.NyayaPanchayat || ""
)
.toLowerCase();





return


(

code.includes(search)

||

name.includes(search)

||

nyaya.includes(search)

)


&&


(

np==="" 

||

nyaya===np

);



}

);



renderSchools(
filtered
);



}



window.loadSchools =
loadSchools;
