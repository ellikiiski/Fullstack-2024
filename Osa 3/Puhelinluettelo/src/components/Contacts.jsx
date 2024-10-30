// Koodi kopioitu suoraan osasta 2 lukunottamatta erikseen kommentoituja kohtia

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

export default Contacts
  