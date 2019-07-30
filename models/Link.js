const mongoose = require('../db/connection')

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Link', linkSchema)
