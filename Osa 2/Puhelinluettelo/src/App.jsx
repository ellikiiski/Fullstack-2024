import { useState } from 'react'

const Filter = ({ filter, onChange }) => {
  return (
    <>
      <form>
        <div>
          filter: <input value={filter} onChange={onChange}></input>
        </div>
      </form>
    </>
  )
}

const AddForm = ({ name, nameChange, number, numberChange, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={nameChange}/><br />
          number : <input value={number} onChange={numberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Contacts = ({ persons, filter }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.includes(filter)).map((person, index) => <li key={index}>{person.name}: {person.number}</li>)}
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'elppa koo',
      number: '666'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
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
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h3>ADD NEW</h3>
      <AddForm name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App