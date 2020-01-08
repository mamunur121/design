// This is also a structural design pattern that focuses
// on the ability to add behaviour or functionalities to existing classes dynamically.
// It is another viable alternative to sub-classing.

// The decorator type behaviour is very easy to implement in JavaScript because
// JavaScript allows us to add methods and properties to object dynamically.
// The simplest approach would be to just add a property to an object,
// but it will not be efficiently reusable.

class Book {
  constructor(title, author, price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getDetails() {
    return `${this.title} by ${this.author}`;
  }
}

// decorator 1
function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function () {
    return `Unwrapped ${book.getDetails()}`
  };
  return book;
}

// decorator 2
function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;
  return book;
}


const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));
console.log(alchemist.isGiftWrapped);
console.log(alchemist.unwrap());
console.log();
const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));
console.log(inferno.isHardbound); // true
console.log(inferno.price); // 20
console.log();

//////////////////////
const User = function(name) {
  this.name = name;
  this.say = function() {
    log.add("User: " + this.name);
  };
};

const DecoratedUser = function(user, street, city) {
  this.user = user;
  this.name = user.name;  // ensures interface stays the same
  this.street = street;
  this.city = city;

  this.say = function() {
    log.add("Decorated User: " + this.name + ", " +
        this.street + ", " + this.city);
  };
};

// logging helper
var log = (function() {
  var log = "";
  return {
    add: function(msg) { log += msg + "\n"; },
    show: function() { console.log(log); log = ""; }
  }
})();

function run() {
  var user = new User("Kelly");
  user.say();
  var decorated = new DecoratedUser(user, "Broadway", "New York");
  decorated.say();
  log.show();
}
run();
console.log();

///////////////////////////////////////
// A vehicle constructor
function vehicle( vehicleType ){
  // some sane defaults
  this.vehicleType = vehicleType || "car";
  this.model = "default";
  this.license = "00000-000";
}
// Test instance for a basic vehicle
var testInstance = new vehicle( "car" );
console.log( testInstance );
// Outputs:
// vehicle: car, model:default, license: 00000-000

// Lets create a new instance of vehicle, to be decorated
var truck = new vehicle( "truck" );

// New functionality we're decorating vehicle with
truck.setModel = function( modelName ){
  this.model = modelName;
};

truck.setColor = function( color ){
  this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );
console.log( truck );
// Outputs:
// vehicle:truck, model:CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new vehicle( "car" );
console.log( secondInstance );
// Outputs:
// vehicle: car, model:default, license: 00000-000


/////////////////////////////////////////////////////////////////////
// The constructor to decorate
function MacBook() {
  this.cost = function () { return 900; };
  this.screenSize = function () { return 11.6; };
}
// Decorator 1
function Memory( macbook ) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 50;
  };
}
// Decorator 2
function Engraving( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 20;
  };
}

// Decorator 3
function Insurance( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 50;
  };
}

var mb = new MacBook();
Memory( mb );
Engraving( mb );
Insurance( mb );
console.log(mb.cost());
console.log(mb.screenSize());