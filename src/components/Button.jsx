const Button = ({ handleClick, text, className }) => {
  const defaultClassName = "px-8 py-4 text-2xl font-bold text-white transition-all duration-300 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-500 shadow-pink-500/50 hover:scale-105 hover:shadow-xl";
  return (
    <button
      onClick={handleClick}
      className={className || defaultClassName}
    >
      {text}
    </button>
  );
};

export default Button;
