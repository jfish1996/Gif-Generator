console.log("working");
//create something that will generate our buttons
//create an array of inital topics 

var topics = ["Dwight Schrute","Michael Scott","Ron Burgendy","Jon Snow","Leslie knope"];

function renderButtons(){
    //clear out view for my buttons
    $("#buttons-view").empty();
//iterating through my topics array
    for(i=0; i < topics.length; i++){
//for each element in the array make a button
        var b = $("<button>");
//assign a class to the button called gif
        b.addClass("gif");
//give a data- attribute called data-name to b and assign that vale the string of whatever iteration youre on within the array
        b.attr("data-name", topics[i])
//asign the visable text of the button to whatever iteration youre on within the array
        b.text(topics[i]);
//append the newly made buttons to my button view area within the DOM
        $("#buttons-view").append(b);
    }

}


//this will add values to my given array
$("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var gif = $("#gif-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(gif);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

//caling my first buttons to render on the page through the renderbutton function
renderButtons();

//on click of the newly generated gif button class
//thats why we would use doc.on click instead of the element.on click 
$(document).on("click", ".gif", function() {
  //empty my div so that 10000000 gifs dont stack up
    $("#gifs-go-here").empty();
    //assigning a variable person to data person that will be used within our link
    var person = $(this).attr("data-name");
    //assigning our giphy URL to an earier to grab var
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
//then the AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        //using dot notation we can access the inital data array that contatain all of the gif objects/info we need
        var results = response.data;
        console.log(response.data);
        //now were iterating through those results 
        for (var i = 0; i < results.length; i++) {
          //for each one assiging them a new div
          var gifDiv = $("<div>");
          //grabbing the raiting of each object 
          var rating = results[i].rating;
          //assigning that raiting to a new p text value
          var p = $("<p>").text("Rating: " + rating);
        //creating a new img var assigned to personImage
          var personImage = $("<img>");
          //giving that image an original src value of the giphy link through dot notation 
          personImage.attr("src", results[i].images.fixed_height.url);
          //giving that image an other value of the giphy stil image link through dot notation 
          personImage.attr("other", results[i].images.fixed_height_still.url)
          //giving that image a class of dyanmic image to be used later to stop or start a gif 
          personImage.attr("class", "dynamicImage")
          //then perepend that all to our newly made divs
          gifDiv.prepend(p);
          gifDiv.prepend(personImage);
          //then prepend that all to the DOM
          $("#gifs-go-here").prepend(gifDiv);
        }
      });
  });
//handleing the stop start click 
  $(document).on("click", ".dynamicImage", function() {
    //this var is to grab the animated src value
      var srcCheck = $(this).attr("src");
      //this var is to grab the still other value
      var otherCheck = $(this).attr("other"); 
//this flips the value of src to the value of other
    $(this).attr("src", otherCheck);
//this flips the value of other to src
    $(this).attr("other", srcCheck); 

  });

