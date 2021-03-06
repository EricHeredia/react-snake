import React from 'react'

const Snake = (props) => {
  return (
    <div>
      {props.snakeBody.map((body, i) => {
        const style = {
          left: `${body[0]}%`,
          top: `${body[1]}%`
        }

        return (
          <div className="snake-body" key={i} style={style}></div>
        )
      })}
    </div>
  )
}

export default Snake
