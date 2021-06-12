import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'

export default function Login(props) {
  const nameRef = React.createRef()
  const passwordRef = React.createRef()

  const loginPlayer = () => {
    const name = nameRef.current.value
    const password = passwordRef.current.value

    axios.post(process.env.NODE_ENV === "production" ? "/login" : "http://localhost:5000/login", {
      name,
      password
    }).then(res => {
      makeToast("success", res.data.message)
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem('Auth_token', res.data.token)
        props.history.push("/dashboard")
      }
    }).catch(err => {
      makeToast("error", err.res.data.message)
    })
  }

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="player">Your name</label>
          <input 
            type="text" 
            name="text" 
            id="player" 
            autoFocus 
            placeholder=" ercode"
            ref={nameRef}/>
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder=" your password"
            ref={passwordRef}/>
        </div>
        <button onClick={loginPlayer}>Sign in</button>
      </div>
    </div>
  )
}
