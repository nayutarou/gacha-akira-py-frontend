import React from "react";
import Result from "./Result";

const TenPullDisplay = ({ results, rarityTexts }) => {
  return (
    <div className="grid grid-cols-5 gap-2 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg max-w-4xl mx-auto my-4">
      {results.map((result, index) => (
        <Result
          key={index}
          result={result}
          small={true}
        />
      ))}
    </div>
  );
};

export default TenPullDisplay;
