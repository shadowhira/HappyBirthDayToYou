// Chest.jsx
import { animated, config, useSpring } from '@react-spring/web';
import { useState } from 'react';
import '../assets/css/chest.css';
import chest from '../assets/images/chest.png';
import FlipCard from './flipCard';

const Chest = () => {
  const [chestClicked, setChestClicked] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const screenSlide = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
    config: config.slow,
  });

  const chestBounce = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(-20px)' },
    config: { duration: 800, easing: t => t * t * t },
    loop: true,
  });

  const chestScale = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
    config: config.wobbly,
    loop: { reverse: true },
  });

  const handleChestClick = () => {
    setChestClicked(true);
    setShowCard(true);
  };

  return (
    <>
      <animated.div className="screen-slide" style={screenSlide}>
        <animated.div className="chest-container" style={chestClicked ? {} : chestBounce}>
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
        <div className="overlay">
          <FlipCard />
        </div>
      )}
    </>
  );
};

export default Chest;
