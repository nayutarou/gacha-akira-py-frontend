import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { GachaProvider } from "./GachaContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GachaProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </GachaProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
