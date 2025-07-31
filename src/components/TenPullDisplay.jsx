import React from "react";
import Result from "./Result";

// 10連ガチャの結果をグリッド表示するコンポーネント
const TenPullDisplay = ({ results }) => {
  return (
    <div className="grid grid-cols-5 gap-2 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg max-w-4xl mx-auto my-4">
      {/* 各ガチャ結果をResultコンポーネントで表示 */}
      {results.map((result, index) => (
        <Result
          key={index} // 各結果にユニークなキーを設定
          result={result} // ガチャ結果データを渡す
          small={true} // 小さい表示モードを有効にする
        />
      ))}
    </div>
  );
};

export default TenPullDisplay;
