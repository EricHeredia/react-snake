import React, { useState, useEffect } from 'react'
import Snake from './components/Snake'
import Food from './components/Food'
import './App.css'

function App() {

  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let randomXY = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [randomXY, randomXY]
  }

  const [food] = useState(getRandomCoordinates())
  const [direction, setDirection] = useState('RIGHT')
  const [snakeDots] = useState([
    [0, 0],
    [2, 0]
  ])
  
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [direction])

  const onKeyDown = (e) => {
    e = e || window.event

    switch (e.keyCode) {
      case 38:
      case 75:
        setDirection('UP')
        break
      case 40:
      case 74:
        setDirection('DOWN')
        break
      case 37:
      case 72:
        setDirection('LEFT')
        break
      case 39:
      case 76:
        setDirection('RIGHT')
        break
      default:
        break
    }
  }
  
  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
      <p>{direction}</p>
    </div>
  )
}

export default App;