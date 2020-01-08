class Subject {
  constructor() {
    this._observers = [];
  }
  subscribe(observer) {
    this._observers.push(observer);
  }
  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => observer !== obs);
  }
  fire(change) {
    this._observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch (change) {
      case 'INC':
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

// usage
const sub = new Subject();

const obs1 = new Observer(1);
const obs2 = new Observer(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire('DEC');

console.log(obs1.state); // 2
console.log(obs2.state); // 20
console.log();

///////////////////////////////////////////////////////////////////////////////////////////

function Click() {
  this.handlers = [];  // observers
}

Click.prototype = {

  subscribe: function (fn) {
    this.handlers.push(fn);
  },
  unsubscribe: function(fn) {
    this.handlers = this.handlers.filter(item => fn !== item);
  },

  fire: function (o, thisObj) {
    const scope = thisObj;
    this.handlers.forEach(item => item.call(scope, o));

  }
};

// log helper
var log = (function() {
  var log = "";
  return {
    add: function(msg) { log += msg + "\n"; },
    show: function() { console.log(log); log = ""; }
  }
})();

function run() {
  var clickHandler = function(item) {
    log.add("fired: " + item);
  };

  var click = new Click();
  click.subscribe(clickHandler);
  click.fire('event #1');
  click.unsubscribe(clickHandler);
  click.fire('event #2');
  click.subscribe(clickHandler);
  click.fire('event #3');

  log.show();
}
run();
console.log();

/////////////////////////////////////////////

// see png file

///////////////////////////////////
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};

// The Observer
function Observer(){
  this.update = function(){
    // ...
  };
}
///
function Subject(){
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};


///////////////////////////////////////////
///////////////////////////////////////////
var pubsub = {};

(function(q) {

  var topics = {},
      subUid = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  q.publish = function( topic, args ) {

    if ( !topics[topic] ) {
      return false;
    }

    var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func( topic, args );
    }

    return this;
  };

  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  q.subscribe = function( topic, func ) {

    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = ( ++subUid ).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  q.unsubscribe = function( token ) {
    for ( var m in topics ) {
      if ( topics[m] ) {
        for ( var i = 0, j = topics[m].length; i < j; i++ ) {
          if ( topics[m][i].token === token) {
            topics[m].splice( i, 1 );
            return token;
          }
        }
      }
    }
    return this;
  };
}( pubsub ));
/////////////
// Another simple message handler

// A simple message logger that logs any topics and data received through our
// subscriber
var messageLogger = function ( topics, data ) {
  console.log( "Logging: " + topics + ": " + data );
};

// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );
console.log(subscription);

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish( "inbox/newMessage", "hello world!" );

// or
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );

// or
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});

// We can also unsubscribe if we no longer wish for our subscribers
// to be notified
// pubsub.unsubscribe( subscription );

// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );