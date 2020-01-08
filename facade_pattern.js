// a single class that hides the complexity of an entire sub-system

// This is a structural design pattern that is widely used in the JavaScript libraries.
// It is used to provide a unified and simpler, public-facing interface
// for ease of use that shields away from the complexities of its consisting subsystems or subclasses.

let currentId = 0;

class ComplaintRegistry  {
  registerComplaint(customer, type, details) {
    const id = ComplaintRegistry._uniqueIdGenerator();

    let registry;
    if(type === 'service') {
      registry = new ServiceComplaints();
    } else {
      registry = new ProductComplaints();
    }
    return registry.addComplaint({ id, customer, details });
  }
  static _uniqueIdGenerator() {
    return ++currentId;
  }
}

class Complaints {
  constructor() {
    this.complaints = [];
  }
  addComplaint(complaint) {
    this.complaints.push(complaint);
    return this.replyMessage(complaint);
  }
  getComplaint(id) {
    return this.complaints.find(complaint => complaint.id === id);
  }
  replyMessage(complaint) {}
}

class ProductComplaints extends Complaints {
  constructor(props) {
    super(props);
    if(ProductComplaints.exists) {
      return ProductComplaints.instance;
    }
    ProductComplaints.exists = true;
    ProductComplaints.instance = this;
    return this;
  }

  replyMessage({id, customer, details}) {
    return `Complaint No. ${id} reported by ${customer} regarding ${details} have been 1`;
  }

}

class ServiceComplaints extends Complaints {
  constructor() {
    super();
    if (ServiceComplaints.exists) {
      return ServiceComplaints.instance;
    }
    ServiceComplaints.instance = this;
    ServiceComplaints.exists = true;
    return this;
  }

  replyMessage({ id, customer, details }) {
    return `Complaint No. ${id} reported by ${customer} regarding ${details} have been 2`;
  }
}

const registry = new ComplaintRegistry();
const reportService = registry.registerComplaint('Martha', 'service', 'availability');
console.log(reportService);
const reportProduct = registry.registerComplaint('Jane', 'product', 'faded color');
console.log(reportProduct);
console.log();

////////////////////////////////////////////////////////////////////////////////
var Mortgage = function(name) {
  this.name = name;
};

Mortgage.prototype = {
  applyFor: function(amount) {
    // access multiple subsystems...
    var result = "approved";
    if (!new Bank().verify(this.name, amount)) {
      result = "denied";
    } else if (!new Credit().get(this.name)) {
      result = "denied";
    } else if (!new Background().check(this.name)) {
      result = "denied";
    }
    return this.name + " has been " + result +
        " for a " + amount + " mortgage";
  }
};

var Bank = function() {
  this.verify = function(name, amount) {
    // complex logic ...
    return true;
  }
};
var Credit = function() {
  this.get = function(name) {
    // complex logic ...
    return true;
  }
};
var Background = function() {
  this.check = function(name) {
    // complex logic ...
    return true;
  }
};

function run() {
var mortage = new Mortgage('Mamun');
var result = mortage.applyFor(1000);
console.log(result);
}

run();
console.log();


/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
class FetchMusic {
  get resources() {
    return [
      { id: 1, title: "The Fragile" },
      { id: 2, title: "Alladin Sane" },
      { id: 3, title: "OK Computer" }
    ];
  }

  fetch(id) {
    return this.resources.find(item => item.id === id);
  }
}
class GetMovie {
  constructor(id) {
    return this.resources.find(item => item.id === id);
  }

  get resources() {
    return [
      { id: 1, title: "Apocalypse Now" },
      { id: 2, title: "Die Hard" },
      { id: 3, title: "Big Lebowski" }
    ];
  }
}
const getTvShow = function(id) {
  const resources = [
    { id: 1, title: "Twin Peaks" },
    { id: 2, title: "Luther" },
    { id: 3, title: "The Simpsons" }
  ];

  return resources.find(item => item.id === 1);
};
const booksResource = [
  { id: 1, title: "Ulysses" },
  { id: 2, title: "Ham on Rye" },
  { id: 3, title: "Quicksilver" }
];

const TYPE_MUSIC = "music";
const TYPE_MOVIE = "movie";
const TYPE_TV = "tv";
const TYPE_BOOK = "book";

class CultureFacade {
  constructor(type) {
    this.type = type;
  }
  get(id) {
    switch (this.type) {
      case TYPE_MUSIC: {
        return this._tryToReturn(this._findMusic, id);
      }

      case TYPE_MOVIE: {
        return this._tryToReturn(this._findMovie, id);
      }

      case TYPE_TV: {
        return this._tryToReturn(this._findTVShow, id);
      }

      case TYPE_BOOK: {
        return this._tryToReturn(this._findBook, id);
      }

      default: {
        throw new Error("No type set!");
      }
    }
  }
  get _error() {
    return { status: 404, error: `No item with this id found` };
  }
  _tryToReturn(func, id) {
    const result = func.call(this, id);

    return new Promise((ok, err) => !!result
        ? ok(result)
        : err(this._error));
  }
  _findMusic(id) {
    const db = new FetchMusic();
    return db.fetch(id);
  }
  _findMovie(id) {
    return new GetMovie(id);
  }

  _findTVShow(id) {
    return getTvShow(id);
  }

  _findBook(id) {
    return booksResource.find(item => item.id === id);
  }
}

const m = new FetchMusic();
const music = new CultureFacade(TYPE_MUSIC);

music.get(1)
    .then(data => console.log(data))
    .catch(e => console.log(e));


//////////////////////////////////////////////////
///////////////////////////////////////////////

function TravelFacade(reservationType) {
  this.reservationType = reservationType;

  // this.flight = new FlightBooker();
  // this.hotel = new HotelBooker();
  // this.train = new TrainBooker();
}

TravelFacade.prototype.book = function (reservationInfo) {
  switch (this.reservationType) {
    case 'Flight':
      // book flight;
      this.flight.book(reservationInfo);
      break;
    case 'Hotel':
      // book hotel;
      this.hotel.book(reservationInfo);
      break;
    case 'Train':
      // book Train;
      this.train.book(reservationInfo);
      break;
    case 'Flight_And_Hotel':
      // book Flight and Hotel
      this.flight.book(reservationInfo);
      this.hotel.book(reservationInfo);
      break;
    case 'Train_And_Hotel':
      // book Train and Hotel
      this.train.book(reservationInfo);
      this.hotel.book(reservationInfo);
      break;
    default:
      // throw an error
      throw Error('Reservation type is not supported.');
  }
};

function FlightBooker() {
  function book(bookingInfo) {
    // handle booking flight
    console.log(bookingInfo.flight);
  }

  // revealing module pattern
  return {
    book: book
  }
}
function TrainBooker() {
  function book(bookingInfo) {
    // handle train booking
    console.log(bookingInfo.train);
  }

  // revealing module pattern
  return {
    book: book
  }
}
function HotelBooker() {
  function book(bookingInfo) {
    // handle hotel booking
    console.log(bookingInfo.hotel);
  }
  // revealing module pattern
  return {
    book: book
  }
}
let flight = {
  'departure_datetime': '21/09/2017 09:00',
  'return_datetime': '25/09/2017 22:00',
  'from': 'New York',
  'to': 'London'
};
let train = {
  'departure_datetime': '22/09/2017 20:00',
  'return_datetime': '25/09/2017 10:00',
  'from': 'London',
  'to': 'Edinburgh'
};
let hotel = {
  'check_in_date': '22/09/2017',
  'nights': 1,
  'city': 'London',
  'hotel_name': 'Four Seasons Hotel'
};


let travel1 = new HotelBooker(new TravelFacade('Hotel'));
// let travel1 = new TravelFacade('Flight_And_Hotel'); see lines 246-
travel1.book({hotel});
console.log(travel1);


