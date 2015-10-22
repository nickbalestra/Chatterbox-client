// Backbone chat client app

var Message = Backbone.Model.extend({
  url : 'https://api.parse.com/1/classes/chatterbox/',
  defaults: {
    username: '',
    text: ''
  }
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url : 'https://api.parse.com/1/classes/chatterbox/',

  load: function(){
    this.fetch({data: {order: '-createdAt'}});
  },

  parse: function(response, options) {
    var reversed = response.results.reverse();
    return reversed;
  }
});

var FormView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('sync', this.stopSpinner, this);
  },

  events: {
    'submit #send': 'submitMessage'
  },

  submitMessage: function(e){
    e.preventDefault();
    this.startSpinner();

    var $text = this.$('#message');

    this.collection.create({
      username: window.location.search.substr(10),
      text: $text.val(),
      roomname: this.collection.activeRoom
    });
    

    $text.val('');
  },

  stopSpinner: function(){
    this.$('.spinner img').fadeOut();
    this.$('form input[type=submit]').attr('disabled', null);
  },

  startSpinner: function(){
    this.$('.spinner img').show();
    this.$('form input[type=submit]').attr('disabled', 'true');
  }
});


var RoomsSelectorView = Backbone.View.extend({
  events: {
    'change #roomSelect': 'check'
  },

  check: function(e){
    this.collection.trigger('changeRoom', e.target.value);
  },

  initialize: function(){
    this.collection.on('sync', this.render, this);
    this.onscreenRooms = {};
  },

  render: function(){
    this.collection.each(function(room){
      this.renderRoom(room);
    }, this);
  },

  renderRoom: function(room){
    if (room.get('roomname') && !this.onscreenRooms[room.get('roomname')]) {
      var roomName = room.get('roomname');
      this.$('#roomSelect').append($('<option>', { value : roomName }).text(roomName));
      this.onscreenRooms[roomName] = true;
    }
  }
});



var MessageView = Backbone.View.extend({

  template: _.template('<div class="chat" data-id="<%- objectId %>"> \
                        <div class="user"><%- username %></div> \
                        <div class="text"><%- text %><div> \
                        <div>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));  // {data: this.model.attributes}
    return this.$el;
  }
});



var MessagesView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('sync', this.render, this);
    this.collection.on('changeRoom', this.renderRoom, this);
    this.onscreenMessages = {};
  },

  renderRoom: function(name){
    this.empty();
    this.onscreenMessages = {};
    this.collection.activeRoom = name;
    this.render();
  },

  empty: function(){
    this.$el.empty();
  },

  render: function(){
    _.each(this.collection.where({roomname: this.collection.activeRoom || 'lobby'}), function(message){
      this.renderMessage(message);
    }, this);
  },

  renderMessage: function(message){
    if (!this.onscreenMessages[message.get('objectId')]) {
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.onscreenMessages[message.get('objectId')] = true;
    }
  }
});

