var FormView = Backbone.View.extend({

  events: {
    'submit #send': 'submitMessage'
  },

  initialize: function(){
    this.collection.on('sync', this.stopSpinner, this);
  },

  submitMessage: function(e){
    e.preventDefault();
    this.startSpinner();
    var $text = this.$('#message');

    this.collection.create({
      username: window.location.search.substr(10),
      text: $text.val(),
      roomname: this.collection.currentRoom
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
