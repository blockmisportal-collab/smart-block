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



const search =
document.getElementById("searchBox");


if(search){

search.oninput =
filterSchools;

}



const filter =
document.getElementById("nyayaFilter");


if(filter){

filter.onchange =
filterSchools;

}



const refresh =
document.getElementById("refreshBtn");


if(refresh){

refresh.onclick =
loadSchools;

}


});





async function loadSchools(){


const table =
document.getElementById(
"schoolTableBody"
);



if(!table){

alert(
"schoolTableBody Missing"
);

return;

}



table.innerHTML=
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
(result.data || []).map(
school=>({

udise:
String(school.udise || "").trim(),


schoolName:
String(school.schoolName || "").trim(),


nyayaPanchayat:
String(school.nyayaPanchayat || "").trim(),


schoolType:
String(school.schoolType || "").trim()


})
);




const total =
document.getElementById(
"totalSchools"
);


if(total){

total.innerHTML =
ALL_SCHOOLS.length;

}



createNyayaFilter();



renderSchools(
ALL_SCHOOLS
);



}

catch(error){


console.error(
"SCHOOL ERROR",
error
);



table.innerHTML=

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



if(!select){

return;

}




let list =
[

...new Set(

ALL_SCHOOLS

.map(
s=>s.nyayaPanchayat
)

.filter(
x=>x
)

)

];



list.sort();



select.innerHTML=

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



});



}









function renderSchools(data){



const table =
document.getElementById(
"schoolTableBody"
);



if(!table){

return;

}



table.innerHTML="";




if(data.length===0){


table.innerHTML=

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

<span class="status active">
ACTIVE
</span>

</td>


</tr>
`;



});


}









function filterSchools(){



const search =
(
document.getElementById(
"searchBox"
)?.value || ""
)
.toLowerCase()
.trim();




const nyaya =
(
document.getElementById(
"nyayaFilter"
)?.value || ""
)
.trim();





const result =
ALL_SCHOOLS.filter(
school=>{


const text =

(

school.udise+

school.schoolName+

school.nyayaPanchayat+

school.schoolType

)

.toLowerCase();



return

text.includes(search)

&&

(

nyaya===""

||

school.nyayaPanchayat.trim()
===
nyaya.trim()

);



}

);




renderSchools(
result
);



}



window.loadSchools =
loadSchools;
