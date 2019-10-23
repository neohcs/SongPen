const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
  date: String,
  title: String,
  content: String,
  tag: String,
  recordings: Array
})

module.exports = Note
