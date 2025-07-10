
const Button = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-lg shadow-purple-500/50 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      ガチャを引く
    </button>
  );
};

export default Button;
