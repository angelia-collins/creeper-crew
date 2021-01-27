$(document).ready(() => {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $("form.searchAttractions").on("submit", event => {
    event.preventDefault();
    const search = $("input#searchbar").val().trim();
    
console.log(search);
 $.ajax({
   method: "GET",
   url: "/api/search/" + search
 }).then(data => {
   console.log(data)

   for ( var i = 0; i < data.length; i++){
   
$(".places").append(
   `
   <div class="card text-center" style="width: 18rem;">
       <img class="card-img-top"
           src="${data[i].image}"
           alt="Card image cap">
       <div class="card-body">
           <h5 class="card-title">${data[i].location}</h5>
           <h6>${data[i].name}</h6>
           <p class="card-text">${data[i].description}</p>
           <a href="#" class="btn btn-primary">Add to List</a>
           <a href="#" class="btn btn-primary bg-danger border-danger">Not Interested</a>
       </div>
   `
   )
   }
 })

  });
});


