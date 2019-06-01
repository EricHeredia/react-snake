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
  let direction = 'RIGHT'
  const [snakeSpeed] = useState(200)
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
    [4, 0]
  ])
  
  useEffect(() => {
    const timer = setInterval(moveSnake, snakeSpeed)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      clearInterval(timer)
    }
  })

  const moveSnake = () => {
    let dots = [...snakeDots]
    let head = dots[dots.length - 1]

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
      default:
        break
    }
    console.log(dots)
    dots.push(head)
    dots.shift()
    setSnakeDots(dots)
  }

  const onKeyDown = (e) => {
    e = e || window.event

    switch (e.keyCode) {
      case 38:
      case 75:
        direction = 'UP'
        break
      case 40:
      case 74:
        direction = 'DOWN'
        break
      case 37:
      case 72:
        direction = 'LEFT'
        break
      case 39:
      case 76:
        direction = 'RIGHT'
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