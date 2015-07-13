// YOUR CODE HERE:
var app = {};

app.username = window.location.search.substr(10) === "anonymous" ? "Funky Chicken" : decodeURIComponent(window.location.search.substr(10));
//server
app.server = "https://api.parse.com/1/classes/chatterbox";

app.init = function(){
  setInterval(app.fetch, 3000);
};
//function to send messages to server
app.send = function(message){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

//function to fetch from the server
app.fetch = function(){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
      app.displayFeed(data.results);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

//function to display single message
  //escape messages
app.displayMessage = function(message){
 $("#feed").append("<li class='message'>" + filterXSS(message.username) + ": " + filterXSS(message.text) + "</li>");

};
//function that utilizes single message function to display a list
app.displayFeed = function(list){
  list.forEach(app.displayMessage);
};

$(document).on('ready', function(){
  $('button').on('click', function(){

    var message = {
      username: app.username,
      text: filterXSS( $('input').val() )
    };

    // console.log($('input').val());
    app.send(message);


  });

  $('input').on('keyup', function(){
    if ($('input').val() !== '') {
      $('button').attr('disabled', false);
    }  else {
      $('button').attr('disabled', true);
    }
  })


});







//function to escape messages to/from server
// we are using XSS-js so just do  filterXSS()




/*
Message format

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
*/

/*
AJAX request

$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
*/