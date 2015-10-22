class RoomsView extends Backbone.View {

  events() {
    return {
      'click #addRoom': 'addRoom',
      'change #roomSelect': 'changeRooom'
    }
  }
  

  initialize() {
    this.collection.on('sync', this.render, this);
    this.availableRooms = {};
  }

  addRoom() {
    var roomName = prompt('Room name');
    this.collection.currentRoom = roomName;

    this.$('#roomSelect').prepend($('<option>', { value : roomName }).text(roomName)).prop('selected', true);
    this.$('#roomSelect option:eq(0)').prop('selected', true);

    this.collection.trigger('empty', roomName);
  }

  changeRooom(e) {
    this.collection.trigger('changeRoom', e.target.value);
  }

  renderRoom(room) {
    var roomName = room.get('roomname');

    if (roomName && !this.availableRooms[roomName]) {
      this.$('#roomSelect').append($('<option>', { value : roomName }).text(roomName));
      this.availableRooms[roomName] = true;
    }
  }

  render() {
    this.collection.each(function(room){
      this.renderRoom(room);
    }, this);
  }
}