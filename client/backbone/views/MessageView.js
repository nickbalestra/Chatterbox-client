var MessageView = Backbone.View.extend({

  template: _.template('<div class="chat" data-id="<%- objectId %>"> \
                        <div class="user"><%- username %></div> \
                        <div class="text"><%- text %><div> \
                        <div>'),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
