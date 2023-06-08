const mongoose = require('mongoose');

const satResultsSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  address: String,
  city: String,
  country: String,
  pincode: Number,
  satScore: Number,
  passed: String,
});

const SATResults = mongoose.model('SATResults', satResultsSchema);

module.exports = SATResults;
