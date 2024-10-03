import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Unicafen palautejärjestelmä</h1>
      <h2>Anna palautetta:</h2>
      <Button onClick={handleGoodClick} text={'hyvä'} />
      <Button onClick={handleNeutralClick} text={'neutraali'} />
      <Button onClick={handleBadClick} text={'paha'} />
      <h2>Tilastot:</h2>
      <p>hyvää: {good}</p>
      <p>ok: {neutral}</p>
      <p>pahaa: {bad}</p>
    </div>
  )
}

export default App