import React from "react";
import "../assets/css/balloon.css";
import balloon from "../assets/images/balloon.png";
import brokenBalloon from "../assets/images/brokenBalloon.png";

const Balloon = ({ x, y, id, popped }) => {
  return (
    <div
      id={id}
      className={`balloon ${popped ? 'popped' : ''}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <img
        className="balloon"
        src={popped ? brokenBalloon : balloon}
        alt="balloon"
        style={{
          width: "50px",
          height: "50px",
        }}
      />
    </div>
  );
};

export default Balloon;
