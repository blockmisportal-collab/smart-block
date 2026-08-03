/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT CONTROLLER
 FINAL VERSION
=====================================================*/


"use strict";



const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_SCHOOLS = [];





document.addEventListener(
"DOMContentLoaded",
function(){


loadSchools();



const searchBox =
document.getElementById("searchBox");



if(searchBox){

searchBox.addEventListener(
"input",
filterSchools
);

}



const nyayaFilter =
document.getElementById("nyayaFilter");



if(nyayaFilter){

nyayaFilter.addEventListener(
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

catch(error){


console.error(
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




let list = [];





ALL_SCHOOLS.forEach(

school=>{


let value =

String(

school.nyayaPanchayat ||

school.NyayaPanchayat ||

""

)
.trim();





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



const udise =

school.udise ||

school.UDISECode ||

"-";



const name =

school.schoolName ||

school.SchoolName ||

"-";



const nyaya =

school.nyayaPanchayat ||

school.NyayaPanchayat ||

"-";



const type =

school.schoolType ||

school.SchoolType ||

"-";



const status =

school.status ||

school.Status ||

"ACTIVE";





tbody.innerHTML +=


`

<tr>


<td>
${udise}
</td>


<td>
${name}
</td>


<td>
${nyaya}
</td>


<td>
${type}
</td>


<td>

<span class="status">

${status}

</span>

</td>


</tr>


`;



}



);



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

school.udise ||

school.UDISECode ||

""

)

.toLowerCase();





const name =


String(

school.schoolName ||

school.SchoolName ||

""

)

.toLowerCase();





const np =


String(

school.nyayaPanchayat ||

school.NyayaPanchayat ||

""

)

.toLowerCase()

.trim();







const searchMatch =


(

udise.includes(search)

||

name.includes(search)

||

np.includes(search)

);






const nyayaMatch =


(

nyaya===""

||

np===nyaya

);



return

searchMatch && nyayaMatch;



}



);






renderSchools(
filtered
);



}







window.loadSchools =
loadSchools;
