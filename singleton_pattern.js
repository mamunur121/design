// A class with only a single instance with global access point
// Working principals:
// if no instance of the singleton class exists then a new instance is created and returned,
// but if an instance already exists, then the reference to the existing instance is returned.

// Singletons are useful in situations where system-wide actions
// need to be coordinated from a single central place.
// An example is a database connection pool.
// The pool manages the creation, destruction,
// and lifetime of all database connections for
// the entire application ensuring that no connections are 'lost'.

class Database {
  constructor(data) {
    if(Database.exists) {
      return Database.instance;
    }

    this.data = data;
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

const mongo = new Database('mongo');
console.log(mongo.getData());

const mysql = new Database('mysql');
console.log(mysql.getData());
console.log();
// EXAMPLE 2
// Classically, the Singleton pattern can be implemented by
// creating a class with a method that creates a new instance of the class if one doesn’t exist.
// In the event of an instance already existing, it simply returns a reference to that object.
const singleton = (function () {

  let instance;
  function init() {
    let name;
    this.setName = function (name) {
      this.name = name;
    };
    this.getName = function () {
      return this.name;
    };

    return {
      setName: setName,
      getName: getName,
    }
  }

  function getInstance() {
    if(!instance) {
      instance = init();
    }

    return instance;
  }

  return {
    getInstance: getInstance
  }

})();

const one = singleton.getInstance();
one.setName('Akash');
console.log(one.getName());

const two = singleton.getInstance();
two.setName('Ali');
console.log(two.getName());
console.log(one === two);
console.log();


// EXAMPLE 3

const mySingleton = (function () {
  // instance stores a reference to the Singleton
  let instance;

  function init() {
    // Private methods and variables;
    function privateMethod() {
      console.log('I am private');
    }
    const privateVariable = 'I am also private';
    const privateRandomNumber = Math.random();

    return {
      // public methods and variables
      publicMethod: function () {
        console.log('I am public');
      },
      publicProperty: 'I am also public',
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };

  }
  return {
    // Get the singleton instance if one exists
    // or create one if it does not exists
    getInstance: function () {
      if(!instance) {
        instance = init();
      }
      return instance;
    }
  }

})();

const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

console.log();


//  example 4

const SingleTon = (function () {
  let instance;

  function createInstance() {
    const object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if(!instance) {
        instance  = createInstance();
      }
      return instance;
    }
  }

})();

function run() {
  const instance1 = SingleTon.getInstance();
  const instance2 = SingleTon.getInstance();
  console.log(instance1 === instance2);
}

run();