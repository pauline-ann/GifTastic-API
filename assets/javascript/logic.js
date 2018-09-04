// Starting array for food types
var foodTypes = ["pancakes", "ramen", "coffee", "mac & cheese", "fries", "tacos"];

// Render initial buttons
renderButtons();

// Add click event listeners to all elements with "food" class
$(document).on("click", ".food", displayFood);

// In the event that the add button is clicked
$("#add-food").on("click", function(event){
    event.preventDefault();
    var food = $("#food-input").val().trim();
    foodTypes.push(food);
    renderButtons();
});

// Function for displaying movie data as buttons
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < foodTypes.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("food");
        newButton.attr("data-type", foodTypes[i]);
        newButton.text(foodTypes[i]);
        $("#buttons-view").append(newButton);
    }
}

// Function for displaying the appropriate content from the API
function displayFood() {

    var food = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g7ONmrwJtLc6c5yM5V5BfNNtvBz3dWWU&q=" + food + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {









    });
}

// To-do
// Make it so that there cannot be repeat buttons