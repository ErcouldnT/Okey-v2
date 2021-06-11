import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [gamerooms, setGamerooms] = useState([])

  const getRooms = async () => {
    try {
      const { data } = await axios.get(process.env.NODE_ENV === "production" ? "/rooms" : "http://localhost:5000/rooms", {
        headers: {
          auth: localStorage.getItem("Auth_token")
        }
      })
      setGamerooms(data)
    } catch (error) {
      setTimeout(getRooms, 3000)
    }
  }

  useEffect(() => {
    getRooms()
  }, [])
  
  return (
    <div className="card">
      <div className="cardHeader">Lobby</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="gameroom">Room name</label>
          <input type="text" name="gameroom" id="gameroom" autoFocus placeholder="secret room"/>
        </div>
        <button>Create</button>
        <div className="gamerooms">
          {gamerooms.map(room => {
            return <div key={room._id} className="gameroom">
              <div>{room.name}</div>
              <Link to={"/room/" + room._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
