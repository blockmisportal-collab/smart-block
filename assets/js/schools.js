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

Array.isArray(result.data)

?

result.data

:

[];





console.log(
"FINAL SCHOOL ARRAY",
ALL_SCHOOLS
);





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




let list=[];




ALL_SCHOOLS.forEach(

school=>{


let value =

String(

school.NyayaPanchayat ||

school.nyayaPanchayat ||

""

);



if(

value !== "" &&

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





data.forEach(

school=>{


tbody.innerHTML +=

`
<tr>

<td>

${school.UDISECode || "-"}

</td>


<td>

${school.SchoolName || "-"}

</td>


<td>

${school.NyayaPanchayat || "-"}

</td>


<td>

${school.SchoolType || "-"}

</td>


<td>

<span class="status">

${school.Status || "ACTIVE"}

</span>

</td>


</tr>
`;



}

);



}









function filterSchools(){



const search =

document
.getElementById("searchBox")
.value
.toLowerCase()
.trim();





const nyaya =

document
.getElementById("nyayaFilter")
.value
.trim();






const filtered =


ALL_SCHOOLS.filter(

school=>{


const code =

String(
school.UDISECode || ""
)

.toLowerCase();




const name =

String(
school.SchoolName || ""
)

.toLowerCase();





const np =

String(
school.NyayaPanchayat || ""
);





return


(

search === "" ||

code.includes(search) ||

name.includes(search) ||

np.toLowerCase()
.includes(search)

)



&&



(

nyaya === "" ||

np === nyaya

);



}

);





renderSchools(
filtered
);



}






window.loadSchools =
loadSchools;
