import { useState, useEffect } from 'react'
import personService from './services/persons'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import Error from './components/Error'

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

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newError, setNewError] = useState(null)

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
          .update(id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNewMessage(`${updatedPerson.name} updated!`)
            setTimeout(() => {
              setNewMessage(null)
            }, 4000)
          })
          .catch(error => {

            if (error.response && error.response.data.error) {
              setNewError(error.response.data.error)
            } else {
              setNewError(`${updatedPerson.name} was already deleted!`)
              setPersons(persons.filter(person => person.id !== updatedPerson.id))
            }

            setTimeout(() => {
              setNewError(null)
            }, 4000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setNewMessage(`${newPerson.name} added!`)
          setTimeout(() => {
            setNewMessage(null)
          }, 4000);
        })
        .catch(error => {

          setNewError(error.response.data.error)
          console.log(error.response.data.error)
          
          setTimeout(() => {
            setNewError(null)
          }, 4000);
        })
    }
  }

  const deletePerson = ( id ) => {

    const delPerson = persons.find(person => person.id === id)
    if (window.confirm(`Do you really want to delete ${delPerson.name}?`)) {
      
      personService
        .remove(id)
        .then(() => {
          const remainingPersons = persons.filter(person => person.id !== id)
          setPersons(remainingPersons)
          setNewMessage(`${delPerson.name} deleted!`)
          setTimeout(() => {
            setNewMessage(null)
          }, 4000);
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
      <br />
      <Notification message={newMessage} />
      <Error message={newError} />
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={newFilter} deleteFunction={deletePerson}/>
    </div>
  )
}

export default App