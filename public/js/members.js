$(document).ready(() => {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });




  $(document).on('show.bs.modal','#exampleModalCenter', function (event) {
    console.log('hi');
    console.log(event);
    console.log(event.relatedTarget);
    let placename = $(event.relatedTarget).data('placename'); 
    console.log(placename);
        // $(this).find('.modal-body input').val(placename)
        $(this).find('exampleModalLongTitle').val(placename)
        
  })

  $("form.searchAttractions").on("submit", event => {
    event.preventDefault();
    const search = $("input#searchbar").val().trim();

    console.log(search);
    $.ajax({
      method: "GET",
      url: "/api/search/" + search
    }).then(data => {
      console.log(data)

      //triggered when modal is about to be shown
      // $('#exampleModalCenter').on('show.bs.modal', function (event) {
      //   console.log("howdy");
      //   let bookId = $(event.relatedTarget).data('bookid'); 
      //   $(this).find('.modal-body input').val(bookId)
      // });

      for (var i = 0; i < data.length; i++) {

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
           <button type="button" class="btn btn-primary add-to-list" data-toggle="modal" data-book-id="my_id_value" data-target="#exampleModalCenter" data-placename="${data[i].name}">
           Add to List</button>
       </div>

       <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">You are adding ${data[i].name} to your list.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   `
   
        )
      }


    });


  });
});


