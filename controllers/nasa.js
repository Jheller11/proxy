const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('hello nasa controller')
})

module.exports = router
