import "./styles.css";
import React, { useState } from "react";
import Tenzy from "./Tenzy";
import { nanoid } from "nanoid";

export default function App() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomNumber = () => Math.floor(Math.random() * arr.length) + 1;
  const [tenzies, setTenzies] = useState(false);
  const [data, setData] = useState(
    arr.map((elem) => ({
      ...elem,
      elem: randomNumber(),
      isSelected: false,
      id: nanoid()
    }))
  );
  // Selecting a tenzy
  const toggle = (id) => {
    setData((prevData) =>
      prevData.map((elem) =>
        elem.id === id
          ? {
              ...elem,
              isSelected: !elem.isSelected
            }
          : elem
      )
    );
  };
  //Rolling the dice, changing Tenzies state in case of winning
  const roll = () => {
    setData((prevData) =>
      prevData.map((elem) =>
        !elem.isSelected
          ? {
              ...elem,
              elem: randomNumber()
            }
          : elem
      )
    );
    setTenzies(
      data.length === data.filter((elem) => elem.isSelected).length
        ? true
        : false
    );
  };
  //Setting logic for new game
  const reset = () => {
    setTenzies(false);
    setData((prevData) =>
      prevData.map((elem) => ({
        ...elem,
        isSelected: false
      }))
    );
  };
  //Creating Tenzy squares
  const tenzyEls = data.map((elem) => (
    <Tenzy
      id={elem.id}
      key={elem.id}
      toggle={toggle}
      isSelected={elem.isSelected}
      elem={elem.elem}
    />
  ));
  return (
    <div className="App">
      <div className="container">
        <h1 className="mainText">
          {!tenzies ? "Tenzies Game" : "You won! Congratulations!"}
        </h1>
        <div className="tenziesCont">{tenzyEls}</div>
        {!tenzies ? (
          <button onClick={roll} className="btn">
            Roll
          </button>
        ) : (
          <button onClick={reset} className="btn">
            New Game
          </button>
        )}
      </div>
    </div>
  );
}
