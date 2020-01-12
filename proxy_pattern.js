// An object representing another object and control access to this object,
// // However, there are situations where an object is severely constrained
// and cannot live up to its responsibility.
// Typically this occurs when there is a dependency on a remote resource
// (resulting in network latency) or when an object takes a long time to load.
//
// In situations like these you apply the Proxy pattern and
// create a proxy object that ‘stands in’ for the original object.
// The Proxy forwards the request to a target object.
// The interface of the Proxy object is the same as the original object and
// clients may not even be aware they are dealing with a proxy rather than the real object

function GeoCoder() {

  this.getLatLng = function(address) {

    if (address === "Amsterdam") {
      return "52.3700° N, 4.8900° E";
    } else if (address === "London") {
      return "51.5171° N, 0.1062° W";
    } else if (address === "Paris") {
      return "48.8742° N, 2.3470° E";
    } else if (address === "Berlin") {
      return "52.5233° N, 13.4127° E";
    } else {
      return "";
    }
  };
}

function GeoProxy() {
  var geocoder = new GeoCoder();
  var geocache = {};

  return {
    getLatLng: function(address) {
      // If a location is not already cached it goes out to the real GeoCoder service and stores the results in cache.
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      log.add(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function() {
      var count = 0;
      for (var code in geocache) { count++; }
      return count;
    }
  };
}

var log = (function() {
  var log = "";

  return {
    add: function(msg) { log += msg + "\n"; },
    show: function() { console.log(log); log = ""; }
  }
})();

function run() {
  var geo = new GeoProxy();

  // geolocation requests

  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng('Kiel');
  log.add("\nCache size: " + geo.getCount());
  log.show();
}

run();

///////////////////////////////////
let BankAccounts = function() {
  //constructor
};

BankAccounts.prototype = {
  add(bankAccountData) {
    // funtionality for adding a new bank account
  },
  find(bankAccount) {
    // searching the list of bank accounts
  },
  getList() {
    // return a list of all the bank accounts
  }
};
// creating the proxy
var BankAccountsProxy = function() {
  // getting a reference to the original object
  this.bankAccounts = new BankAccounts();
};

BankAccountsProxy.prototype = {
  addBankAccount(bankAccountData) {
    // some funtionality before calling the add method on BankAccounts
    return this.bankAccounts.add();
  },
  findBankAccount(bankAccount) {
    // some funtionality before calling the find method on BankAccounts
    return this.carList.find();
  },
  getBankAccountsList() {
    // some funtionality before calling the getList method on BankAccounts
    return this.carList.getList();
  }
};

////////////////////////////////////////////
/*  For the sake of keeping us on track, we won't
    show implementation code in great detail. */
var CarList = function() {
  //creation
};

CarList.prototype = {
  getCar: function() {
    // get a vehicle from the list using the
    // given parameters
  },

  search: function() {
    // search through the cars using the query
  },

  addCar: function() {
    // add a car to the database
  },
};

var CarListProxy = function() {
  this.carList = new CarList();
};

CarListProxy.prototype = {
  getCar: function() {
    return this.carList.getCar();
  },

  search: function() {
    return this.carList.search();
  },

  addCar: function() {
    return this.carList.addCar();
  },

};


/// the number of method or function  in the original and proxy object must same,
// there may be some additional calculation but almost same things will do both of the object


// Target
function networkFetch(url) {
  return `${url} - Response from network`;
}

// Proxy
// ES6 Proxy API = new Proxy(target, handler);
const cache = [];
const proxiedNetworkFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const urlParam = args[0];
    if (cache.includes(urlParam)) {
      return `${urlParam} - Response from cache`;
    } else {
      cache.push(urlParam);
      return Reflect.apply(target, thisArg, args);
    }
  },
});

// usage
console.log(proxiedNetworkFetch('dogPic.jpg')); // 'dogPic.jpg - Response from network'
console.log(proxiedNetworkFetch('dogPic.jpg')); // 'dogPic.jpg - Response from cache'
console.log(proxiedNetworkFetch('catPic.jpg'));