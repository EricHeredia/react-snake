import React, { useState, useEffect } from 'react'
import Snake from './components/Snake'
import Food from './components/Food'
import './App.css'

function App() {

  const [snakeBody, setSnakeBody] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
    [6, 0],
    [8, 0],
    [10, 0],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
    [20, 0],
    [22, 0],
    [24, 0],
    [26, 0],
    [28, 0],
    [30, 0],
    [32, 0],
    [34, 0],
    [36, 0],
    [38, 0],
    [40, 0],
    [42, 0]
  ])

  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let randomXY = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    snakeBody.indexOf([randomXY, randomXY]) > -1 ? getRandomCoordinates():console.log('DIFFERENT')
    return [randomXY, randomXY]
  }

  const [food, setFood] = useState(getRandomCoordinates())
  const [direction, setDirection] = useState('RIGHT')
  const [snakeSpeed, setSnakeSpeed] = useState(200)

  useEffect(() => {
    moveSnake()
  },[direction])

  useEffect(() => {
    checkIfOutsideGameArea()
    checkIfCollideSelf()
    checkIfEating()
    document.addEventListener('keydown', onKeyDown)
    const gameClock = setInterval(moveSnake, snakeSpeed)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      clearInterval(gameClock)
    }
  })

  const moveSnake = () => {
    let body = [...snakeBody]
    let head = body[body.length - 1]

    switch (direction) {
      case 'UP':
        head = [head[0], head[1] - 2]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      default:
        break
    }
    body.push(head)
    body.shift()
    setSnakeBody(body)
  }

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 40:
      case 74:
        direction !== 'UP' && setDirection('DOWN')
        break
      case 38:
      case 75:
        direction !== 'DOWN' && setDirection('UP')
        break
      case 39:
      case 76:
        direction !== 'LEFT' && setDirection('RIGHT')
        break
      case 37:
      case 72:
        direction !== 'RIGHT' && setDirection('LEFT')
        break
      default:
        break
    }
  }

  const checkIfOutsideGameArea = () => {
    let head = snakeBody[snakeBody.length - 1]
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      onGameOver()
    }
  }

  const checkIfCollideSelf = () => {
    let snake = [...snakeBody]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver()
      }
    })
  }

  const checkIfEating = () => {
    let head = snakeBody[snakeBody.length - 1]
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())
      growSnake()
      increaseSpeed()
    }
  }

  const growSnake = () => {
    let newSnake = [...snakeBody]
    newSnake.unshift([])
    setSnakeBody(newSnake)
  }
  
  const increaseSpeed = () => {
    if (snakeSpeed > 30) {
      setSnakeSpeed(snakeSpeed - 5)
    }
  }

  const onGameOver = () => {
    alert(`Game Over. Snake lengh is ${snakeBody.length}`)
    setDirection('RIGHT')
    setSnakeSpeed(200)
    setSnakeBody([
      [0, 0],
      [2, 0],
      [4, 0]
    ])
  }

  return (
    <div className="game-area">
      <Snake snakeBody={snakeBody} />
      <Food food={food} />
      <p>{direction}</p>
    </div>
  )
}

export default App;