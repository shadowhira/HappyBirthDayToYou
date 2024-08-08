const randomPosition = () => {
  const searchBarHeight = 50;
  const x = Math.floor(Math.random() * (window.innerWidth - 50));
  const y = Math.floor(Math.random() * (window.innerHeight - searchBarHeight - 50));
  return { x, y };
};

export default randomPosition;
