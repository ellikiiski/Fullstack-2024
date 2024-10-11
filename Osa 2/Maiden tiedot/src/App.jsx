import axios from 'axios'
import { useState, useEffect } from 'react'

const Result = ({ countries, filter }) => {
  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  const matches = filteredCountries.length

  if (matches === 0) {
    return (
      <>
        <p>No matches.</p>
      </>
    )
  }

  if (matches === 1) {
    return <CountryInfo country={filteredCountries[0]} />
  }

  if (matches <= 10) {
    return (
      <>
        <ul>
          {filteredCountries.map((c, i) => <li key={i}> {c.name.common}</li>)}
        </ul>
      </>
    )
  }

  return (
    <>
      <p>Too many matches ({matches}), specify the filter.</p>
    </>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </>
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <p>find countries</p>
      <form>
        <input value={newFilter} onChange={handleFilterChange} />
      </form>
      <Result countries={allCountries} filter={newFilter} />
    </div>
  )
}

export default App