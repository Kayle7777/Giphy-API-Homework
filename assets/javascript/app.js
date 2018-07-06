

WebsiteObject = {
  buttons: ["Dog","Cat","Fish","Bunny"],
  giphyArray: [],
  renderButtons: function() {
    $("#buttons").empty();
    this.giphyArray = [];
    this.buttons.map((element, index) => {
      $.get(`http://api.giphy.com/v1/gifs/random?tag=${element}&rating=g&api_key=hB3OC11Wjmrbng5YPx9vRogIa5OsMSxH&limit=1`)
      .then((response) => {
        this.giphyArray[index] = response;
      })
      $("#buttons").append(`<button class="button" name='${element}'>${element}</button>`);
    })
  }
}

$("#add-button").on("click", function(event) {
  event.preventDefault();
  var button = $("#button-input").val().trim();
  WebsiteObject.buttons.push(button);
  WebsiteObject.renderButtons();
});

WebsiteObject.renderButtons();

$(document).on("click", ".button", function() {
  // console.log(WebsiteObject.buttons[this.name]);
  console.log(WebsiteObject.giphyArray[WebsiteObject.buttons.indexOf(this.name)])
})
