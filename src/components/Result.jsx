import React from "react";

const Result = ({ result, rarityText, small }) => {
  const resultColorClass = `bg-${result.result} shadow-${result.result}/50`;

  const containerClasses = small ? "w-24 h-24 mx-1 my-1" : "my-4 flex flex-col items-center justify-center w-3/4 max-w-lg";
  const innerDivClasses = small ? "p-4" : "p-12";
  const h1Classes = small ? "text-4xl" : (result.result === "ガチャを引きましょう" ? "text-4xl" : "text-9xl");
  const pClasses = small ? "text-sm" : "text-2xl";

  return (
    <div className={`${containerClasses} flex flex-col items-center justify-center`} data-testid="result-container">
      <div
        className={`relative rounded-full flex flex-col items-center justify-center animate-fadeInScale ${resultColorClass} transform transition-all duration-500 hover:scale-105 w-full h-full ${innerDivClasses}`}
      >
        <h1
          className={`${h1Classes} font-extrabold text-gray-800`}
          style={result.result !== "ガチャを引きましょう" ? { textShadow: `0 0 30px var(--tw-colors-${result.result})` } : {}}
        >
          {result.result}
        </h1>
        {rarityText && (
          <p className={`${pClasses} mt-2 text-gray-800 font-bold`}>
            {rarityText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;
