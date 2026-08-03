/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT CONTROLLER
 FINAL STABLE VERSION
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_SCHOOLS = [];





document.addEventListener(
"DOMContentLoaded",
function(){


loadSchools();



const search =
document.getElementById(
"searchBox"
);



if(search){

search.addEventListener(
"input",
filterSchools
);

}




const filter =
document.getElementById(
"nyayaFilter"
);



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



if(!tbody){
return;
}



tbody.innerHTML =

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


body:

JSON.stringify({

action:"schools"

})


}

);



const text =
await response.text();



console.log(
"SCHOOL API RESPONSE",
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



ALL_SCHOOLS =

Array.isArray(result.data)

?
result.data

:
[];




document.getElementById(
"totalSchools"
).innerHTML =
ALL_SCHOOLS.length;



createNyayaFilter();



renderSchools(
ALL_SCHOOLS
);



}

catch(error){


console.error(
"SCHOOL LOAD ERROR",
error
);



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



let nyayaList = [];



ALL_SCHOOLS.forEach(
school=>{


let value =

String(
school.nyayaPanchayat || ""
)
.trim();



if(
value &&
!nyayaList.includes(value)
){

nyayaList.push(value);

}



}

);



nyayaList.sort();




select.innerHTML =

`
<option value="">
All Nyaya Panchayat
</option>
`;




nyayaList.forEach(
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


const tbody =
document.getElementById(
"schoolTableBody"
);



tbody.innerHTML = "";



if(
!data ||
data.length===0
){


tbody.innerHTML =

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


tbody.innerHTML +=

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



});


}









function filterSchools(){



const search =

String(

document.getElementById(
"searchBox"
).value || ""

)

.toLowerCase()

.trim();






const nyaya =

String(

document.getElementById(
"nyayaFilter"
).value || ""

)

.toLowerCase()

.trim();







const filtered =

ALL_SCHOOLS.filter(

school=>{


const udise =

String(
school.udise || ""
)

.toLowerCase();




const name =

String(
school.schoolName || ""
)

.toLowerCase();





const panchayat =

String(
school.nyayaPanchayat || ""
)

.toLowerCase()

.trim();





const searchMatch =


(

udise.includes(search)

||

name.includes(search)

||

panchayat.includes(search)

);






const nyayaMatch =


(

nyaya===""

||

panchayat===nyaya

);





return

searchMatch

&&

nyayaMatch;



}

);





renderSchools(
filtered
);



}








window.loadSchools =
loadSchools;
