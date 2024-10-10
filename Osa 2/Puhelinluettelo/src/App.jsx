import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Contacts = ({ persons, filter, deleteFunction }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.includes(filter)).map((person) => <Contact key={person.id} person={person} deleteFunction={deleteFunction} />)}
      </ul>
    </>
  )
}

const Contact = ({ person, deleteFunction }) => {
  return (
    <>
      <li>
        {person.name}: {person.number}
        <button onClick={() => deleteFunction(person.id)}>delete</button>
      </li>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {

      if (window.confirm((`${existingPerson.name} already exists in the phonebook with number ${existingPerson.number}. Do you want to replace it?`))) {
        const updatedPerson = {...existingPerson, number: newNumber}
        const id = updatedPerson.id

        personService
          .updatePerson(id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = ( id ) => {
    const delPerson = persons.find(person => person.id === id)
    if (window.confirm(`Do you really want to delete ${delPerson.name}?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          const remainingPersons = persons.filter(person => person.id !== returnedPerson.id)
          setPersons(remainingPersons)
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
      <h3>ADD NEW</h3>
      <AddForm name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={newFilter} deleteFunction={deletePerson}/>
    </div>
  )
}

export default App