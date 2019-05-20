const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('hello admin controller')
})

module.exports = router
