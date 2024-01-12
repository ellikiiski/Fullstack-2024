import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({text, onClick }) => { // hähää tehty jo
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const StatisticLine = ({ text, value }) => { // ihan turha refaktorointi...
  return (
    <>
      <p>
        {text} {value}
      </p>
    </>
  )
}

const Statistics = ({ good, ok, bad }) => {
  const sum = good + ok + bad
  const average = (good-bad)/sum
  const positive = good/sum*100 + "%"

  if (sum == 0) {
    return (
      <>
        <p>
          Palautetta ei vielä annettu.
        </p>
      </>
    )
  }

  return (
    <>
      <StatisticLine text={"hyvä"} value={good} />
      <StatisticLine text={"neutraali"} value={ok} />
      <StatisticLine text={"huono"} value={bad} />
      <StatisticLine text={"yhteensö"} value={sum} />
      <StatisticLine text={"keskiarvo"} value={average} />
      <StatisticLine text={"positiivista"} value={positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"Anna palautetta klikkaamalla"} />
      <Button text={"hyvää"} onClick={() => setGood(good + 1)} />
      <Button text={"ok"} onClick={() => setNeutral(neutral + 1)} />
      <Button text={"pahaa"} onClick={() => setBad(bad + 1)} />
      <Header text={"tilastot:"} />
      <Statistics good={good} ok={neutral} bad={bad}/>
    </div>
  )
}

export default App