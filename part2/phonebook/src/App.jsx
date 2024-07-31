import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [] )

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const id = persons.find(p => p.name.toLowerCase() === newName.toLowerCase()).id
      if (window.confirm(`${newName} already exists. replace old number with new one?`)) {
        personService
          .update(id, personObject)
          .then(updatedPerson => 
            setPersons(persons.map(p => p.id !== id ? p : updatedPerson)))
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => 
          setPersons(persons.concat(newPerson)))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(person.id)
      .then(() => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  const personsToShow = newSearch.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App