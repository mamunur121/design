// FACTORY PATTERN
// Definition: Define an interface for creating an object, but let subclasses decide which class to instantiate.
// Factory Method lets a class defer instantiation to subclasses.
// EXAMPLE 1

class BallFactory {
  constructor() {
    this.createBall = function (type) {
      let ball;
      if(type === 'football' || type === 'soccer') ball = new Football();
      else if(type === 'basketball') ball = new Basketball();
      ball.roll = function () {
        return `The ${this.type} is rolling`;
      };
      return ball;
    };
  }
}

class Football {
  constructor() {
    this.type = 'football';
    this.kick = function () {
      return `You kicked the Football`;
    }
  }
}

class Basketball {
  constructor() {
    this.type = 'basketball';
    this.bounce = function() {
      return 'You bounced the basketball.';
    };
  }
}

const factory = new BallFactory();

const myFootball = factory.createBall('football');
const myBasketBall = factory.createBall('basketball');

console.log(myFootball.roll());
console.log(myFootball.kick());
console.log();
console.log(myBasketBall.roll());
console.log(myBasketBall.bounce());

console.log();


//////////////////////////////////////


// EXAMPLE 2
// https://www.dofactory.com/javascript/factory-method-design-pattern  READ IT CAREFULLY

function Factory() {
  this.createEmployee = function (type) {
    let employee;

    if(type === 'fulltime') {
      employee = new FullTime();
    } else if (type === "parttime") {
      employee = new PartTime();
    } else if (type === "temporary") {
      employee = new Temporary();
    } else if (type === "contractor") {
      employee = new Contractor();
    }

    employee.type = type;

    employee.say = function () {
      log.add(this.type + ": rate " + this.hourly + "/hour");
    };

    return employee;

  }
}

const FullTime = function () {
  this.hourly = "$12";
};

const PartTime = function () {
  this.hourly = "$11";
};

const Temporary = function () {
  this.hourly = "$10";
};

const Contractor = function () {
  this.hourly = "$15";
};
// log helper
const log = (function () {
  let log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();

function run() {
  const employees = [];
  const factory = new Factory();

  employees.push(factory.createEmployee('fulltime'));
  employees.push(factory.createEmployee("parttime"));
  employees.push(factory.createEmployee("temporary"));
  employees.push(factory.createEmployee("contractor"));

  for (let i = 0; i < employees.length; i++) {
    employees[i].say();
  }
  log.show();
}

run();

///////////////////////////////////////////////////

// EXAMPLE 3

function Bike(options){
  this.wheels = 2;
  this.color = options.color;
}

function Car(options){
  this.wheels = 4;
  this.color = options.color;
}

function VehicleFactory(){}

VehicleFactory.prototype.createVehicle = function(options){

  switch(options.type) {
    case 'Bike':
      this.vehicleClass = Bike;
      break;
    case 'Car':
      this.vehicleClass = Car;
      break;
    default:
      this.vehicleClass = Bike;
  }

  return new this.vehicleClass(options);
};

const vehicleFactory = new VehicleFactory();

const bike = vehicleFactory.createVehicle({
  type: 'Bike',
  color: 'white',
});

console.log(bike);

const car = vehicleFactory.createVehicle({
  type:'Car',
  color:'black'
});

console.log(car);
///////////////////////////////////////