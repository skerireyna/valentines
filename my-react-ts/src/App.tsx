import { useState } from 'react'
import './index.css'

function App() {
  const [opened, setOpened] = useState(false)

  if (opened) {
    return (
      <div className="valentine-bg">
        <div className="letter">
          <h1>My Love ❤️</h1>
          <p>
            This little letter carries all the things I don’t say enough.
            You make my world softer, warmer, and brighter just by being in it.
          </p>
          <span className="signature">— Always yours 💖</span>
        </div>
      </div>
    )
  }

  return (
    <div className="valentine-bg">
      <div className="envelope">
        <div className="flap"></div>
        <button className="stamp" onClick={() => setOpened(true)}>
          💘
        </button>
      </div>
    </div>
  )
}

export default App