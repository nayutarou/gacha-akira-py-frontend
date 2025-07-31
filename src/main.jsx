import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { GachaProvider } from "./GachaContext.jsx";
import "./styles.css";

// Reactアプリケーションのエントリーポイント
ReactDOM.createRoot(document.getElementById("root")).render(
  // 開発時の厳格なチェックを有効にする
  <React.StrictMode>
    {/* ブラウザのURLとReact Routerを同期させる */}
    <BrowserRouter>
      {/* ガチャの状態管理をアプリケーション全体に提供する */}
      <GachaProvider>
        {/* ルーティング設定 */}
        <Routes>
          {/* ルートパス ("/") にAppコンポーネントを割り当てる */}
          <Route path="/" element={<App />} />
          {/* "/history" パスにHistoryPageコンポーネントを割り当てる */}
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </GachaProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
