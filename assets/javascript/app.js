let WebsiteObject = {
  buttons: ["Dog","Cat","Fish","Bunny"],
  giphyArray: [],
  renderButtons: function() {
    $("#buttons").empty();
    this.giphyArray = [];
// ==================================================================================================================
    // I should probably use a constructor here for giphyArray, because all this map does is build giphy array into a new array of objects
    this.buttons.map((element) => {
      $.get(`http://api.giphy.com/v1/gifs/search?q=${element}&rating=g&api_key=hB3OC11Wjmrbng5YPx9vRogIa5OsMSxH&limit=15`)
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
  $("#giphyGifs").empty();
  WebsiteObject.giphyArray.map((arr) => {
    if (arr.name == this.name) {
      arr.images_still.map((link, index) => {
        let container = $("<div>"), rating = $("<p>"), gif = $("<img>"), giphyButton = $("<button>"), favButton = $("<button>");
        giphyButton.attr("class", ".gif");
        gif.attr("src", link);
        gif.attr("data-state", "still");
// ==================================================================================================================
        // This attaches the function that changes each giphyButton to its animated / still version
        function giphyAnimate() {
          let imgInfo = $(this).children()[0];
          if (imgInfo.dataset.state == "still") {
            imgInfo.dataset.state = "animate";
            imgInfo.src = arr.images_animated[index];
          } else {
            imgInfo.dataset.state = "still";
            imgInfo.src = arr.images_still[index];
          }
        }

        giphyButton.click(giphyAnimate)

        favButton.text("\u2729")
        favButton.click(function() {
          let faves = $("#faves");
          let test = $(this).parent()[0]
          let star = $(this).parent().children()[2]
          star.remove()
          faves.append(test)
        })
// ==================================================================================================================
        giphyButton.append(gif);
        rating.text(`rating: ${arr.rating}`);
        container.append(rating);
        container.append(giphyButton);
        container.append(favButton);
        $("#giphyGifs").append(container);
      })
    }
  })
})
