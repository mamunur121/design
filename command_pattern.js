// This is a behavioural design pattern
// that aims to encapsulate actions or operations as objects.

// Suppose you are building an application that supports the Cut, Copy, and Paste clipboard actions.
// These actions can be triggered in different ways throughout the app:
// by a menu system, a context menu (e.g. by right clicking on a textbox), or by a keyboard shortcut.

// Command objects allow you to centralize the processing of these actions,
// one for each operation. So, you need only one Command for processing all Cut requests,
// one for all Copy requests, and one for all Paste requests.
////////////////////////////////1 ///////////////////////////////////////////////////////
class SpecialMath {
  constructor(num) {
    this._num = num;
  }
  square() {
    return this._num ** 2;
  }
  cube() {
    return this._num ** 3;
  }
  squareRoot() {
    return Math.sqrt(this._num);
  }
}
class Command {
  constructor(subject) {
    this._subject = subject;
    this.commandsExecuted = [];
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this._subject[command]();
  }
}

const x =new Command(new SpecialMath(5));
x.execute('square');
x.execute('cube');

console.log(x.commandsExecuted);
/////////////////////////////////


let name = {
  fName: 'aaa',
  lName: 'bbb',
  setName: function (fName, lName) {
    this.fName = fName;
    this.lName = lName;
  },
  getName:function(){
    return this.fName + " " + this.lName;
  },
};

name.execute = function (key) {
  let methodName = name[key];
  let functionParamsArray = [].splice.call(arguments,1);
  return methodName.apply(name, functionParamsArray);
};

name.execute('setName', 'Akash', 'Pal');
console.log(name.execute('getName'));

///////////////////////////////////////

var CarManager = {
  // request information
  requestInfo: function( model, id ){
    return "The information for " + model + " with ID " + id + " is foobar";
  },
  // purchase the car
  buyVehicle: function( model, id ){
    return "You have successfully purchased Item " + id + ", a " + model;
  },
  // arrange a viewing
  arrangeViewing: function( model, id ){
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  }
};

CarManager.execute = function ( name ) {
  return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
};

console.log(CarManager.execute( "arrangeViewing", "Ferrari", "14523" ));
//////////////////////////////////

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var Commands = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
};

var AddCommand = function (value) {
  return new Commands(add, sub, value)
};

var SubCommand = function (value) {
  return new Commands(sub, add, value)
};
var MulCommand = function (value) {
  return new Commands(mul, div, value);
};

var DivCommand = function (value) {
  return new Commands(div, mul, value);
};
var Calculator = function () {
  var current = 0;
  var commands = [];

  function action(command) {
    var name = command.execute.toString().substr(9, 3);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      log.add(action(command) + ": " + command.value);
    },

    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      log.add("Undo " + action(command) + ": " + command.value);
    },

    getCurrentValue: function () {
      return current;
    }
  }
};
// log helper
var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();
function run() {
  var calculator = new Calculator();
  // issue commands
  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MulCommand(6));
  calculator.execute(new DivCommand(2));
  // reverse last two commands

  log.add("\nValue: " + calculator.getCurrentValue());
  log.show();
}
run();

