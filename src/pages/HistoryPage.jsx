import React from "react";
import GachaHistory from "../components/GachaHistory";
import { Link } from "react-router-dom";
import { useGacha } from "../GachaContext";

// ガチャ履歴ページコンポーネント
const HistoryPage = () => {
  // GachaContextから履歴データとリセット関数を取得
  const { gachaHistory, resetGachaHistory } = useGacha();

  // 履歴リセットボタンがクリックされたときの処理
  const handleReset = () => {
    resetGachaHistory();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-center bg-blue-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">ガチャ履歴</h1>
      {/* ガチャ履歴リストを表示するコンポーネント */}
      <GachaHistory history={gachaHistory} />
      {/* 履歴をリセットするボタン */}
      <button
        onClick={handleReset}
        className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        履歴をリセット
      </button>
      {/* メインのガチャページに戻るリンク */}
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        ガチャページに戻る
      </Link>
    </div>
  );
};

export default HistoryPage;