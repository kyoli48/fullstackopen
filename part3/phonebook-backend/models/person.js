require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
//NB: .env file is .gitignore'd & .dockerignore'd
//MONGODB_URI saved w/ `fly secrets set`

console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate : {
      validator: number => /\d{2,3}-\d+/.test(number),
      message: "Invalid format"
    },
    required: true
  }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)