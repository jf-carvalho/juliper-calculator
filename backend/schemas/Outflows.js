const mongoose = require('mongoose');
const { Schema } = mongoose;

const outflows = new Schema({
  name:  String,
});

const Outflows = mongoose.model('Outflows', outflows);

module.exports = Outflows;