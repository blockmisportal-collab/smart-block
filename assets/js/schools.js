/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT FINAL CONTROLLER
=====================================================*/

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbwKTmGemqiI-Lyd-YQCIVaxkCLZfYUyENpSuKL_B7z7ZMLAmv_xtL7LbciUVI2YI9JIfw/exec";



let ALL_SCHOOLS=[];



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
"keyup",
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



tbody.innerHTML=
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



const txt =
await res.text();



console.log(
"API DATA",
txt
);



const json =
JSON.parse(txt);



if(!json.success){

throw new Error(
json.message
);

}



ALL_SCHOOLS =
json.data || [];



document.getElementById(
"totalSchools"
).innerHTML =
ALL_SCHOOLS.length;



fillNyaya();



renderSchools(
ALL_SCHOOLS
);



}

catch(e){


console.error(e);


tbody.innerHTML=
`
<tr>
<td colspan="5">
Server Connection Failed
</td>
</tr>
`;

}



}









function fillNyaya(){


const select =
document.getElementById(
"nyayaFilter"
);



if(!select)
return;



let list=[];



ALL_SCHOOLS.forEach(
s=>{


let n =
String(
s.nyayaPanchayat || ""
)
.trim();



if(
n &&
!list.includes(n)
){

list.push(n);

}



}

);



list.sort();



select.innerHTML=
`
<option value="">
All Nyaya Panchayat
</option>
`;



list.forEach(
n=>{


select.innerHTML +=

`
<option value="${n}">
${n}
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
${s.udise || "-"}
</td>


<td>
${s.schoolName || "-"}
</td>


<td>
${s.nyayaPanchayat || "-"}
</td>


<td>
${s.schoolType || "-"}
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



let search =
String(
document.getElementById("searchBox").value
||""
)
.toLowerCase()
.trim();




let nyaya =
String(
document.getElementById("nyayaFilter").value
||""
)
.toLowerCase()
.trim();





let result =
ALL_SCHOOLS.filter(
s=>{


let udise =
String(
s.udise || ""
)
.toLowerCase();



let name =
String(
s.schoolName || ""
)
.toLowerCase();



let np =
String(
s.nyayaPanchayat || ""
)
.toLowerCase()
.trim();






let searchOK =

(
udise.indexOf(search)>=0
||
name.indexOf(search)>=0
||
np.indexOf(search)>=0
);





let filterOK =

(
nyaya===""
||
np===nyaya
);



return
searchOK &&
filterOK;



}

);



renderSchools(
result
);



}






window.loadSchools =
loadSchools;
