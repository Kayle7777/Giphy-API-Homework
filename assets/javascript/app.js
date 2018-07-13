let WebsiteObject = {
  buttons: ["Dog","Cat","Fish","Bunny"],
  giphyArray: [],
  renderButtons: function() {
    $("#buttons").empty();
    this.giphyArray = [];
// ==================================================================================================================
    // I should probably use a constructor here for giphyArray, because all this map does is build giphy array into a new array of objects
    this.buttons.map((element) => {
      $.get(`http://api.giphy.com/v1/gifs/search?q=${element}&api_key=hB3OC11Wjmrbng5YPx9vRogIa5OsMSxH&limit=15`)
      .then((response) => {
        let obj = {};
        obj.name = element;
        obj.images_animated = [];
        obj.images_still = [];
        response.data.map((x) => {
          obj.rating = x.rating;
          obj.images_animated.push(x.images.fixed_width.url);
          obj.images_still.push(x.images.fixed_width_still.url);
        })
        this.giphyArray.push(obj);
        })
      $("#buttons").append(`<button class="button btn btn-info" name='${element}'>${element}</button>`);
    })
  }
}

WebsiteObject.renderButtons();

$("#add-button").on("click", function(event) {
  event.preventDefault();
  var buttonInput = $("#button-input").val().trim();
  $("#button-input").val("");
  WebsiteObject.buttons.push(buttonInput);
  WebsiteObject.renderButtons();
});

$(document).on("click", ".button", function() {
  $("#giphyGifs").empty();
  WebsiteObject.giphyArray.map((arr) => {
    if (arr.name == this.name) {
      arr.images_still.map((link, index) => {
        let container = $("<div class='gifContainer col-md-3 btn-group'>"), rating = $("<p class='text-center col-md-12'>"), gif = $("<img>"), giphyButton = $("<button>"), favButton = $("<button>"), row=$("<div class='row'>");
        rating.text(`Rating: ${arr.rating}`);
        favButton.text("\u2729")
        giphyButton.attr("type", "button");
        giphyButton.attr("class", "gif btn btn-primary col-md-10");
        favButton.attr("type", "button");
        favButton.attr("class", "favButton btn btn-primary col-md-2");
        gif.attr("src", link);
        gif.attr("data-state", "still");
// ==================================================================================================================
        // This attaches the function that changes each giphyButton to its animated / still version
        giphyButton.click(function() {
          let imgInfo = $(this).children()[0];
          if (imgInfo.dataset.state == "still") {
            imgInfo.dataset.state = "animate";
            imgInfo.src = arr.images_animated[index];
          } else {
            imgInfo.dataset.state = "still";
            imgInfo.src = arr.images_still[index];
          }
        })
// ==================================================================================================================
        // This is for the star / favorites button
        favButton.click(function() {
          let faves = $("#faves");
          let test = $(this).parent()[0];
          let star = $(this).parent().children()[2];
          let paragraph = $(this).parent().children()[0];
          let fixer = $("<div class='gifContainer col-md-3'>");
          fixer.append(test);
          star.remove();
          paragraph.innerHTML = '';
          faves.append(fixer);
        })
// ==================================================================================================================
        giphyButton.append(gif);
        row.append(rating);
        row.append(giphyButton);
        row.append(favButton);
        container.append(row);
        $("#giphyGifs").append(container);
      })
    }
  })
})
