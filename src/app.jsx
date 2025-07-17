import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import { useGacha } from "./GachaContext";
import { Link } from "react-router-dom";
import GachaCounts from "./components/GachaCounts";

import TenPullDisplay from "./components/TenPullDisplay";

function App() {
  const { addGachaResult, resultCounts } = useGacha();
  const [singleResult, setSingleResult] = useState({ result: "X" });
  const [tenPullResults, setTenPullResults] = useState([]);
  const [isTenPull, setIsTenPull] = useState(false);

  const rarityTexts = {
    A: "SSR",
    B: "SR",
    C: "R",
    D: "N",
    X: "ハズレ",
  };

  const handleClick = async () => {
    setIsTenPull(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/gacha");
      const data = await response.json();
      console.log(data);
      setSingleResult(data);
      addGachaResult(data);
    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
    }
  };

  const handleClickTen = async () => {
    setIsTenPull(true);
    const results = [];
    try {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("http://127.0.0.1:8000/gacha");
        const data = await response.json();
        console.log(data);
        results.push(data);
        addGachaResult(data);
      }
      setTenPullResults(results);
    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center gacha-main-background">
      <div className="flex flex-col items-center w-full h-full justify-center">
        {isTenPull ? (
          <TenPullDisplay results={tenPullResults} rarityTexts={rarityTexts} />
        ) : (
          <Result result={singleResult} rarityText={rarityTexts[singleResult.result]} />
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <Button handleClick={handleClick} text="ガチャを引く" />
          <Button handleClick={handleClickTen} text="10連ガチャを引く" />
        </div>
        <GachaCounts resultCounts={resultCounts} />
        <Link to="/history" className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
          履歴を見る
        </Link>
      </div>
    </div>
  );
}

export default App;
