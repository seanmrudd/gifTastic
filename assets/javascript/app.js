// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    var gif = 'dog';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=mgRF3Dxyrnw1EnUNgCAuxD1i0DxsKnrs&q=' + gif + '&limit=10&offset=0lang=en';

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // Creating a div to hold the gif
        var gifDiv = $("<div class='gif'>");
        console.log(response.data);
        
        for (i = 0; i < 10; i++) {

            // Storing the gif url
            var gifURL = response.data[i].embed_url;
            console.log(gifURL);

            // Creating elements to have the url
            var gifIMG = $("<img>").attr('src', gifURL);

            // Displaying the rating, release year, and plot
            gifDiv.append(gifIMG);
        }



        //   // Retrieving the URL for the image
        //   var imgURL = response.Poster;

        //   // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);

        //   // Appending the image
        //   movieDiv.append(image);

        //   // Putting the entire movie above the previous movies
        $("#gif-view").prepend(gifDiv);

    })
} 
displayGifInfo();