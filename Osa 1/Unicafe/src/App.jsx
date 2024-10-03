import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  let sum = good + neutral + bad
  let average = (sum !== 0) ? (good - bad) / sum : 0
  let positive = (sum !== 0) ? good / sum * 100 : 0

  if (sum !== 0) {
    return (
      <>
        <p>hyvää: {good}<br />ok: {neutral}<br />pahaa: {bad}<br />YHTEENSÄ: {sum}</p>
        <p>keskiarvo: {average}<br />positiivista: {positive}%</p>
      </>
    )
  }
  return (
    <>
      <p>Yhtään palautetta ei ole vielä annettu.</p>
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
      <Statistics good={good} neutral = {neutral} bad={bad} />
    </div>
  )
}

export default App