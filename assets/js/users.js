"use strict";


document.addEventListener(
"DOMContentLoaded",
function(){

loadUsers();

});



function loadUsers(){


const tbody =
document.getElementById(
"userTableBody"
);



if(!tbody){

alert(
"userTableBody ID Missing"
);

return;

}



tbody.innerHTML =
`
<tr>
<td colspan="7">
Loading...
</td>
</tr>
`;


console.log(
"Table Found Successfully"
);


}



function goBack(){

window.location.href =
"dashboard.html";

}
