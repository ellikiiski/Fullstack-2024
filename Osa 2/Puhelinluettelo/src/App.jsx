import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'elppa koo',
      number: '666'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter: <input value={newFilter} onChange={handleFilterChange}></input>
        </div>
      </form>
      <h3>ADD NEW</h3>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/><br />
          number : <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.includes(newFilter)).map((person, index) => <li key={index}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App