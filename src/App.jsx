import { useState } from "react";
import "./App.css";
import Game from "./Game";

function App() {
  return (
    <>
      <Game gridSize={4} cardType="icons" />
    </>
  );
}

export default App;
