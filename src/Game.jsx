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
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExtensionIcon from "@mui/icons-material/Extension";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import PublicIcon from "@mui/icons-material/Public";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [cardType, setCardType] = useState("icons");
  const [gridSize, setGridSize] = useState(4);
  const [time, setTime] = useState(120);
  const [turns, setTurns] = useState(0);
  const [completedTime, setCompletedTime] = useState(null);

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
    const icons = [
      "AcUnitIcon",
      "NightsStayIcon",
      "FlashOnIcon",
      "CloudIcon",
      "TerrainIcon",
      "StarRateIcon",
      "WbSunnyIcon",
      "TsunamiIcon",
      "SportsBasketballIcon",
      "SportsBarIcon",
      "ThunderstormIcon",
      "LightbulbIcon",
      "FavoriteIcon",
      "ExtensionIcon",
      "LocalFireDepartmentIcon",
      "LunchDiningIcon",
      "ThermostatIcon",
      "PublicIcon ",
    ];

    const selectedIcons = icons.slice(0, (gridSize * gridSize) / 2);

    return selectedIcons;
  };

  const generateNumberArray = () => {
    const numbers = Array.from(Array((gridSize * gridSize) / 2).keys()).map(
      (num) => (num + 1).toString()
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
    setTurns(turns + 1);

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

        if (matchedCards.length === cards.length - 2) {
          setCompletedTime(120 - time);
          checkGameStatus();
        }
      }, 1000);
    }
  };

  const renderCardContent = (card) => {
    if (matchedCards.includes(card.id)) {
      if (cardType === "icons") {
        const IconComponent = getIconComponent(card.content);
        return <IconComponent />;
      } else if (cardType === "numbers") {
        return <span>{card.content}</span>;
      }
    } else if (card.isFlipped) {
      if (cardType === "icons") {
        const IconComponent = getIconComponent(card.content);
        return <IconComponent />;
      } else if (cardType === "numbers") {
        return <span>{card.content}</span>;
      }
    }
    return <span></span>;
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
      case "SportsBasketballIcon":
        return SportsBasketballIcon;
      case "SportsBarIcon":
        return SportsBarIcon;
      case "ThunderstormIcon":
        return ThunderstormIcon;
      case "LightbulbIcon":
        return LightbulbIcon;
      case "FavoriteIcon":
        return FavoriteIcon;
      case "ExtensionIcon":
        return ExtensionIcon;
      case "LocalFireDepartmentIcon":
        return LocalFireDepartmentIcon;
      case "LunchDiningIcon":
        return LunchDiningIcon;
      case "ThermostatIcon":
        return ThermostatIcon;
      case "PublicIcon ":
        return PublicIcon;
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

  const startTimer = () => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return timer;
  };

  useEffect(() => {
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const checkGameStatus = () => {
    if (matchedCards.length === cards.length) {
      alert("Congratulations! You won the game!");
    } else if (time === 0) {
      alert("Time's up! You lost the game.");
    }
  };

  useEffect(() => {
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (time === 0 || matchedCards.length === cards.length) {
      checkGameStatus();
    }
  }, [time, matchedCards, cards]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
          <button
            className={gridSize === 4 ? "selected" : ""}
            onClick={() => handleGridSizeChange(4)}
          >
            4x4
          </button>
          <button
            className={gridSize === 6 ? "selected" : ""}
            onClick={() => handleGridSizeChange(6)}
          >
            6x6
          </button>
        </div>
      </div>
      <div>Turn: {turn}</div>
      <div className={`grid grid-${gridSize}`}>
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
      <div>Time: {time}</div>
      {matchedCards.length === cards.length && (
        <div>
          <p>Game completed in {turns} turns</p>
          <p>Time taken: {formatTime(completedTime)}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
