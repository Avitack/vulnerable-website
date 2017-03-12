var mongoose = require('mongoose');

var testModelSchema = mongoose.Schema({
  field1: String,
});
var TestModel = mongoose.model('TestModel', testModelSchema);
module.exports = TestModel;
