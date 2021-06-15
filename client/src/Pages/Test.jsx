import React, { useState } from 'react'
import '../Styles/Test.css'

export default function Test() {
  const [count, setCount] = useState(0)
  const [player_name, setPlayer_name] = useState("")
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Hi, {player_name}</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            test: {count}
          </button>
        </p>
        <p>
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite
          </a>
        </p>
      </header>
    </div>
  )
}
