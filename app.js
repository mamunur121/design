// Events arguments

const EventEmitter = require('events');
const emitter = new EventEmitter();

// First register, then raise ana event
// Register a listener
emitter.on('messageLogged', function (args) {
  console.log('Listener called', args);
});

// Raise an event
emitter.emit('messageLogged', 'a'); // 1, url
// emit() -> making a noise, produce sth -> signalling a event has happened