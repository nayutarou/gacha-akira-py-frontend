import React from "react";

// ガチャの排出統計を表示するコンポーネント
const GachaCounts = ({ resultCounts }) => {
  // 全てのレアリティの合計排出数を計算
  const totalCount = Object.values(resultCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="gacha-counts-container mt-4 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">ガチャ統計</h3>
      <div className="text-gray-800 mb-4">
        <span className="font-semibold">総実行回数:</span> {totalCount}回
      </div>
      <h4 className="text-md font-semibold text-gray-800 mb-2">排出率:</h4>
      {totalCount > 0 ? ( // ガチャが1回以上実行されていれば排出率を表示
        <ul className="flex justify-center space-x-4 text-gray-800">
          {/* 各レアリティの排出率と回数を表示 */}
          {Object.entries(resultCounts).map(([key, value]) => (
            <li key={key} className={`text-${key}`}>
              {key}: {((value / totalCount) * 100).toFixed(2)}% ({value}回)
            </li>
          ))}
        </ul>
      ) : ( // ガチャがまだ実行されていなければメッセージを表示
        <p className="text-gray-800">まだガチャが実行されていません。</p>
      )}
    </div>
  );
};

export default GachaCounts;
