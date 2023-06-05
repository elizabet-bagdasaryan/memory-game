import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
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
import "./Game.css";

const Game = ({ gridSize, cardType }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [time, setTime] = useState(120);
  const [timerRunning, setTimerRunning] = useState(true);
  const [completedTime, setCompletedTime] = useState(0);
  const [turns, setTurns] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameMode, setGameMode] = useState("single");

  useEffect(() => {
    generateCards();
  }, []);

  const generateCards = () => {
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
      "PublicIcon",
    ];

    const selectedIcons = generateIconArray(icons);
    const selectedNumbers = generateNumberArray();

    const selectedContent =
      cardType === "icons" ? selectedIcons : selectedNumbers;

    const newCards = Array.from(
      { length: gridSize * gridSize },
      (_, index) => ({
        id: index,
        content: selectedContent[index],
        isFlipped: false,
      })
    );

    setCards(shuffle(newCards));
  };

  const generateIconArray = (icons) => {
    icons = icons.slice(0, (gridSize * gridSize) / 2);
    return shuffle([...icons, ...icons]);
  };

  const generateNumberArray = () => {
    const numbers = Array.from(
      { length: (gridSize * gridSize) / 2 },
      (_, index) => index + 1
    );
    return shuffle([...numbers, ...numbers]);
  };

  const handleCardClick = (clickedCard) => {
    if (!clickedCard.isFlipped && selectedCards.length < 2) {
      const updatedCards = cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
      setSelectedCards([...selectedCards, clickedCard]);

      if (selectedCards.length === 1) {
        setTimeout(checkForMatch, 1000);
      }
    }
  };

  const checkForMatch = () => {
    const [card1, card2] = selectedCards;

    if (card1.content === card2.content) {
      setMatchedCards([...matchedCards, card1.id, card2.id]);

      if (matchedCards.length + 2 === cards.length) {
        setGameWon(true);
        setTimerRunning(false);
        setCompletedTime(120 - time);
      }
    } else {
      const updatedCards = cards.map((card) =>
        card.id === card1.id || card.id === card2.id
          ? { ...card, isFlipped: false }
          : card
      );
      setCards(updatedCards);
    }

    setSelectedCards([]);
    setTurns(turns + 1);

    if (gameMode === "two-players") {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      if (time === 0) {
        setGameLost(true);
        setTimerRunning(false);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRunning, time]);

  const resetGame = () => {
    setCards([]);
    setSelectedCards([]);
    setMatchedCards([]);
    setGameWon(false);
    setGameLost(false);
    setTime(120);
    setTimerRunning(true);
    setCompletedTime(0);
    setTurns(0);
    setCurrentPlayer(1);
    generateCards();
  };

  const handleModeSwitch = () => {
    setGameMode(gameMode === "single" ? "two-players" : "single");
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-info">
          <span className="game-mode">
            {gameMode === "single" ? "Single Player Mode" : "Two Players Mode"}
          </span>
          <span className="game-turns">
            Turns: {turns} | Player: {currentPlayer}
          </span>
          <span className="game-timer">Time: {time}</span>
        </div>
        <div className="game-options">
          <div className="switch-mode">
            <button className="switch-button" onClick={handleModeSwitch}>
              {gameMode === "single"
                ? "Switch to Two Players"
                : "Switch to Single Player"}
            </button>
          </div>
        </div>
      </div>
      <div className={`cards-grid grid-${gridSize}`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-front"></div>
            <div className="card-back">
              {card.isFlipped &&
                (cardType === "icons" ? (
                  renderIcon(card.content)
                ) : (
                  <span className="card-number">{card.content}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="game-footer">
        {gameWon && (
          <div className="game-message">
            <h2>Congratulations!</h2>
            <p>You completed the game in {completedTime} seconds.</p>
            <button className="reset-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
        {gameLost && (
          <div className="game-message">
            <h2>Time's Up!</h2>
            <p>You ran out of time.</p>
            <button className="reset-button" onClick={resetGame}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const renderIcon = (icon) => {
  switch (icon) {
    case "AcUnitIcon":
      return <AcUnitIcon />;
    case "NightsStayIcon":
      return <NightsStayIcon />;
    case "FlashOnIcon":
      return <FlashOnIcon />;
    case "CloudIcon":
      return <CloudIcon />;
    case "TerrainIcon":
      return <TerrainIcon />;
    case "StarRateIcon":
      return <StarRateIcon />;
    case "WbSunnyIcon":
      return <WbSunnyIcon />;
    case "TsunamiIcon":
      return <TsunamiIcon />;
    case "SportsBasketballIcon":
      return <SportsBasketballIcon />;
    case "SportsBarIcon":
      return <SportsBarIcon />;
    case "ThunderstormIcon":
      return <ThunderstormIcon />;
    case "LightbulbIcon":
      return <LightbulbIcon />;
    case "FavoriteIcon":
      return <FavoriteIcon />;
    case "ExtensionIcon":
      return <ExtensionIcon />;
    case "LocalFireDepartmentIcon":
      return <LocalFireDepartmentIcon />;
    case "LunchDiningIcon":
      return <LunchDiningIcon />;
    case "ThermostatIcon":
      return <ThermostatIcon />;
    case "PublicIcon":
      return <PublicIcon />;
    default:
      return null;
  }
};

export default Game;
