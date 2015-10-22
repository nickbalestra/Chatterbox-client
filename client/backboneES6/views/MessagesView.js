class MessagesView extends Backbone.View {

  initialize() {
    this.collection.on('sync', this.render, this);
    this.collection.on('changeRoom', this.renderRoom, this);
    this.collection.on('empty', this.empty, this);
    this.onscreenMessages = {};
  }

  renderRoom(name) {
    this.empty();
    this.onscreenMessages = {};
    this.collection.currentRoom = name;
    this.render();
  }

  empty() {
    this.$el.empty();
  }

  render() {
    _.each(this.collection.where({roomname: this.collection.currentRoom || 'lobby'}), function(message){
      this.renderMessage(message);
    }, this);
  }

  renderMessage(message) {
    if (!this.onscreenMessages[message.get('objectId')]) {
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.onscreenMessages[message.get('objectId')] = true;
    }
  }
}