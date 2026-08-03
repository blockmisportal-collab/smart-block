/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT JS
 FINAL FIXED VERSION
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



const nyaya =
document.getElementById("nyayaFilter");


if(nyaya){

nyaya.addEventListener(
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

body:JSON.stringify({

action:"schools"

})

}

);



const text =
await response.text();


console.log(
"API RESPONSE",
text
);



const result =
JSON.parse(text);



if(
!result.success
){

throw new Error(
result.message
);

}



ALL_SCHOOLS =
(result.data || []).map(
row=>{


return {


udise:
String(
row.UDISECode ??
row.udise ??
""
),



schoolName:
String(
row.SchoolName ??
row.schoolName ??
""
),



nyayaPanchayat:
String(
row.NyayaPanchayat ??
row.nyayaPanchayat ??
""
),



schoolType:
String(
row.SchoolType ??
row.schoolType ??
""
),



status:
String(
row.Status ??
row.status ??
"ACTIVE"
)



};


}

);



console.log(
"FINAL DATA",
ALL_SCHOOLS
);



document.getElementById(
"totalSchools"
).innerText =
ALL_SCHOOLS.length;



createNyayaList();



renderSchools(
ALL_SCHOOLS
);



}

catch(err){


console.error(
"School Load Error",
err
);


tbody.innerHTML =
`
<tr>
<td colspan="5">
${err.message}
</td>
</tr>
`;

}


}








function createNyayaList(){


const select =
document.getElementById(
"nyayaFilter"
);



if(!select)
return;



let old =
select.value;



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


}

);



if(
list.includes(old)
){

select.value=old;

}



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

<td>${school.udise}</td>

<td>${school.schoolName}</td>

<td>${school.nyayaPanchayat}</td>

<td>${school.schoolType}</td>

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
)?.value ||
""
)
.toLowerCase()
.trim();




let nyaya =
document.getElementById(
"nyayaFilter"
)?.value ||
"";





let result =
ALL_SCHOOLS.filter(
school=>{


let data =

(
school.udise+
" "+
school.schoolName+
" "+
school.nyayaPanchayat+
" "+
school.schoolType
)

.toLowerCase();



return

data.includes(search)

&&

(
nyaya==="" ||
school.nyayaPanchayat===nyaya
);



}

);



renderSchools(
result
);


}





window.loadSchools =
loadSchools;
