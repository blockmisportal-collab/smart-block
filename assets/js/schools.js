/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT JS
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
document.getElementById("searchBox");


if(search){

search.addEventListener(
"keyup",
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



const refresh =
document.querySelector(".refresh");


if(refresh){

refresh.addEventListener(
"click",
loadSchools
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
"SCHOOL API DATA",
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
(result.data || []).map(function(item){


return {

udise:
String(
item.UDISECode ||
item.udise ||
""
),


schoolName:
item.SchoolName ||
item.schoolName ||
"",


nyayaPanchayat:
item.NyayaPanchayat ||
item.nyayaPanchayat ||
"",


schoolType:
item.SchoolType ||
item.schoolType ||
"",


status:
item.Status ||
item.status ||
"ACTIVE"


};



});





document.getElementById(
"totalSchools"
).innerHTML =
ALL_SCHOOLS.length;



fillNyayaFilter();



renderSchools(
ALL_SCHOOLS
);



}

catch(error){


console.error(
"LOAD ERROR",
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








function fillNyayaFilter(){


const select =
document.getElementById(
"nyayaFilter"
);



if(!select)
return;



let current =
select.value;



let list =
[];




ALL_SCHOOLS.forEach(function(item){


if(
item.nyayaPanchayat &&
!list.includes(item.nyayaPanchayat)
){

list.push(
item.nyayaPanchayat
);

}


});



list.sort();



select.innerHTML =
`
<option value="">
All Nyaya Panchayat
</option>
`;



list.forEach(function(item){


select.innerHTML +=
`
<option value="${item}">
${item}
</option>
`;



});



if(
current &&
list.includes(current)
){

select.value=current;

}


}








function renderSchools(data){


const tbody =
document.getElementById(
"schoolTableBody"
);



tbody.innerHTML="";



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





data.forEach(function(item){



tbody.innerHTML +=
`

<tr>

<td>
${item.udise}
</td>


<td>
${item.schoolName}
</td>


<td>
${item.nyayaPanchayat}
</td>


<td>
${item.schoolType}
</td>


<td>
<span class="status">
${item.status}
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
).value || ""
)
.toLowerCase()
.trim();




let nyaya =
document.getElementById(
"nyayaFilter"
).value;





let filtered =
ALL_SCHOOLS.filter(function(item){



let text =

(
item.udise+
" "+
item.schoolName+
" "+
item.nyayaPanchayat+
" "+
item.schoolType
)

.toLowerCase();





return

text.includes(search)

&&

(
nyaya==="" ||
item.nyayaPanchayat===nyaya
);



});



renderSchools(
filtered
);



}




window.loadSchools =
loadSchools;
