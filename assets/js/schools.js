/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT FINAL JS
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


const filter =
document.getElementById("nyayaFilter");



if(search){

search.addEventListener(
"input",
filterSchools
);

}



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


const response =
await fetch(
API_URL,
{

method:"POST",

headers:
{
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
"SCHOOL ERROR",
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



let values =
[
...new Set(

ALL_SCHOOLS.map(
s=>
String(
s.nyayaPanchayat || ""
)
.trim()

)

)

]
.filter(x=>x!=="")
.sort();




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
).value
||""
)
.toLowerCase()
.trim();




const nyaya =
document.getElementById(
"nyayaFilter"
).value;




const filtered =

ALL_SCHOOLS.filter(
school=>{


const text =

(
String(school.udise || "")+
String(school.schoolName || "")+
String(school.nyayaPanchayat || "")
)

.toLowerCase();



return

text.includes(search)

&&

(
nyaya===""
||
school.nyayaPanchayat===nyaya
);



}

);



renderSchools(
filtered
);



}







window.loadSchools =
loadSchools;
