import { useState } from 'react'

const Button = ({ onClick, text}) => (<button onClick={onClick}>{text}</button>)

const StatisticLine = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const ave = (good - bad) / total
  const positive = (good / total) * 100
  
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={ave.toFixed(1)} />
          <StatisticLine text="positive" value={`${positive.toFixed(1)}%`} />
        </tbody>
      </table>
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

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomInt = max => Math.floor(Math.random() * max)

  const handleAnecdote = () => setSelected(randomInt(anecdotes.length))
  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const indexOfMax = arr => { 
    let maxIndex = 0
    for (let i = 1; i < arr.length; i++) { 
        if (arr[i] > arr[maxIndex]) { 
            maxIndex = i
        } 
    } 
    return maxIndex
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h1>random anecdote</h1>
      <p>
        {anecdotes[selected]}
        <br />
        has {votes[selected]} votes
      </p>
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleAnecdote} text='next anecdote' />
      <h1>anecdote with most votes</h1>
      <p>
        {anecdotes[indexOfMax(votes)]}
        <br />
        has {votes[indexOfMax(votes)]} votes
      </p>
    </div>
  )
}

export default App