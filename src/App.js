import React, { useState } from 'react'
import Snake from './components/snake'
import './App.css'

function App() {

  const [snakeDots, setSnakeDots] = useState([
    [0,0],
    [2,0]
  ])
  
  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
    </div>
  )
}

export default App;