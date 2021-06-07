import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <p>Hi, </p>
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

export default App
