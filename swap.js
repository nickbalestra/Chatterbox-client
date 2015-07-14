// Socializing feature
// TODO: setInterval to keep fetching
// allow users to friends eachother and display friend messages in bold
// Backbone intro!
//
// TODO comment and cleanup code
//
//
// Styiling
//
// may have to deal with only fetcvhing new messages
// limit messages per feed
//


// idea on startup if currentRoom has  a default value we can kickstart the chat with that room already filled

//click create room
//have alert pop up
//set currentRoom to room passed in
//Automate message with current room created by username


// Messages

curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  https://api.parse.com/1/classes/chatterbox/rooms



// Messages per scpefic room

curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  -G \
  --data-urlencode 'where={"roomname":"4chan"}' \
  https://api.parse.com/1/classes/chatterbox



// Rooms

curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  https://api.parse.com/1/classes/rooms


// Users

curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  https://api.parse.com/1/classes/users


  app.fetch(function(data){console.log(data)},'chatterbox', {"roomname":"4chan"})

  app.fetch(function(data){console.log(data)},'chatterbox', 'where', {"roomname":"4chan"})


  app.fetch(app.displayFeed,'chatterbox', 'where', {"roomname":"4chan"})

  app.fetch(function(data){console.log(data)},'rooms')

  app.fetch(app.updateRooms)