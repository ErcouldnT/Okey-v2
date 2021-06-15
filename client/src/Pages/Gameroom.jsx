import React from 'react'
import { withRouter } from 'react-router-dom'

function Gameroom({ match, socket }) {
  const room_id = match.params.id
  

  return (
    <div>
      Okey!
    </div>
  )
}

export default withRouter(Gameroom)