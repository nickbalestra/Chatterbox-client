var RoomsView = Backbone.View.extend({

  events: {
    'click #addRoom': 'addRoom',
    'change #roomSelect': 'changeRooom'
  },

  initialize: function(){
    this.collection.on('sync', this.render, this);
    this.collection.currentRoom = 'lobby';
    this.availableRooms = {};
  },

  addRoom: function(){
    var roomName = prompt('Room name');
    this.collection.currentRoom = roomName;

    this.$('#roomSelect').prepend($('<option>', { value : roomName }).text(roomName)).prop('selected', true);
    this.$('#roomSelect option:eq(0)').prop('selected', true);

    this.collection.trigger('empty', roomName);
  },

  changeRooom: function(e){
    this.collection.trigger('changeRoom', e.target.value);
  },

  renderRoom: function(room){
    var roomName = room.get('roomname');

    if (roomName && !this.availableRooms[roomName]) {
      this.$('#roomSelect').append($('<option>', { value : roomName }).text(roomName));
      this.availableRooms[roomName] = true;
    }
  },

  render: function(){
    this.collection.each(function(room){
      this.renderRoom(room);
    }, this);
  }
});
