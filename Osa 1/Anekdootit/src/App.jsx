import { useState } from 'react'

const Anecdote = ({ header, text, votes}) => {
  return (
    <>
      <h1>{header}</h1>
      <p>
        {text}
      </p>
      <p>
        {"This quote has " + votes + " votes."}
      </p>
    </>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
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

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVoted = votes.indexOf(Math.max(...votes));

  const randomQuote = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randIndex)
  }

  const voteQuote = () => {
    const newVotes = [...votes]
    newVotes[selected] = votes[selected] + 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text={"random quote"} onClick={randomQuote} />
      <Button text={"vote"} onClick={voteQuote} />
      <Anecdote header={"Most voted anecdote"} text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App