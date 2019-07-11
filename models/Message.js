const mongoose = require('../db/connection')

const messageSchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    default: Date.now()
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Message', messageSchema)
