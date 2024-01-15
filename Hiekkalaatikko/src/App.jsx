import Note from "./components/Note"

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} /> // haloo eiks tota key propsii tarvii erikseen määritellä tonne komponenttiin?
        )}
      </ul>
    </div>
  )
}

export default App