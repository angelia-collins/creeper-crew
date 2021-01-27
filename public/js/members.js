$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $("form.searchAttractions").on("submit", event => {
    event.preventDefault();
    const search = $("input#searchbar").val().trim();
    // let userSearched = search.val().trim();
    console.log(search);
  });
});
