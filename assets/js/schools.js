/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT FINAL JS
 FIXED VERSION
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



const refresh =
document.querySelector(".refresh");


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
"School API Response",
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
(result.data || [])
.map(normalizeSchool);




document.getElementById(
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
"School Load Error",
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







function normalizeSchool(item){


return {


udise:

String(
item.udise ||
item.UDISECode ||
item.UDISE ||
""
),



schoolName:

item.schoolName ||
item.SchoolName ||
"",



nyayaPanchayat:

item.nyayaPanchayat ||
item.NyayaPanchayat ||
"",



schoolType:

item.schoolType ||
item.SchoolType ||
"",



status:

item.status ||
item.Status ||
"ACTIVE"


};



}









function createNyayaFilter(){



const select =
document.getElementById(
"nyayaFilter"
);



if(!select)
return;



let list =
[
...new Set(

ALL_SCHOOLS

.map(
x=>x.nyayaPanchayat
)

.filter(Boolean)

)

];



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


});


}









function renderSchools(data){



const table =
document.getElementById(
"schoolTableBody"
);



table.innerHTML="";



if(
!data ||
data.length===0
){


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
${school.udise}
</td>


<td>
${school.schoolName}
</td>


<td>
${school.nyayaPanchayat}
</td>


<td>
${school.schoolType}
</td>


<td>

<span class="status">

${school.status}

</span>

</td>


</tr>
`;



});



}









function filterSchools(){



let search =
(
document.getElementById(
"searchBox"
)?.value || ""
)
.toLowerCase()
.trim();




let nyaya =
document.getElementById(
"nyayaFilter"
)?.value || "";






let filtered =
ALL_SCHOOLS.filter(
school=>{


let text =

(
school.udise +
" " +
school.schoolName +
" " +
school.nyayaPanchayat +
" " +
school.schoolType
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



renderSchools(
filtered
);



}





window.loadSchools =
loadSchools;
