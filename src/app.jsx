import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";
import Firework from "./components/Firework";
import resultColor from "./libs/resultColor";

function App() {
  const [result, setResult] = useState({ result: "X" });
  const [fireworks, setFireworks] = useState([]);

  const handleClick = async () => {
    const response = await fetch("http://localhost:3000/gacha");
    const data = await response.json();
    console.log(data);
    setResult(data);

    const newFirework = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 40 + 10, // 10% to 50% of screen height
      color: resultColor(data.result), // カラーコードを直接渡す
    };
    setFireworks((prev) => [...prev, newFirework]);

    // Remove the firework after animation
    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen text-center overflow-hidden bg-gray-900">
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
