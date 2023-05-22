import React, { useState, useEffect, useCallback } from "react";
import "./Game.css";

const Game = ({ gridSize, cardType }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turn, setTurn] = useState(1);

  const generateCards = useCallback(() => {
    const icons = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const cards = [];

    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
      const card = { id: i * 2, icon: icons[i] };
      cards.push(card, { ...card, id: i * 2 + 1 });
    }

    const shuffledCards = shuffleArray(cards);
    setCards(shuffledCards);
  }, [gridSize]);

  useEffect(() => {
    generateCards();
  }, [generateCards]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }

    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      if (selectedCards[0].icon === card.icon) {
        setMatchedCards([...matchedCards, selectedCards[0].id, card.id]);
      }
      setTimeout(() => {
        setSelectedCards([]);
        setTurn(turn + 1);
      }, 1000);
    }
  };

  return (
    <div>
      <div>Turn: {turn}</div>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              selectedCards.includes(card) ? "selected" : ""
            } ${matchedCards.includes(card.id) ? "matched" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {cardType === "icons" ? (
              <IconComponent name={card.icon} />
            ) : (
              <span>{card.icon}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const IconComponent = ({ name }) => {
  return <i className={`icon ${name}`} />;
};

export default Game;
