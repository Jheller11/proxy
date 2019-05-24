const mongoose = require('../db/connection')

const requestSchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    default: Date.now()
  },
  path: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  body: {
    type: Object,
    required: true
  },
  application: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Request', requestSchema)
