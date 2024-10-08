import { a, useSpring } from '@react-spring/web';
import { useState } from 'react';

import "../assets/css/flipCard.css";

const FlipCard = () => {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  return (
    <div className="container" onClick={() => set(state => !state)}>
      <a.div
        className="c back"
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      />
    </div>
  )
}

export default FlipCard;
