// Messages

curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  https://api.parse.com/1/classes/chatterbox



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

  app.fetch(function(data){console.log(data)},'roomname')