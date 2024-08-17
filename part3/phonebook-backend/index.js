const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', req => 
    req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

const Person = require('./models/person')

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person
        .countDocuments({})
        .then(count => {
            res.send(`
                <p>Phonebook has info for ${count} ${count = 1 ? 'person' : 'people'}.</p>
                <p>${new Date()}</p>
            `)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    const person = new Person({
        "name": name,
        "number": number
    })

    person
        .save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person
        .findByIdAndUpdate(
            req.params.id, 
            { name, number }, 
            { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})