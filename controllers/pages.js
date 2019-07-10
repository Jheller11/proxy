const router = require('express').Router()
const { saveHit } = require('../utils')

// profile
router.get('/profile', saveHit, (req, res, next) => {
  res.status(200).send()
})

router.post('/profile/message', (req, res, next) => {
  console.log(req.body)
  res.status(200).send()
})

// pyramids
router.get('/pyramids', saveHit, (req, res, next) => {
  res.status(200).send()
})

// rentcheck
router.get('/rentcheck', saveHit, (req, res, next) => {
  res.status(200).send()
})

// liverpool
router.get('/liverpool', saveHit, (req, res, next) => {
  res.status(200).send()
})

module.exports = router
