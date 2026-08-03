/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT JS
=====================================================*/


"use strict";



const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_SCHOOLS = [];






document.addEventListener(

"DOMContentLoaded",

function(){


loadSchools();



document
.getElementById("searchBox")
.addEventListener(
"input",
filterSchools
);



document
.getElementById("nyayaFilter")
.addEventListener(
"change",
filterSchools
);



}

);








async function loadSchools(){



const table =

document.getElementById(
"schoolTableBody"
);



table.innerHTML =

`
<tr>
<td colspan="5">
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



console.log(
"SCHOOL API",
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



document
.getElementById(
"totalSchools"
)
.innerHTML =
ALL_SCHOOLS.length;



createNyayaFilter();



renderSchools(
ALL_SCHOOLS
);



}

catch(error){


console.error(
error
);



table.innerHTML =

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



let list = [];



ALL_SCHOOLS.forEach(

school=>{


let value =
school.nyayaPanchayat || "";



if(
value &&
!list.includes(value)
){

list.push(value);

}


}

);





list.sort();




select.innerHTML =

`
<option value="">
All Nyaya Panchayat
</option>
`;




list.forEach(

item=>{


select.innerHTML +=

`

<option value="${item}">

${item}

</option>

`;

}

);



}








function renderSchools(data){



const table =

document.getElementById(
"schoolTableBody"
);



table.innerHTML="";





if(data.length===0){


table.innerHTML =

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

school=>{


table.innerHTML +=

`

<tr>


<td>

${school.udise || "-"}

</td>



<td>

${school.schoolName || "-"}

</td>



<td>

${school.nyayaPanchayat || "-"}

</td>



<td>

${school.schoolType || "-"}

</td>



<td>

<span class="status">

ACTIVE

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
.toLowerCase();




let nyaya =

document
.getElementById("nyayaFilter")
.value;






let result =

ALL_SCHOOLS.filter(

school=>{


let text =

(
school.udise+
school.schoolName+
school.nyayaPanchayat
)

.toLowerCase();




return

text.includes(search)

&&

(
nyaya==="" ||
school.nyayaPanchayat===nyaya
);



}

);





renderSchools(result);



}







window.loadSchools =
loadSchools;
