import React from "react";

// ガチャ履歴を表示するコンポーネント
const GachaHistory = ({ history }) => {
  return (
    <div className="p-4 mt-8 overflow-y-auto bg-white rounded-lg shadow-lg gacha-history-container bg-opacity-20 max-h-60">
      <h2 className="mb-4 text-xl font-bold text-gray-800">ガチャ履歴</h2>
      {history.length === 0 ? ( // 履歴が空の場合
        <p className="text-gray-800">まだ履歴はありません。</p>
      ) : ( // 履歴がある場合
        <ul className="space-y-2">
          {/* 履歴アイテムを新しい順に表示 */}
          {history.map((item, index) => (
            <li key={index} className={`text-${item.result} text-lg`}>
              <span className="font-semibold">{history.length - index}回目: {item.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GachaHistory;
