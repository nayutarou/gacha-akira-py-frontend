import React from "react";

const GachaCounts = ({ resultCounts }) => {
  return (
    <div className="gacha-counts-container mt-4 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">結果別回数:</h3>
      <ul className="flex justify-center space-x-4 text-gray-800">
        {Object.entries(resultCounts).map(([key, value]) => (
          <li key={key} className={`text-${key}`}>
            {key}: {value}回
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GachaCounts;
