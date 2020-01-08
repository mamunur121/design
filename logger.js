// create a module
var url = 'http://mylogger.io/log';
console.log(__filename);
console.log(__dirname);
function log(msg) {
  // send an HTTP request
  console.log(msg);
}
module.exports = log;
// module.exports.endPoint = url;
