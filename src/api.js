import { GACHA_API_URL } from "./constants";

// 単発ガチャの結果をAPIから取得する関数
export const fetchGachaResult = async () => {
  // ガチャAPIエンドポイントにリクエストを送信
  const response = await fetch(GACHA_API_URL);
  // レスポンスが正常でなければエラーをスロー
  if (!response.ok) {
    throw new Error("Failed to fetch gacha result");
  }
  // レスポンスをJSON形式でパースして返す
  return response.json();
};

// 10連ガチャの結果をAPIから取得する関数
export const fetchTenGachaResults = async () => {
  const results = [];
  // 10回ガチャAPIを呼び出し、結果を配列に格納
  for (let i = 0; i < 10; i++) {
    const result = await fetchGachaResult();
    results.push(result);
  }
  // 10回分の結果を返す
  return results;
};