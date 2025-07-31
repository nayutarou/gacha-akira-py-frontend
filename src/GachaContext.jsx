import React, { createContext, useContext, useState } from "react";

// ガチャの状態を管理するためのReact Contextを作成
const GachaContext = createContext();

// Contextを使いやすくするためのカスタムフック
export const useGacha = () => useContext(GachaContext);

// アプリケーション全体にガチャの状態を提供するProviderコンポーネント
export const GachaProvider = ({ children }) => {
  // ガチャの履歴を保持するstate
  const [gachaHistory, setGachaHistory] = useState([]);
  // レアリティごとの排出数を保持するstate
  const [resultCounts, setResultCounts] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  // 新しいガチャ結果を履歴と統計に追加する関数
  const addGachaResult = (newResult) => {
    // 履歴の配列の先頭に新しい結果を追加
    setGachaHistory((prevHistory) => [newResult, ...prevHistory]);
    // 排出数のカウントを更新
    setResultCounts((prevCounts) => ({
      ...prevCounts,
      [newResult.result]: prevCounts[newResult.result] + 1,
    }));
  };

  // ガチャの履歴と統計をリセットする関数
  const resetGachaHistory = () => {
    setGachaHistory([]);
    setResultCounts({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    });
  };

  // Contextを通じて、ガチャの状態と更新関数を配下のコンポーネントに提供
  return (
    <GachaContext.Provider value={{ gachaHistory, resultCounts, addGachaResult, resetGachaHistory }}>
      {children}
    </GachaContext.Provider>
  );
};
