import { useState } from 'react'

const Contact = ({ person }) => {
  return (
    <li>
      <p>{person.name} {person.number}</p>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { key: 0,
      name: 'elppa koo',
      number: '666'},
    { key: 1,
      name: 'jerppa pee',
      number: '123'},
    { key: 2,
      name: 'jenppa vee',
      number: '365'},
    { key: 3,
      name: 'erppa rää',
      number: '816'},
    { key: 4,
      name: 'irppa lää',
      number: '381'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {key: persons.length, name: newName, number: newNumber}
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
      <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
      <h3>Add a new contact</h3>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.includes(newFilter)).map((person, i) => <Contact key={person.key} person={person}/>)}
      </ul>
    </div>
  )
}

export default App