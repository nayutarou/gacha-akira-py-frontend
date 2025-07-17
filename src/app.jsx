import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import { useGacha } from "./GachaContext";
import { Link } from "react-router-dom";
import GachaCounts from "./components/GachaCounts";

function App() {
  const { addGachaResult, resultCounts } = useGacha();
  const [result, setResult] = useState({ result: "X" });
  const [displayMessage, setDisplayMessage] = useState("");

  const rarityTexts = {
    A: "SSR",
    B: "SR",
    C: "R",
    D: "N",
    X: "ハズレ",
  };

  const handleClick = async () => {
    setDisplayMessage(""); // Clear previous message
    try {
      const response = await fetch("http://127.0.0.1:8000/gacha");
      const data = await response.json();
      console.log(data);
      setResult(data);
      setDisplayMessage("Congratulation!"); // Set message after result
      addGachaResult(data);

    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
      setDisplayMessage("Error!"); // Set error message
    }
  };

  const handleClickTen = async () => {
    setDisplayMessage(""); // Clear previous message
    try {
      let lastResult = { result: "X" };
      for (let i = 0; i < 10; i++) {
        const response = await fetch("http://127.0.0.1:8000/gacha");
        const data = await response.json();
        console.log(data);
        lastResult = data;
        addGachaResult(data);
      }
      setResult(lastResult);
      setDisplayMessage("Congratulation! (10連)"); // Set message after 10 pulls

    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
      setDisplayMessage("Error! (10連)"); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden text-center gacha-main-background">
      <div className="flex flex-col items-center w-full h-full justify-center">
        <Result result={result} rarityText={rarityTexts[result.result]} />
        {displayMessage && (
          <p className="mt-4 text-white text-4xl font-bold animate-pulse">
            {displayMessage}
          </p>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <Button handleClick={handleClick} text="ガチャを引く" />
          <Button handleClick={handleClickTen} text="10連ガチャを引く" />
          <Button handleClick={handleClick} text="もう一度引く" />
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
