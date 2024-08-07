// CurtainTransition.jsx
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Chest from './chest';
import '../assets/css/tamRem.css';

const CurtainTransition = ({ children }) => {
  const [styles, api] = useSpring(() => ({
    from: { translateY: '0%' },
    to: { translateY: '-100%' },
    config: { duration: 2000 },
  }));

  const [showChest, setShowChest] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.start({ translateY: '-100%' });
      setTimeout(() => {
        setShowChest(true);
      }, 2000); // Thời gian trùng với thời gian animation
    }, 2000);

    return () => clearTimeout(timeout);
  }, [api]);

  return (
    <div className="curtain-container">
      <animated.div className="curtain" style={styles} />
      <div className="content">
        {showChest ? <Chest /> : children}
      </div>
    </div>
  );
};

export default CurtainTransition;
