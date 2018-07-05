//$.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// My API Key = hB3OC11Wjmrbng5YPx9vRogIa5OsMSxH




let buttons = ["Test1","Test2","Test3","Test4"];



$("#add-button").on("click", function(event) {
  event.preventDefault();
  var button = $("#button-input").val().trim();
  buttons.push(button);
  renderButtons();

});

function renderButtons() {
  $("#buttons").empty();
  buttons.map((x) => {
    $("#buttons").append(`<button class="button" name='${x}'>${x}</button>`);
  })
}
renderButtons();
