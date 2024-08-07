import React, { useState, useEffect, useRef } from "react";
import { useSpring, to, animated, config } from "@react-spring/web";
import { scale, dist } from "vec-la";
import { useDrag } from "react-use-gesture";
import Balloon from "./balloon";
import CurtainTransition from "./curtainTransition";
import "../assets/css/rocket.css";
import detectCollision from "../utils/detectCollision";
import randomPosition from "../utils/randomPosition";
import Chest from "./chest.jsx";

const Rocket = () => {
  const numBalloons = 5;
  const initialRocketPos = [0, 0];
  const [{ pos }, api] = useSpring(() => ({ pos: initialRocketPos }));
  const [{ angle }, angleApi] = useSpring(() => ({
    angle: 0,
    config: config.wobbly,
  }));

  const bind = useDrag(
    ({ xy, previous, down, movement: pos, velocity, direction }) => {
      api.start({
        pos,
        immediate: down,
        config: { velocity: scale(direction, velocity), decay: true },
      });

      if (dist(xy, previous) > 10 || !down)
        angleApi.start({ angle: Math.atan2(direction[0], -direction[1]) });
    },
    { initial: () => pos.get() }
  );

  const rocketRef = useRef(null);
  const [balloons, setBalloons] = useState(
    Array.from({ length: numBalloons }, (_, id) => ({
      id,
      ...randomPosition(),
      popped: false,
    }))
  );
  const [count, setCount] = useState(0);
  const poppedBalloons = useRef(new Set());
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);
  const [showCurtainTransition, setShowCurtainTransition] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  const handleCollision = (id) => {
    if (poppedBalloons.current.has(id)) return;

    poppedBalloons.current.add(id);

    setBalloons((prevBalloons) =>
      prevBalloons.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: true } : balloon
      )
    );
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === numBalloons) {
        setShowEffect(true);
      }
      return newCount;
    });

    setTimeout(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.filter((balloon) => balloon.id !== id)
      );
    }, 1500);
  };

  useEffect(() => {
    const checkCollisions = () => {
      const rocketRect = rocketRef.current?.getBoundingClientRect();
      if (rocketRect) {
        balloons.forEach((balloon) => {
          const balloonElement = document.getElementById(
            `balloon-${balloon.id}`
          );
          if (balloonElement) {
            const balloonRect = balloonElement.getBoundingClientRect();
            if (detectCollision(rocketRect, balloonRect) && !balloon.popped) {
              handleCollision(balloon.id);
            }
          }
        });
      }
    };

    const checkOutOfBounds = () => {
      const rocketRect = rocketRef.current?.getBoundingClientRect();
      if (rocketRect) {
        const outOfBounds =
          rocketRect.left < 0 ||
          rocketRect.top < 0 ||
          rocketRect.right > window.innerWidth ||
          rocketRect.bottom > window.innerHeight;
        setIsOutOfBounds(outOfBounds);
      }
    };

    const intervalId = setInterval(() => {
      checkCollisions();
      checkOutOfBounds();
    }, 100);

    return () => clearInterval(intervalId);
  }, [pos, balloons]);

  const resetRocketPosition = () => {
    api.start({ pos: initialRocketPos, immediate: true });
    setIsOutOfBounds(false);
  };

  useEffect(() => {
    if (showEffect) {
      const timer = setTimeout(() => {
        setShowEffect(false);
        setShowCurtainTransition(true);
      }, 4000); // Thời gian cho hiệu ứng

      return () => clearTimeout(timer);
    }
  }, [showEffect]);

  return (
    <div>
      {!showCurtainTransition ? (
        <>
          <p className="instructions">
            Pop all the balloons using Rocket and get the Gift!{" "}
          </p>
          <animated.div
            ref={rocketRef}
            className="rocket"
            {...bind()}
            style={{
              transform: to(
                [pos, angle],
                ([x, y], a) => `translate3d(${x}px,${y}px,0) rotate(${a}rad)`
              ),
            }}
          />
          {balloons.map((balloon) => (
            <Balloon
              key={balloon.id}
              x={balloon.x}
              y={balloon.y}
              id={`balloon-${balloon.id}`}
              popped={balloon.popped}
            />
          ))}
          <p className={showEffect ? "blink-and-zoom" : ""}>
            {count}/{numBalloons}
          </p>
          {isOutOfBounds && (
            <button
              className="reset-button"
              onClick={resetRocketPosition}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              Reset Rocket Position
            </button>
          )}
        </>
      ) : (
        <CurtainTransition>
          <Chest />
        </CurtainTransition>
      )}
    </div>
  );
};

export default Rocket;
