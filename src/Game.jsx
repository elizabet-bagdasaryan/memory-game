import React, { useState, useEffect, useCallback } from "react";
import "./Game.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CloudIcon from "@mui/icons-material/Cloud";
import TerrainIcon from "@mui/icons-material/Terrain";
import StarRateIcon from "@mui/icons-material/StarRate";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TsunamiIcon from "@mui/icons-material/Tsunami";

const Game = ({ gridSize }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [cardType, setCardType] = useState("icons"); // Default card type is "icons"

  const generateCards = useCallback(() => {
    const contentArray =
      cardType === "icons" ? generateIconArray() : generateNumberArray();
    const cards = [];

    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
      const card = { id: i * 2, content: contentArray[i], isFlipped: false };
      cards.push(card, { ...card, id: i * 2 + 1 });
    }

    const shuffledCards = shuffleArray(cards);
    setCards(shuffledCards);
  }, [gridSize, cardType]);

  useEffect(() => {
    generateCards();
  }, [generateCards, gridSize]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateIconArray = () => {
    return [
      "AcUnitIcon",
      "NightsStayIcon",
      "FlashOnIcon",
      "CloudIcon",
      "TerrainIcon",
      "StarRateIcon",
      "WbSunnyIcon",
      "TsunamiIcon",
    ];
  };
  const generateNumberArray = () => {
    const numbers = Array.from(Array(8).keys()).map((num) =>
      (num + 1).toString()
    );
    return numbers;
  };

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }

    if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
      return;
    }

    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      return c;
    });

    setCards(newCards);
    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      if (selectedCards[0].content === card.content) {
        setMatchedCards([...matchedCards, selectedCards[0].id, card.id]);
      }
      setTimeout(() => {
        const updatedCards = cards.map((c) => {
          if (!matchedCards.includes(c.id)) {
            return { ...c, isFlipped: false };
          }
          return c;
        });
        setCards(updatedCards);
        setSelectedCards([]);
        setTurn(turn + 1);
      }, 1000);
    }
  };

  const renderCardContent = (card) => {
    if (card.isFlipped) {
      if (cardType === "icons") {
        const IconComponent = getIconComponent(card.content);
        return <IconComponent />;
      } else if (cardType === "numbers") {
        return <span>{card.content}</span>;
      }
    }
    return null;
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
    generateCards();
    setMatchedCards([]);
    setSelectedCards([]);
    setTurn(1);
  };
  const getIconComponent = (name) => {
    switch (name) {
      case "AcUnitIcon":
        return AcUnitIcon;
      case "NightsStayIcon":
        return NightsStayIcon;
      case "FlashOnIcon":
        return FlashOnIcon;
      case "CloudIcon":
        return CloudIcon;
      case "TerrainIcon":
        return TerrainIcon;
      case "StarRateIcon":
        return StarRateIcon;
      case "WbSunnyIcon":
        return WbSunnyIcon;
      case "TsunamiIcon":
        return TsunamiIcon;
      default:
        return null;
    }
  };
  const handleGridSizeChange = (size) => {
    setGridSize(size);
    generateCards();
    setMatchedCards([]);
    setSelectedCards([]);
    setTurn(1);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCardTypeChange("icons")}>
          Show Icons
        </button>
        <button onClick={() => handleCardTypeChange("numbers")}>
          Show Numbers
        </button>
        <div>
          Grid Size:{" "}
          <button onClick={() => handleGridSizeChange(4)}>4x4</button>
          <button onClick={() => handleGridSizeChange(6)}>6x6</button>
        </div>
      </div>
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
            {renderCardContent(card)}
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
