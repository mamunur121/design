var Iterator = function(items) {
  this.index = 0;
  this.items = items;
};

Iterator.prototype = {
  first: function () {
    this.reset();
    return this.next();
  },
  next: function() {
    return this.items[this.index++];
  },
  hasNext: function() {
    return this.index <= this.items.length;
  },
  reset: function () {
    this.index = 0;
  },
  each: function(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
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
  var items = ["one", 2, "circle", true, "Applepie"];
  var iter = new Iterator(items);

  for (var item = iter.first(); iter.hasNext(); item=iter.next()){
    log.add(item);
  }

  log.add("");

  iter.each(function (item) {
    log.add(item);
  });

  log.show();
}

//run();
/////////////////////////////


class IteratorClass {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }

  [Symbol.iterator]() {
    return {
      next: ()=> {
        if(this.index < this.data.length) {
          return {value: this.data[this.index++], done:false};
        }else {
          this.index = 0;
          return {done: true};
        }
      }
    }
  }
}
function* iteratorUsingGenerator(collection) {
  var nextIndex = 0;

  while (nextIndex < collection.length) {
    yield collection[nextIndex++];
  }
}


const gen = iteratorUsingGenerator(['Hi', 'Hello', 'Bye']);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

///////////////////////////////////
const genFibIterator = (max = Number.MAX_SAFE_INTEGER) => {
  let n1 = 0;
  let n2 = 0;

  // this time we return an iterator object (rather than a function)
  return {
    // the logic needed to compute the next element is inside the `next` method
    next: () => {
      // calculates the next value
      let nextVal = n2 === 0 ? 1 : n1 + n2;

      // redefines n1 and n2 to match new values
      const prevVal = n2;
      n2 = nextVal;
      n1 = prevVal;

      // if we reached the upper bound (iteration completed)
      // set done to true and nextVal to undefined
      let done = false;
      if (nextVal >= max) {
        nextVal = undefined;
        done = true;
      }

      // return the iteration object as for the iteration protocol
      return { value: nextVal, done }
    }
  }
};

const it = genFibIterator(6);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());