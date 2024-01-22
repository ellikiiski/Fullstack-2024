import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'

const Contact = ({ person, onDelete }) => {
  return (
    <li>
      <p>{person.name} {person.number}</p>
      <button onClick={onDelete}>delete</button>
    </li>
  )
}

const ContactList = ({ persons, filter, onDelete }) => {
  return (
    <>
      <ul>
        {persons
          .filter(person => person.name.includes(filter))
          .map(person => (
            <Contact key={person.id} person={person} onDelete={() => onDelete(person.id)} />
          ))}
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

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}

      contactService
        .create(newPerson)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeName = (id) => {
    if (window.confirm('Are you sure you want to remove this?')) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
      <ContactList persons={persons} filter={newFilter} onDelete={removeName}/>
    </div>
  )
}

export default App