var Messages = Backbone.Collection.extend({

  model: Message,
  url : 'https://api.parse.com/1/classes/chatterbox/',

  load: function(){
    this.fetch({data: {order: '-createdAt'}});
  },

  parse: function(response, options) {
    return response.results.reverse();
  }
});
