import React from "react";

const GachaCounts = ({ resultCounts }) => {
  const totalCount = Object.values(resultCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="gacha-counts-container mt-4 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">ガチャ統計</h3>
      <div className="text-gray-800 mb-4">
        <span className="font-semibold">総実行回数:</span> {totalCount}回
      </div>
      <h4 className="text-md font-semibold text-gray-800 mb-2">排出率:</h4>
      {totalCount > 0 ? (
        <ul className="flex justify-center space-x-4 text-gray-800">
          {Object.entries(resultCounts).map(([key, value]) => (
            <li key={key} className={`text-${key}`}>
              {key}: {((value / totalCount) * 100).toFixed(2)}% ({value}回)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">まだガチャが実行されていません。</p>
      )}
    </div>
  );
};

export default GachaCounts;
