// Starting array for food types
var foodTypes = ["pancakes", "ramen", "coffee", "macaroni & cheese", "fries", "tacos"];

// Create a button in the event that the add button is clicked
$("#add-food").on("click", function (event) {
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

// Render initial buttons
renderButtons();

// Add click event listeners to all elements with "food" class
$(document).on("click", ".food", displayFood);

// Function for displaying the appropriate content from the API
function displayFood() {

    var food = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g7ONmrwJtLc6c5yM5V5BfNNtvBz3dWWU&q=" + food + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        // Generate initial still images & rating
        for (var i = 0; i < 10; i++) {

            var stillSource = results[i].images.fixed_height_still.url;
            var animatedSource = results[i].images.fixed_height.url;
            var foodImage = $("<img>");
            foodImage.attr("src", stillSource).addClass("gif").attr("data-still", stillSource).attr("data-animate", animatedSource).attr("data-state", "still");

            var rating = results[i].rating;
            var p = $("<p>")
            p.text("Rating: " + rating.toUpperCase());

            $("#food-view").prepend(foodImage, p);
        };

        // Ability to pause/animate gif on click
        $(".gif").on("click", function () {

            var still = $(this).attr("data-still");
            var animate = $(this).attr("data-animate");
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", animate).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", still).attr("data-state", "still");
            }
        });
    });
};