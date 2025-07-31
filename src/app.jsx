import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import { useGacha } from "./GachaContext";
import { Link } from "react-router-dom";
import GachaCounts from "./components/GachaCounts";
import TenPullDisplay from "./components/TenPullDisplay";
import { fetchGachaResult, fetchTenGachaResults } from "./api";

// メインアプリケーションコンポーネント
function App() {
  // GachaContextからガチャ関連の状態と関数を取得
  const { addGachaResult, resultCounts, resetGachaHistory } = useGacha();

  // 単発ガチャの結果を保持するstate
  const [singleResult, setSingleResult] = useState(null);
  // 10連ガチャの結果を保持するstate
  const [tenPullResults, setTenPullResults] = useState([]);
  // 10連ガチャが実行されたかどうかを判定するstate
  const [isTenPull, setIsTenPull] = useState(false);

  // 単発ガチャボタンがクリックされたときの処理
  const handleSingleGachaClick = async () => {
    setIsTenPull(false); // 表示を単発ガチャ結果に切り替え
    try {
      // APIからガチャ結果を1つ取得
      const data = await fetchGachaResult();
      // 取得した結果をstateにセット
      setSingleResult(data);
      // ガチャ履歴に結果を追加
      addGachaResult(data);
    } catch (error) {
      // エラーが発生した場合はコンソールに出力
      console.error("Failed to fetch gacha result:", error);
    }
  };

  // 10連ガチャボタンがクリックされたときの処理
  const handleTenPullGachaClick = async () => {
    setIsTenPull(true); // 表示を10連ガチャ結果に切り替え
    try {
      // APIからガチャ結果を10個取得
      const results = await fetchTenGachaResults();
      // 取得した結果をstateにセット
      setTenPullResults(results);
      // ガチャ履歴にすべての結果を追加
      results.forEach(addGachaResult);
    } catch (error) {
      // エラーが発生した場合はコンソールに出力
      console.error("Failed to fetch gacha result:", error);
    }
  };

  // リセットボタンがクリックされたときの処理
  const handleReset = () => {
    // ガチャの履歴と統計をリセット
    resetGachaHistory();
    // 表示されているガチャ結果もリセット
    setSingleResult(null);
    setTenPullResults([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center gacha-main-background">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* isTenPullの値に応じて、10連結果か単発結果かを表示し分ける */}
        {isTenPull ? (
          <TenPullDisplay results={tenPullResults} />
        ) : (
          <Result result={singleResult} />
        )}
        <div className="flex justify-center mt-4 space-x-4">
          {/* ガチャ実行ボタン */}
          <Button handleClick={handleSingleGachaClick} text="ガチャを引く" />
          <Button handleClick={handleTenPullGachaClick} text="10連ガチャを引く" />
        </div>
        {/* ガチャの統計情報を表示するコンポーネント */}
        <GachaCounts resultCounts={resultCounts} />
        <div className="flex items-center justify-center mt-4 space-x-4">
          {/* 履歴ページへのリンク */}
          <Link to="/history" className="px-4 py-2 text-sm text-gray-800 transition-colors bg-gray-300 rounded-md hover:bg-gray-400">
            履歴を見る
          </Link>
          {/* リセットボタン */}
          <Button handleClick={handleReset} text="リセット" className="px-4 py-2 text-sm text-white transition-colors bg-red-500 rounded-md cursor-pointer hover:bg-red-600" />
        </div>
      </div>
    </div>
  );
}

export default App;
