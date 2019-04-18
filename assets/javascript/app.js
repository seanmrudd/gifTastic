// Initial array of gifs
var gifs = ["Cat", "Dog", "Panda", "Snake", "Tiger", "Rhino", "Eagle", "Buffalo", "Chicken", "Duck", "Cow", "Goat", "Frog", "Raccoon", "Rooster", "Elephant", "Zebra", "Sheep", "Turtle", "Vulture", "Butterfly", "Horse", "Dragon", "Unicorn", "Pegasus", "Dinosaur"];
console.log(gifs);

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=mgRF3Dxyrnw1EnUNgCAuxD1i0DxsKnrs&q=' + gif + '&limit=10&offset=0&lang=en';

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);



        for (i = 0; i < 10; i++) {
            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif-div'>");
            console.log(response.data);
            // Storing the gif URL
            var gifURL = response.data[i].images.fixed_height_still.url;
            console.log(gifURL);
            // Storing the gif still url
            var gifURLStill = response.data[i].images.fixed_height_still.url;
            console.log(gifURLStill);
            // Storing the gif animate url
            var gifURLAnimate = response.data[i].images.fixed_height.url;
            console.log(gifURLAnimate);
            // Storign the gif state url
            var gifURLState = "still";
            // Creating elements to have the url
            var gifIMG = $("<img>").attr('src', gifURL).attr('data-still', gifURLStill).attr('data-animate', gifURLAnimate).attr('data-state', gifURLState).attr('alt', 'gif image').attr('id', 'gif');
            console.log(gifIMG)

            // Storing the gif rating
            var gifRating = response.data[i].rating;
            // Creating elements to have the rating
            var pOne = $("<p>").text("Rating: " + gifRating).attr('id', 'rating');

            // Displaying the rating and gif
            gifDiv.append(pOne);
            gifDiv.append(gifIMG);

            // Putting the entire gif above the previous gifs
            $("#gifs-view").prepend(gifDiv);
        }
    })
}

// Function for displaying gif data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
        // Then dynamicaly generating buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var gifBtn = $("<button>");
        // Adding a class of gif-btn to our button
        gifBtn.addClass("gif-btn btn btn-info");
        // Adding a data-attribute
        gifBtn.attr("data-name", gifs[i]);
        // Providing the initial button text
        gifBtn.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(gifBtn);
    }
}

// This function handles events where a gif button is clicked
$("#addGif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gifInput").val().trim();
    // Adding gif from the textbox to our array
    gifs.push(gif);
    // Clears input after submit
    $("#gifInput").val('');
    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

//Ne this $(Document) because the images aren't set up yet.  They're dynamically added.
$(Document).on("click", '#gif', function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(this);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        console.log(this);
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();