const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: String,
  },
  genres: [
    { type: String }
  ]
})

/*
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
*/

module.exports = mongoose.model('Book', schema)