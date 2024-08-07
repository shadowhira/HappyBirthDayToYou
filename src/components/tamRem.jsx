import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../assets/css/tamRem.css';
import Rocket from './rocket'

const Curtain = () => {
  const [styles, api] = useSpring(() => ({
    from: { translateY: '0%' },
    to: { translateY: '-100%' },
    config: { duration: 3000 },
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [api]);

  return (
    <div className="curtain-container">
      <animated.div className="curtain" style={styles} />
      <div className="content">
        {/* Nội dung phía sau rèm */}
        <Rocket />
      </div>
    </div>
  );
};

export default Curtain;
