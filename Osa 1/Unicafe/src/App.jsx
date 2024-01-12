import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Statistics = ({ good, ok, bad }) => {
  const sum = good + ok + bad
  return (
    <>
      <p>
        hyvä {good} <br></br>
        neutraali {ok} <br></br>
        huono {bad}
      </p>
      <p>
        yhteensä {sum} <br></br>
        keskiarvo {(good-bad)/sum} <br></br>
        positiivista {good/sum*100 + "%"}
      </p>
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