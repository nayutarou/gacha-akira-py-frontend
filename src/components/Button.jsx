
const Button = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
    >
      ガチャを引く
    </button>
  );
};

export default Button;
