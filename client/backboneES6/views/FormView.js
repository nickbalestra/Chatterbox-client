class FormView extends Backbone.View {

  events() {
    return {
      'submit #send': 'submitMessage'
    }
  }

  initialize() {
    return this.collection.on('sync', this.stopSpinner, this);
  }

  submitMessage(e) {
    e.preventDefault();
    this.startSpinner();
    var $text = this.$('#message');

    this.collection.create({
      username: window.location.search.substr(10),
      text: $text.val(),
      roomname: this.collection.currentRoom
    });
    
    $text.val('');
  }

  stopSpinner() {
    this.$('.spinner img').fadeOut();
    this.$('form input[type=submit]').attr('disabled', null);
  }

  startSpinner() {
    this.$('.spinner img').show();
    this.$('form input[type=submit]').attr('disabled', 'true');
  }
}