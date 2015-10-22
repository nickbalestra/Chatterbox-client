var MessagesView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('sync', this.render, this);
    this.collection.on('changeRoom', this.renderRoom, this);
    this.collection.on('empty', this.empty, this);
    this.onscreenMessages = {};
  },

  empty: function(){
    this.$el.empty();
  },

  render: function(){
    _.each(this.collection.where({roomname: this.collection.currentRoom || 'lobby'}), function(message){
      this.renderMessage(message);
    }, this);
  },

  renderMessage: function(message){
    if (!this.onscreenMessages[message.get('objectId')]) {
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.onscreenMessages[message.get('objectId')] = true;
    }
  },

  renderRoom: function(name){
    this.empty();
    this.onscreenMessages = {};
    this.collection.currentRoom = name;
    this.render();
  }
});