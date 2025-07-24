import React from "react";

const colors = {
  A: "#FFD700", // Gold
  B: "#C0C0C0", // Silver
  C: "#4CAF50", // Green
  D: "#2196F3", // Blue
  X: "#9E9E9E", // Grey
};

const Result = ({ result, small }) => {
  const containerClasses = small ? "w-24 h-24 mx-1 my-1" : "my-4 flex flex-col items-center justify-center w-3/4 max-w-lg";
  const innerDivClasses = small ? "p-4" : "p-12";
  const h1Classes = small ? "text-4xl" : (result.result === "ガチャを引きましょう" ? "text-4xl" : "text-9xl");

  const shadowColor = colors[result.result];
  const textColor = colors[result.result];

  return (
    <div className={`${containerClasses} flex flex-col items-center justify-center`} data-testid="result-container">
      <div
        className={`relative rounded-full flex flex-col items-center justify-center animate-fadeInScale transform transition-all duration-500 hover:scale-105 w-full h-full ${innerDivClasses}`}
        style={{
          boxShadow: `0 0 30px ${shadowColor}`,
        }}
      >
        <h1
          className={`${h1Classes} font-extrabold`}
          style={result.result !== "ガチャを引きましょう" ? { textShadow: `0 0 30px ${shadowColor}`, color: textColor } : { color: "#fff" }}
        >
          {result.result}
        </h1>
      </div>
    </div>
  );
};

export default Result;
