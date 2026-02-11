import { useState } from "react";
import "./index.css";

function App() {
  const [opened, setOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [startX, setStartX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || startX === null) return;

    let delta = e.clientX - startX;

    // resistance at edges
    if (
      (currentCard === 0 && delta > 0) ||
      (currentCard === cards.length - 1 && delta < 0)
    ) {
      delta *= 0.35;
    }

    setOffsetX(delta);
  };

  const handlePointerUp = () => {
    const threshold = 120;

    let newIndex = currentCard;

    if (offsetX < -threshold) {
      // swipe left → next card
      newIndex = (currentCard + 1) % cards.length;
    } else if (offsetX > threshold) {
      // swipe right → previous card
      newIndex = (currentCard - 1 + cards.length) % cards.length;
    }

    setCurrentCard(newIndex);
    setOffsetX(0);
    setStartX(null);
    setIsDragging(false);
  };


  const cards = [
    {
      title: "lunae lumen",
      text: "These postcards contain the words that embody how I feel towards you",
      signature: "— KJ",
    },
    {
      title: "milky",
      text: "In every universe, somehow, wholeheartedly believe I will find my way to you",
      signature: "— KJ",
    },
    {
      title: "ongpin",
      text: "In any circusmtance in life, between us, I will always be the lucky one",
      signature: "— KJ",
    },
    {
      title: "atom",
      text: "Energy is formulated within me as long as you radiate your presence around",
      signature: "— KJ",
    },
    {
      title: "parallel self",
      text: "the universe can create multiple possibilities, and I am grateful that this version of me is beside you",
      signature: "— KJ",
    },
    {
      title: "dopamine",
      text: "Experiencing affection from you signals my body to neurotransmit happy hormones",
      signature: "— KJ",
    },
    {
      title: "apple",
      text: "my eyes can only perceive the beuatiful images that you create in my heart and mind",
      signature: "— KJ",
    },
    {
      title: "roman myth",
      text: "If we had lived centuries ago, you would be Venus as you are the epitome of love",
      signature: "— KJ",
    },
     {
      title: "oatside",
      text: "Through any hardships, I hope I am the first person that comes up to your mind to find comfort",
      signature: "— KJ",
    },
    {
      title: "roosevelt",
      text: "In life, we will be journeymen, I don't care where it takes us as long as you are with me",
      signature: "— KJ",
    },
  ];

  if (opened) {
    const card = cards[currentCard];

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
              ? "none"
              : "transform 0.45s cubic-bezier(.22,1,.36,1), opacity 0.3s ease",
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
    );
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
