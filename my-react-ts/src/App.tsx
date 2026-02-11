import { useState } from "react";
import "./index.css";

function App() {
  const [opened, setOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [startX, setStartX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e) => {
  setStartX(e.clientX)
  setIsDragging(true)
}

const handlePointerMove = (e) => {
  if (!isDragging || startX === null) return

  let delta = e.clientX - startX

  // resistance at edges
  if (
    (currentCard === 0 && delta > 0) ||
    (currentCard === cards.length - 1 && delta < 0)
  ) {
    delta *= 0.35
  }

  setOffsetX(delta)
}

const handlePointerUp = () => {
  const threshold = 120

  let newIndex = currentCard

  if (offsetX < -threshold) {
    // swipe left → next card
    newIndex = (currentCard + 1) % cards.length
  } else if (offsetX > threshold) {
    // swipe right → previous card
    newIndex = (currentCard - 1 + cards.length) % cards.length
  }

  setCurrentCard(newIndex)
  setOffsetX(0)
  setStartX(null)
  setIsDragging(false)
}



  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const swipeThreshold = 50; // px

    if (distance > swipeThreshold && currentCard < cards.length - 1) {
      // swipe left → next card
      setCurrentCard((i) => i + 1);
    }

    if (distance < -swipeThreshold && currentCard > 0) {
      // swipe right → previous card
      setCurrentCard((i) => i - 1);
    }

    setTouchStart(null);
  };

  const cards = [
    {
      title: "My Love ❤️",
      text: "This little letter carries all the things I don’t say enough.",
      signature: "— Always yours 💖",
    },
    {
      title: "You Mean Everything 🌸",
      text: "You make my bad days lighter and my good days brighter.",
      signature: "— Forever me",
    },
    {
      title: "One More Thing 💌",
      text: "No matter where life goes, I choose you every time.",
      signature: "— With all my heart",
    },
  ];

 if (opened) {
  const card = cards[currentCard]

  return (
    <div className="valentine-bg">
      <div
        className="postcard"
        style={{
          transform: `
            translateX(${offsetX}px)
            rotate(${offsetX * 0.03}deg)
          `,
          opacity: 1 - Math.min(Math.abs(offsetX) / 600, 0.4),
          transition: isDragging
            ? 'none'
            : 'transform 0.45s cubic-bezier(.22,1,.36,1), opacity 0.3s ease',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <h1>{card.title}</h1>
        <p>{card.text}</p>
        <span className="signature">{card.signature}</span>
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
  );
}

export default App;
