WebsiteObject = {
  buttons: ["Dog","Cat","Fish","Bunny"],
  giphyArray: [],
  renderButtons: function() {
    $("#buttons").empty();
    this.giphyArray = [];
    this.buttons.map((element, index) => {
      $.get(`http://api.giphy.com/v1/gifs/search?q=${element}&rating=g&api_key=hB3OC11Wjmrbng5YPx9vRogIa5OsMSxH&limit=15`)
      .then((response) => {
        let obj = {}
        obj.name = element;
        obj.images = [];
        response.data.map((x, i) => {
          obj.rating = x.rating;
          obj.images.push(x.images.fixed_width.url);
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
      arr.images.map((link) => {
        let container = $("<div>"), rating = $("<p>"), gif = $("<img>");
        gif.attr("class", ".gif");
        gif.attr("src", link);
        gif.attr("data-state", still);
        rating.text(`rating: ${arr.rating}`);
        container.append(rating);
        container.append(gif);
        $("#giphyGifs").append(container);
      })
    }
  })
})

$(".gif").on("click"), () => {
  let state = $(this).attr("data-state");
  let url = $(this).attr("src");
  console.log(url)
  if (state == "still") {
    
  }
}
