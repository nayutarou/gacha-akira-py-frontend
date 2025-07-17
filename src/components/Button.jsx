const Button = ({ handleClick, text }) => {
  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-lg shadow-pink-500/50 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      {text}
    </button>
  );
};

export default Button;
