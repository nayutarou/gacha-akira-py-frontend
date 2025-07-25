import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import { useGacha } from "./GachaContext";
import { Link } from "react-router-dom";
import GachaCounts from "./components/GachaCounts";

import TenPullDisplay from "./components/TenPullDisplay";

const GACHA_API_URL = "http://127.0.0.1:8000/gacha";

function App() {
  const { addGachaResult, resultCounts, resetGachaHistory } = useGacha();
  const [singleResult, setSingleResult] = useState({ result: "" });
  const [tenPullResults, setTenPullResults] = useState([]);
  const [isTenPull, setIsTenPull] = useState(false);

  const rarityTexts = {
    A: "SSR",
    B: "SR",
    C: "R",
    D: "N",
  };

  const getDisplayResult = () => {
    if (singleResult.result === "") {
      return { result: "ガチャを引きましょう" };
    } else {
      return singleResult;
    }
  };

  const handleSingleGachaClick = async () => {
    setIsTenPull(false);
    try {
      const response = await fetch(GACHA_API_URL);
      const data = await response.json();
      setSingleResult(data);
      addGachaResult(data);
    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
    }
  };

  const handleTenPullGachaClick = async () => {
    setIsTenPull(true);
    const results = [];
    try {
      for (let i = 0; i < 10; i++) {
        const response = await fetch(GACHA_API_URL);
        const data = await response.json();
        results.push(data);
        addGachaResult(data);
      }
      setTenPullResults(results);
    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
    }
  };

  const handleReset = () => {
    resetGachaHistory();
    setSingleResult({ result: "" });
    setTenPullResults([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center gacha-main-background">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {isTenPull ? (
          <TenPullDisplay results={tenPullResults} rarityTexts={rarityTexts} />
        ) : (
          <Result result={getDisplayResult()} />
        )}
        <div className="flex justify-center mt-4 space-x-4">
          <Button handleClick={handleSingleGachaClick} text="ガチャを引く" />
          <Button handleClick={handleTenPullGachaClick} text="10連ガチャを引く" />
        </div>
        <GachaCounts resultCounts={resultCounts} />
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Link to="/history" className="px-4 py-2 text-sm text-gray-800 transition-colors bg-gray-300 rounded-md hover:bg-gray-400">
            履歴を見る
          </Link>
          <Button handleClick={handleReset} text="リセット" className="px-4 py-2 text-sm text-white transition-colors bg-red-500 rounded-md cursor-pointer hover:bg-red-600" />
        </div>
      </div>
    </div>
  );
}

export default App;
