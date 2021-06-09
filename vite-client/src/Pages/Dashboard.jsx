import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [gamerooms, setGamerooms] = React.useState([])

  const gamerooms2 = [
    {
      _id: "1",
      name: "erkuttss"
    },
    {
      _id: "2",
      name: "erkuasdfsttss"
    }
  ]

  const getRooms = () => {
    axios.get(process.env.NODE_ENV === "production" ? "/rooms" : "http://localhost:5000/rooms", {
      headers: {
        auth: localStorage.getItem("Auth_token")
      }
    }).then(res => {
      console.log(res.data)
      setGamerooms(res.data)
    }).catch(err => {
      setTimeout(getRooms, 3000)
    })
  }

  React.useEffect(() => {
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
          {gamerooms2.map(room => {
            <div key={room._id} className="gameroom">
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
