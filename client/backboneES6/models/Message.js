class Message extends Backbone.Model {
  
  url() { 
    return 'https://api.parse.com/1/classes/chatterbox/'
  };
  
  defaults() {
    return {
      username: '',
      text: ''
    };
  }
}




