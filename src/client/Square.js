import React, { Component } from "react";
import "./app.css";

function Square(props) {
  return (
    <button className={getClass(props.square)} onClick={props.onClick}>
      {getDisplay(props.square.piece)}
    </button>
  );
}

function getDisplay(piece) {
  if (!piece) {
    return "\u200C ";
  } else if (piece.black) {
    return piece.king ? "\u26C1" : "\u26C0";
  } else {
    return piece.king ? "\u26C3" : "\u26C2";
  }
}

function getClass(square) {
  let className = "square ";
  if (square.highlighted) {
    return className + "highlighted";
  } else if (square.playable) {
    return className + "playable";
  } else {
    return className + "unplayable";
  }
}

export default Square;
