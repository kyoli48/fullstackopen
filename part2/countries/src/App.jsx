import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = newSearch.length === 0
    ? countries
    : countries.filter(c =>
        c.name.common.toLowerCase().includes(newSearch.toLowerCase())
      )

  const handleSearch = (event) => setNewSearch(event.target.value)

  return (
    <>
      find countries <input onChange={handleSearch} />
      <Countries countriesToShow={countriesToShow} />
    </>
  )
}

export default App
