import { animated, config, useSpring } from "@react-spring/web";
import { useState, useRef } from "react";
import "../assets/css/chest.css";
import chest from "../assets/images/chest.png";
import FlipCard from "./flipCard";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import happyBirthdayGuitar from "../assets/sounds/happy-birthday-guitar.mp3";

const Chest = () => {
  const [chestClicked, setChestClicked] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const { width, height } = useWindowSize();

  const screenSlide = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: config.slow,
  });

  const chestBounce = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-20px)" },
    config: { duration: 800, easing: (t) => t * t * t },
    loop: true,
  });

  const chestScale = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.3)" },
    config: config.wobbly,
    loop: { reverse: true },
  });

  const audioRef = useRef(null);

  const handleChestClick = () => {
    setChestClicked(true);
    setShowCard(true);
    audioRef.current.play();
  };

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <p className="instructions">
          Happy 21st birthday to you!
        </p>
      </div>
      <animated.div className="screen-slide" style={screenSlide}>
        <animated.div
          className="chest-container"
          style={chestClicked ? {} : chestBounce}
        >
          <animated.img
            src={chest}
            alt="Chest"
            style={chestClicked ? {} : chestScale}
            className="chest"
            onClick={handleChestClick}
          />
        </animated.div>
      </animated.div>
      {showCard && (
        <>
          <div className="overlay">
            <FlipCard />
          </div>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            recycle={true}
          />
        </>
      )}
      <audio ref={audioRef} src={happyBirthdayGuitar} autoPlay loop />
    </>
  );
};

export default Chest;
