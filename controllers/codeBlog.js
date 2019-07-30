const router = require('express').Router()
const checkLinksPassword = require('../utils').checkLinksPassword
const CodeLink = require('../models/CodeLink')

// router for my new gatsby project

// route for getting all links
router.get('/', (req, res, next) => {
  CodeLink.find({})
    .then(links => res.json(links))
    .catch(err => next(err))
})

// route for adding a link
router.post('/new', checkLinksPassword, (req, res, next) => {
  CodeLink.create(req.body)
    .then(link => res.status(200).json(link))
    .catch(err => next(err))
})

// route for deleting a link
router.delete('/:id', checkLinksPassword, (req, res, next) => {
  CodeLink.findOneAndDelete({ _id: req.params.id })
    .then(() => res.redirect('/links'))
    .catch(err => next(err))
})

// route for editing a link
router.put('/:id', checkLinksPassword, (req, res, next) => {
  CodeLink.findOneAndUpdate({ _id: req.params.id })
    .then(() => res.redirect('/links'))
    .catch(err => next(err))
})

module.exports = router
