import { useState, useEffect } from 'react'
import axios from 'axios'

const Contact = ({ person }) => {
  return (
    <li>
      <p>{person.name} {person.number}</p>
    </li>
  )
}

const ContactList = ({ persons, filter }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.includes(filter)).map(person => <Contact key={person.id} person={person}/>)}
      </ul>
    </>
  )
}

const Filter = ({ filter, onChange }) => {
  return (
    <div>filter: <input value={filter} onChange={onChange}/></div>
  )
}

const AddForm = ({ onSubmit, nameVar, numberVar, nameFunc, numberFunc }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>name: <input value={nameVar} onChange={nameFunc}/></div>
        <div>number: <input value={numberVar} onChange={numberFunc} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {id: persons.length, name: newName, number: newNumber}
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
      <h3>Add a new contact</h3>
      <AddForm onSubmit={addName} nameVar={newName} nameFunc={handleNameChange}
      numberVar={newNumber} numberFunc={handleNumberChange} />
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App