class MessageView extends Backbone.View {

  initialize() {
    this.template =  _.template('<div class="chat" data-id="<%- objectId %>"> \
                        <div class="user"><%- username %></div> \
                        <div class="text"><%- text %><div> \
                        <div>');
  }
  
  render() {
    return this.$el.html(this.template(this.model.attributes))
  }
}
