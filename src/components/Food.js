import React from 'react'

const Food = (props) => {

  const style = {
    left: `${props.food[0]}%`,
    top: `${props.food[1]}%`
  }
  
  return (
    <div className="snake-food" style={style}>

    </div>
  )
}

export default Food