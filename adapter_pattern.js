// Structural -> Based on the idea of building blocks of objects

// Adapter -> Match interfaces of different classes therefore classes can work together
// despite incompatible interfaces

//This is a structural pattern where the interface of one class is translated into another.
// This pattern lets classes work together that could not otherwise because of incompatible interfaces.

// old interface
class OldCalculator {
  constructor() {
    this.operations = function(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return term1 + term2;
        case 'sub':
          return term1 - term2;
        default:
          return NaN;
      }
    };
  }
}
// new interface
class NewCalculator {
  constructor() {
    this.add = function(term1, term2) {
      return term1 + term2;
    };
    this.sub = function(term1, term2) {
      return term1 - term2;
    };
  }
}
// Adapter Class
class CalcAdapter {
  constructor() {
    const newCalc = new NewCalculator();
    this.operations = function (term1, term2, operation) {
      switch (operation) {
        case 'add':
          // using the new implementation under the hood
          return newCalc.add(term1, term2);

        case 'sub':
          return newCalc.sub(term1, term2);

        default:
          return NaN;
      }
    };
  }
}
const oldCalc = new OldCalculator();
console.log(oldCalc.operations(10, 5, 'add')); // 15

const newCalc = new NewCalculator();
console.log(newCalc.add(10, 5)); // 15

const adaptedCalc = new CalcAdapter();
console.log(adaptedCalc.operations(10, 5, 'add')); // 15;
console.log();



//  EXAMPLE 2

// old interface
function Shipping() {
  this.request = function(zipStart, zipEnd, weight) {
    return "$49.75";
  }
}
// new interface
function AdvancedShipping() {
  this.login = function(credentials) { /* ... */ };
  this.setStart = function(start) { /* ... */ };
  this.setDestination = function(destination) { /* ... */ };
  this.calculate = function(weight) { return "$39.50"; };
}
// adapter interface
function ShippingAdapter(credentials) {
  const shipping = new AdvancedShipping();
  shipping.login(credentials);

  return {
    request: function (zipStart, zipEnd, weight) {
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);
      return shipping.calculate(weight);
    }
  };
}
const log = (function () {
  let log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();
function run() {
  const shipping = new Shipping();
  const credentials = {token: "30a8-6ee1"};
  const adapter = new ShippingAdapter(credentials);

  // original shipping object and interface
  let cost = shipping.request("78701", "10010", "2 lbs");
  log.add("Old cost: " + cost);

  // new shipping object with adapted interface
  cost = adapter.request("78701", "10010", "2 lbs");
  log.add("New cost: " + cost);

  log.show()
}
run();