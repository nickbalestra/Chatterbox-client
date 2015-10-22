class Messages extends Backbone.Collection {

  constructor(options) {
    super(options);
    this.model = Message;
    this.url = 'https://api.parse.com/1/classes/chatterbox/';
  }
  
  load() {
    return this.fetch({data: {order: '-createdAt'}});
  }

  parse(response, options) {
    var reversed = response.results.reverse();
    return reversed;
  }
}
