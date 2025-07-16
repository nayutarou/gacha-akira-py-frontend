
import { useState } from "react";

const Button = ({ handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleInternalClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // アニメーションの持続時間
    handleClick();
  };

  return (
    <button
      onClick={handleInternalClick}
      className={`gacha-button px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg shadow-blue-400/50 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 ${isClicked ? 'gacha-button-clicked' : ''}`}
    >
      ガチャを引く
    </button>
  );
};

export default Button;
