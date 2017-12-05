//  Fill out the form to add a giphy button
//  Click a giphy button to display gifs
//  Gifs will load static
//  Click Gifs to animate/stop


var topicCount = 0;
var topicArray = [];

$(document).ready(function(){

  $("#new-topic").click(function(){
    $("#new-topic").val('');
  });

  $('#new-topic').keypress(function(event){
    if(event.keyCode == 13){
      $('#add-giphy').click();
    }
  });

  //  Add Giphy Button to Header
  $('#add-giphy').click(function(){    
    //  get giphy topic for giphy button
    var topic = $("#new-topic").val().trim();
    topicArray.unshift(topic);

    //  make the giphy button
    var newTopic = $('<button>');
    $(newTopic).addClass('newTopic');
    $(newTopic).attr('id', 'topic-' + topicCount);
    $(newTopic).append(topic);
    $('header').prepend(newTopic);
    $("#new-topic").val('');
    topicCount++;

    //  GET gifs by clicking topic button
    $('.newTopic').unbind().click(function(){
    //  $('.newTopic').click(function(){
      $('article').empty();

      topic = $(this).text();;

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        topic + "&api_key=QNJQeV3XkMeye6RaqcFVDQzEGqEbB0k3&limit=10";
      
      //  Giphy API Request
      $.get(queryURL).done(function(response){
        console.log(response);

        //  put the gifs in the img elements and append the imgs to the article
        response.data.map(result=>
          $('article').append( 
          `<div class="item"> 
            <img src="${result.images.fixed_height_still.url}" data-still="${result.images.fixed_height_still.url}" data-animate="${result.images.fixed_height.url}"id="image" data-state="still"/> 
            <p>Rating: ${result.rating}</p> 
          </div>` 
        ));
        
        //  Animate Giphy by Clicking Div item
        //  click again to stop
        $('img').unbind().click(function(){
          console.log('clicked');

          //  variable to store the state attribute
          var state = $(this).attr("data-state");

          if (state === "still"){
            // get text from img src url string and remove '_s.gif' and add '.gif' OR another way
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }

        });
      
      });

    });

  });

  $('#randomGif').animate({padding: "150px 0 0 0"}, 1000);
  $('#randomGif').animate({padding: " 0 0 0 150px"}, 1000);
  //  click for a random gif
  $('#randomGif').unbind().click(function(){
    $('#randomGif').empty();
    $('#randomGif').css('background', 'transparent');
    $('#randomGif').css({padding: "0"});
    var randomURL = "https://api.giphy.com/v1/gifs/random?api_key=QNJQeV3XkMeye6RaqcFVDQzEGqEbB0k3";
    $.get(randomURL).done(function(response){
      console.log(response);
      $('#randomGif').append( `<img src="${response.data.fixed_width_downsampled_url}"/>` );
    });
  });

});