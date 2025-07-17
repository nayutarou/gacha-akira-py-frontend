import React, { createContext, useContext, useState } from "react";

const GachaContext = createContext();

export const useGacha = () => useContext(GachaContext);

export const GachaProvider = ({ children }) => {
  const [gachaHistory, setGachaHistory] = useState([]);
  const [resultCounts, setResultCounts] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  const addGachaResult = (newResult) => {
    setGachaHistory((prevHistory) => [newResult, ...prevHistory]);
    setResultCounts((prevCounts) => ({
      ...prevCounts,
      [newResult.result]: prevCounts[newResult.result] + 1,
    }));
  };

  const resetGachaHistory = () => {
    setGachaHistory([]);
    setResultCounts({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    });
  };

  return (
    <GachaContext.Provider value={{ gachaHistory, resultCounts, addGachaResult, resetGachaHistory }}>
      {children}
    </GachaContext.Provider>
  );
};
