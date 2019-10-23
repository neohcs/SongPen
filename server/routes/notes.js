const router = require('express').Router()
const Note = require('../models/Note')

const path = require('path')
const fs = require('fs')
const uid = require('uid')
const multer = require('multer')
const uploadPath = 'public/uploads'
try {
  fs.mkdirSync(uploadPath, { recursive: true })
} catch (error) {
  console.log(`${uploadPath} does exist.`)
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploadPath),
  filename: (req, file, callback) => callback(null, Date.now() + '_' + uid() + '.wav'),
})

const upload = multer({ storage })

router.post('/upload', upload.single('file'), async (req, res) => {
  const { destination, filename } = req.file
  res.json({ path: destination.replace('public/', '') + '/' + filename })
})

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
