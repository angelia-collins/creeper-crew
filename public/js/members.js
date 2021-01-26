$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  loginForm.on("submit", event => {
    event.preventDefault();
    const search = $(".searchAttractions");
    let userSearched = search.val().trim();
    console.log(userSearched);
  });
});
