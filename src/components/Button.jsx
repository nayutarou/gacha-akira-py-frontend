// 再利用可能なボタンコンポーネント
const Button = ({ handleClick, text, className }) => {
  // デフォルトのスタイルクラス
  const defaultClassName = "px-8 py-4 text-2xl font-bold text-white transition-all duration-300 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-500 shadow-pink-500/50 hover:scale-105 hover:shadow-xl";
  return (
    <button
      onClick={handleClick} // クリックイベントハンドラ
      className={className || defaultClassName} // カスタムクラスが指定されていればそれを使用、なければデフォルトクラスを使用
    >
      {text} {/* ボタンに表示するテキスト */}
    </button>
  );
};

export default Button;
