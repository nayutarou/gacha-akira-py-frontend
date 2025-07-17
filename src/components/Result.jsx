import React from "react";

const Result = ({ result, rarityText }) => {
  const resultColorClass = `from-${result.result} to-${result.result}/50 shadow-${result.result}/50`;

  return (
    <div className="my-4 flex flex-col items-center justify-center w-3/4 max-w-lg">
      <div
        className={`relative p-12 rounded-full flex flex-col items-center justify-center animate-fadeInScale bg-gradient-to-r ${resultColorClass} transform transition-all duration-500 hover:scale-105 w-full`}
      >
        <h1
          className={"text-9xl font-extrabold text-white text-shadow-lg"}
          style={{ textShadow: `0 0 30px var(--tw-colors-${result.result})` }}
        >
          {result.result}
        </h1>
        {rarityText && (
          <p className="mt-2 text-white text-2xl font-bold">
            {rarityText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;
