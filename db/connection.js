const mongoose = require('mongoose')
mongoose.Promise = Promise

let db =
  process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost/node-server'

mongoose.connect(db, { useNewUrlParser: true })

module.exports = mongoose
