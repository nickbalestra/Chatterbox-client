var Message = Backbone.Model.extend({

  url : 'https://api.parse.com/1/classes/chatterbox/',

  defaults: {
    username: '',
    text: ''
  }
  
});
