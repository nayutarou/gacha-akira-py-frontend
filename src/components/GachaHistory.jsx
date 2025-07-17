import React from "react";

const GachaHistory = ({ history }) => {
  return (
    <div className="gacha-history-container mt-8 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">ガチャ履歴</h2>
      {history.length === 0 ? (
        <p className="text-gray-800">まだ履歴はありません。</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className={`text-${item.result} text-lg`}>
              <span className="font-semibold">{item.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GachaHistory;
