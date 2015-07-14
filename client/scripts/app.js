// YOUR CODE HERE:
var app = {};

app.username = window.location.search.substr(10) === "anonymous" ? "Funky Chicken" : decodeURIComponent(window.location.search.substr(10));
//server
app.server = "https://api.parse.com/1/classes/";

app.rooms = [];

app.currentRoom = "";

app.loadedSuccessfully = false;3

app.init = function(){
  app.fetch(app.updateRooms);

  //app.fetch(app.displayFeed, 'where', {"roomname":"4chan"})
  //setInterval(app.fetch, 3000);
};

//function to send messages to server
app.send = function(message, callback){
  callback = callback || function(){};
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server + 'chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      callback(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

//function to fetch from the server
//Super powerful fetching function
app.fetch = function(callback, queryPrefix, query, endpoint){
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
  $('#rooms').append('<option> Please select a room </option>');
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
  app.displayClear();
  list.forEach(app.displayMessage);
};

//create new room
app.createRoom = function(){
  app.currentRoom = prompt("What would you like to call your new room?");
  var autoMessage = {
    username: 'NickNLuke',
    text: 'Welcome to this new room created by ' + app.username + '!',
    roomname: app.currentRoom
  };

  app.send(autoMessage, function(){app.fetch(app.updateRooms)});
};

$(document).on('ready', function(){

  app.init();

  $("#rooms").change(function(){
    app.currentRoom = $( "select option:selected" ).val();
    app.fetch(app.displayFeed, 'where', {roomname: app.currentRoom});
  });

  $("#createRoom").on('click', app.createRoom);

  $('#send').on('click', function(){

    var message = {
      username: app.username,
      text: filterXSS( $('input').val() ),
      roomname: app.currentRoom
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