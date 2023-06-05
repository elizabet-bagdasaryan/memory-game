import React from "react";

const Player = ({ cards, selectedCards, matchedCards, onCardClick }) => {
  return (
    <div className="player">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${selectedCards.includes(index) ? "selected" : ""} ${
            matchedCards.includes(index) ? "matched" : ""
          }`}
          onClick={() => onCardClick(index)}
        >
          {card}
        </div>
      ))}
    </div>
  );
};

export default Player;
