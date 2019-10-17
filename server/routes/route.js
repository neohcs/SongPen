const router = require('express').Router()
const Note = require('../models/Note')

router.get('/', (req, res) => {
  Note.find()
    .sort({ date: -1 }) // updaten, sodass erst Jahr, dann Monat, dann Tag gecheckt wird
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  //   .catch(err => res.json(err))
  console.log(req.params.id)
  Note.findOne({ _id: req.params.id })
    .then(notes => {
      console.log('NOTES', notes)
      res.json(notes)
    })
    .catch(err => res.json(err))
})

router.post('/', (req, res) => {
  Note.create(req.body)
    .then(note => res.json(note))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(note => res.json(note))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.json(err))
})

module.exports = router
