import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import Firework from "./components/Firework";

function App() {
  const [result, setResult] = useState({ result: "X" });
  const [fireworks, setFireworks] = useState([]);

  const getResultColor = (resultValue) => {
    switch (resultValue) {
    case "A":
      return "#ff00ff";
    case "B":
      return "#ffd700";
    case "C":
      return "#ff0000";
    case "D":
      return "#0000ff";
    default:
      return "#ffffff";
    }
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/gacha");
      const data = await response.json();
      console.log(data);
      setResult(data);

      const newFirework = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 40 + 10, // 10% to 50% of screen height
        color: getResultColor(data.result), // カラーコードを直接渡す
      };
      setFireworks((prev) => [...prev, newFirework]);

      // Remove the firework after animation
      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 2000);
    } catch (error) {
      console.error("Failed to fetch gacha result:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden text-center bg-gray-900">
      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
      ))}
      <div>
        <Result result={result} />
        <Button handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
