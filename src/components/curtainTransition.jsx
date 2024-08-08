import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Chest from './chest';
import '../assets/css/curtain.css';

const CurtainTransition = ({ children }) => {
  const [showChest, setShowChest] = useState(false);

  const styles = useSpring({
    from: { translateY: '0%' },
    to: { translateY: '-100%' },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChest(true);
    }, 2000); // Thời gian khớp với thời gian animation

    return () => clearTimeout(timeout);
  }, []);

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
