// YOUR CODE HERE:
var app = {};

app.username = window.location.search.substr(10) === "anonymous" ? "Funky Chicken" : decodeURIComponent(window.location.search.substr(10));
//server
app.server = "https://api.parse.com/1/classes/";

app.rooms = [];

app.currentRoom = "";

app.loadedSuccessfully = false;

app.init = function(){
  //app.fetch();
  //setInterval(app.fetch, 3000);
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
//Super powerful fetching function
app.fetch = function(callback, endpoint, queryPrefix, query){
  if( query ){
    query = queryPrefix + '=' + JSON.stringify(query);
  }
  else{
    query = '';
  }
  endpoint = endpoint || 'chatterbox';
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server + endpoint,
    type: 'GET',
    data: query,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
      callback(data.results);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.updateRooms = function(listOfMessages){
  app.rooms = _.chain(listOfMessages)
    .pluck('roomname')
    .without('', undefined)
    .union(app.rooms) //Takes multiple arrays and returns 1 array with no repeats
    .value();

  app.currentRoom = app.rooms[0];

  $('#rooms').html('');
  $.each( app.rooms, function(i){
    $('#rooms').append('<option value="'+ app.rooms[i] +'">' + app.rooms[i] + '</option>')
  });

}


app.displayClear = function(){
  $("#feed").html('');
}

//function to display single message
  //escape messages
app.displayMessage = function(message){
 $("#feed").append("<li class='message'>" + filterXSS(message.username) + ": " + filterXSS(message.text) + "</li>");

};
//function that utilizes single message function to display a list
app.displayFeed = function(list){
  // should accept a second argument that is the roomname
  // and filter the list accordsingly before sending it to display
  // list = _.filter(list, function(element){
  //   return element.roomname === app.currentRoom; // currentRoom is an empty string at this point
  // });
  list.forEach(app.displayMessage);
};

//set current room function, will be used in document.ready and displayFeed
app.setCurrentRoom = function(){

};

$(document).on('ready', function(){

  app.init();

  $("#rooms").change(function(){
    app.currentRoom = $( "select option:selected" ).val();
  });

  $('button').on('click', function(){

    var message = {
      username: app.username,
      text: filterXSS( $('input').val() ) // add parameter for room
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


// $("#rooms option[value='4chan']").attr("selected", true);





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