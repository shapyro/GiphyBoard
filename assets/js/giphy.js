//  still need to make gifs load still and animate when clicked

var topicCount = 0;
var topicArray = [];

$(document).ready(function(){

  $("#new-topic").click(function(){
    $("#new-topic").val('');
  })

  $('#add-giphy').click(function(){
    //    event.preventDefault();
    console.log('clicked');
    //  create new topic buttons

    var topic = $("#new-topic").val().trim();
    topicArray.unshift(topic);

    var newTopic = $('<button>');
    $(newTopic).addClass('newTopic');
    $(newTopic).attr('id', 'topic-' + topicCount);
    $(newTopic).append(topic);
    $('header').prepend(newTopic);
    $("#new-topic").val('');
    topicCount++;

    //  GET gifs
    $('.newTopic').click(function(){
      $('article').empty();

      topic = $(this).text();;
      console.log(topic);

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        topic + "&api_key=QNJQeV3XkMeye6RaqcFVDQzEGqEbB0k3&limit=10";
  
      $.get(queryURL).done(function(response){
        console.log(response);
        response.data.map(result=>$('article').append( `<div class="item"> <img src="${result.images.fixed_height.url}"/> <p>Rating: ${result.rating}</p> </div>` ));
      });

    });

  });

});