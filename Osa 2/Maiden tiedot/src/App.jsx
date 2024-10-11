import axios from 'axios'
import { useState, useEffect } from 'react'

const Result = ({ countries, filter, chosen, chooseFunc }) => {
  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  const matches = filteredCountries.length

  if (chosen) {
    return (
      <>
        <CountryInfo country={chosen} />
      </>
    )
  }

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
          {filteredCountries.map((c, i) => <ListedCountry key={i} country={c} showCountry={() => chooseFunc(c)}/>)}
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

const ListedCountry = ({ country, showCountry }) => {
  return (
    <>
      <li>
        {country.name.common}
        <button onClick={showCountry}>show</button>
      </li>
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
  const [chosenCountry, setChosenCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const chooseCountry = (country) => {
    setChosenCountry(country)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter === '') {
      setChosenCountry(null)
    }
  }

  return (
    <div>
      <h3>find countries</h3>
      <p>(clear the filter and start typing again to seach again)</p>
      <form>
        <input value={newFilter} onChange={handleFilterChange} />
      </form>
      <Result countries={allCountries} filter={newFilter} chosen={chosenCountry} chooseFunc={chooseCountry}/>
    </div>
  )
}

export default App