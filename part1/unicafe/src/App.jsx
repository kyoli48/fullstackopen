import { useState } from 'react'

const Button = ({ onClick, text}) => (<button onClick={onClick}>{text}</button>)

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const ave = (good - bad) / total
  const positive = (good / total) * 100
  
  return (
    <div>
      <h1>statistics</h1>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
      all {total}
      <br />
      average {ave}
      <br />
      positive {positive}%
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App