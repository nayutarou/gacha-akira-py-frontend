import React from "react";

// レアリティごとの色定義
const colors = {
  A: "#FFD700", // Gold
  B: "#C0C0C0", // Silver
  C: "#4CAF50", // Green
  D: "#2196F3", // Blue
  X: "#9E9E9E", // Grey (デフォルト色やエラー時の色など)
};

// ガチャ結果を表示するコンポーネント
const Result = ({ result, small }) => {
  // 表示する結果テキストを決定。結果がない場合はデフォルトメッセージを表示
  const displayResult = result && result.result ? result.result : "ガチャを引きましょう";

  // コンテナのクラスをsmallプロップに基づいて決定
  const containerClasses = small ? "w-24 h-24 mx-1 my-1" : "my-4 flex flex-col items-center justify-center w-3/4 max-w-lg";
  // 内部divのパディングクラスをsmallプロップに基づいて決定
  const innerDivClasses = small ? "p-4" : "p-12";
  // h1タグのフォントサイズクラスをsmallプロップと表示結果に基づいて決定
  const h1Classes = small ? "text-4xl" : (displayResult === "ガチャを引きましょう" ? "text-4xl" : "text-9xl");

  // 結果のレアリティに基づいて影と文字色を決定
  const shadowColor = colors[result?.result];
  const textColor = colors[result?.result];

  return (
    <div className={`${containerClasses} flex flex-col items-center justify-center`} data-testid="result-container">
      <div
        className={`relative rounded-full flex flex-col items-center justify-center animate-fadeInScale transform transition-all duration-500 hover:scale-105 w-full h-full ${innerDivClasses}`}
        style={{
          boxShadow: `0 0 30px ${shadowColor}`, // レアリティに応じた影の色
        }}
      >
        <h1
          className={`${h1Classes} font-extrabold`}
          // デフォルトメッセージ以外の場合に影と文字色を適用
          style={displayResult !== "ガチャを引きましょう" ? { textShadow: `0 0 30px ${shadowColor}`, color: textColor } : { color: "#fff" }}
        >
          {displayResult} {/* 実際のガチャ結果またはデフォルトメッセージ */}
        </h1>
      </div>
    </div>
  );
};

export default Result;
