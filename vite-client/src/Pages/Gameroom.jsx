import React from 'react'
import io from 'socket.io-client'

export default function Gameroom({ match }) {
  const room_id = match.params.id
  const socket = io("http://localhost:5000", {
    query: {
      token: localStorage.getItem("Auth_token")
    }
  })

  return (
    <div>
      Okey!
    </div>
  )
}
