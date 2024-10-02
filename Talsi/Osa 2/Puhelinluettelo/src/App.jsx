import { useState, useEffect } from 'react'
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

// En nyt tiedä oliks tää sittenkään paras tapa pitää pelkkä yksi notofocation komponentti
// mutta meni jo ja opitaan myöhemmin lisää
const Notification = ({ message, successful }) => {
  if (message === null) {
    return null
  }
  else if (successful) { 
    return ( // message of a successful action has class "notification"
      <div className="notification">
        {message}
      </div>
    )
  }
  return ( // message of an unsuccessful action has class "error"
    <div className="error">
      {message}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personThatExists = persons.find(person => person.name === newName)
    if (personThatExists !== undefined) {
      if (window.confirm(`${personThatExists.name} is already added to phonebook. Do you want to replace their old number?`)) {
        const newPerson = {...personThatExists, number: newNumber}
        contactService
          .update(personThatExists.id, newPerson)
          .then(() => {
            const updatedPersons = persons.filter(person => person.id !== personThatExists.id).concat(newPerson)
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')

            setMessage(`Updated ${newPerson.name}`)
            setTimeout(() => setMessage(null), 3000)
          })
          .catch(() => {
            setErrorMessage(`Person '${newPerson.name}' was already removed from server`)
            setTimeout(() => setErrorMessage(null), 5000)
            setPersons(persons.filter(person => person.id !== personThatExists.id))
          })
      }
    } else {
        const newPerson = {name: newName, number: newNumber}
        contactService
          .create(newPerson)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
          })
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => setMessage(null), 3000)
    }
  }

  const removeName = (id) => {
    if (window.confirm('Are you sure you want to remove this?')) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      setMessage(`Removed succesfully`)
      setTimeout(() => setMessage(null), 3000)
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
      <Notification message={message} successful={true} />
      <Notification message={errorMessage} successful={false} />
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