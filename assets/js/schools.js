/*=====================================================
 SMART FORM ENTERPRISE v6.1
 SCHOOL MANAGEMENT JAVASCRIPT
 File : schools.js
 FINAL VERSION
=====================================================*/


"use strict";



const API_URL =

"https://script.google.com/macros/s/AKfycbwLMuH57q6Re4jjKoLzvbptYePUmd-QQQpPHgQCcfnqV37VtwRjxgGvhNWX3nmk3JRbdw/exec";




let SCHOOLS=[];








/*===============================
 LOAD SCHOOLS
================================*/


document.addEventListener(
"DOMContentLoaded",
function(){

loadSchools();

});







async function loadSchools(){



try{



const response =

await fetch(API_URL,{

method:"POST",


headers:{


"Content-Type":

"text/plain;charset=utf-8"


},


body:JSON.stringify({

action:"schools"

})


});






const result =

JSON.parse(

await response.text()

);






if(result.success){



SCHOOLS = result.data;



document.getElementById(
"totalSchools"
).innerHTML =

SCHOOLS.length;



createNyayaFilter();



displaySchools(SCHOOLS);



}

else{


alert(result.message);


}



}


catch(error){


console.log(error);


alert(
"Server Connection Failed"
);


}



}










/*===============================
 NYAYA FILTER
================================*/


function createNyayaFilter(){



let select =

document.getElementById(
"nyayaFilter"
);





let list=[];





SCHOOLS.forEach(function(item){



if(

item.NyayaPanchayat

&&

!list.includes(
item.NyayaPanchayat
)

){


list.push(
item.NyayaPanchayat
);


}



});





list.sort();





list.forEach(function(nyaya){



let option =

document.createElement(
"option"
);



option.value=nyaya;


option.textContent=nyaya;



select.appendChild(option);



});



}









/*===============================
 DISPLAY SCHOOL
================================*/


function displaySchools(data){



let html="";





if(data.length===0){



html=`

<tr>

<td colspan="6">

No School Found

</td>

</tr>

`;



}






data.forEach(function(school){



html +=`


<tr>



<td>

${school.UDISECode}

</td>




<td>

${school.SchoolName}

</td>




<td>

${school.NyayaPanchayat}

</td>




<td>

${school.SchoolType}

</td>




<td>


<span class="${
String(school.Status)
.toUpperCase()==="ACTIVE"
?
"active"
:
"inactive"
}">


${school.Status}


</span>



</td>





<td>


<button

class="btn refresh"

onclick="viewSchool('${school.UDISECode}')">


View


</button>


</td>



</tr>


`;



});





document.getElementById(

"schoolTableBody"

).innerHTML=html;



}









/*===============================
 FILTER
================================*/


function filterSchools(){



let search =

document.getElementById(
"searchSchool"
)
.value
.toLowerCase();





let nyaya =

document.getElementById(
"nyayaFilter"
)
.value;





let status =

document.getElementById(
"statusFilter"
)
.value;







let filtered =

SCHOOLS.filter(function(item){



return(




String(item.UDISECode)
.toLowerCase()
.includes(search)




||

String(item.SchoolName)
.toLowerCase()
.includes(search)




)

&&




(

nyaya===""

||

item.NyayaPanchayat===nyaya


)

&&




(

status===""

||


String(item.Status)
.toUpperCase()
===status



);



});







displaySchools(filtered);



}









/*===============================
 VIEW SCHOOL
================================*/


function viewSchool(code){


alert(

"School UDISE Code : "

+

code

);



}









/*===============================
 BACK
================================*/


function goBack(){


window.location.href=

"dashboard.html";


}
