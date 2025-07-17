import React from "react";
import GachaHistory from "../components/GachaHistory";
import { Link } from "react-router-dom";
import { useGacha } from "../GachaContext";

const HistoryPage = () => {
  const { gachaHistory, resetGachaHistory } = useGacha();

  const handleReset = () => {
    resetGachaHistory();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-center bg-blue-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">ガチャ履歴</h1>
      <GachaHistory history={gachaHistory} />
      <button
        onClick={handleReset}
        className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        履歴をリセット
      </button>
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        ガチャページに戻る
      </Link>
    </div>
  );
};

export default HistoryPage;
