import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Anecdote = ({ heading, text, votes }) => {
  return (
    <>
      <h2>{heading}</h2>
      <p>{text}<br /></p>
      <p>This anecdote has {votes} votes.</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const emptyVotes = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(emptyVotes)

  const handleRandomAnectodote = () => {
    let rnd = Math.floor(Math.random() * anecdotes.length)
    setSelected(rnd)
  }

  const handleNewVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = votes[selected] + 1
    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote heading={'Anecdote of the day'} text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleRandomAnectodote} text={'next anecdote'} />
      <Button onClick={handleNewVote} text={'vote this'} />
      <Anecdote heading={'Most voted anecdote'} text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App