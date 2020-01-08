// traditional Function-based syntax
function Hero(name, specialAbility) {  // attributes like name and specialAbility and methods like getDetails
  // setting property values
  this.name = name;
  this.specialAbility = specialAbility;

  // declaring a method on the object
  this.getDetails = function() {
    return this.name + ' can ' + this.specialAbility;
  };
}

// creating new instance of Hero
const IronMan = new Hero('Iron Man', 'fly');
console.log(IronMan.getDetails());


// ES6 Class syntax
class Hero1 {
  constructor(name, specialAbility) {
    // setting property values
    this.name = name;
    this.specialAbility = specialAbility;

    // declaring a method on the object
    this.getDetails = function() {
      return `${this.name} can ${this.specialAbility}`;
    };
  }

  getName() {
    return `I am ${this.name}`;
  }
}

const hero = new Hero1('mam', 'sleep');
console.log(hero.getDetails());
console.log(hero.getName());

