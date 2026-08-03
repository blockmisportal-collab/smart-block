function filterSchools(){

const search =
String(
document.getElementById("searchBox").value || ""
)
.toLowerCase()
.trim();



const nyaya =
String(
document.getElementById("nyayaFilter").value || ""
)
.trim()
.toLowerCase();




const result =
ALL_SCHOOLS.filter(
school=>{


const udise =
String(
school.udise || ""
)
.toLowerCase();


const name =
String(
school.schoolName || ""
)
.toLowerCase();


const np =
String(
school.nyayaPanchayat || ""
)
.toLowerCase()
.trim();



let searchMatch =
(
udise.includes(search) ||
name.includes(search) ||
np.includes(search)
);



let nyayaMatch =
(
nyaya==="" ||
np===nyaya
);



return searchMatch && nyayaMatch;



}

);



renderSchools(result);


}
