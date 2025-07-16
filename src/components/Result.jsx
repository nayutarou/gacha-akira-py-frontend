const Result = ({ result }) => {
  const resultClassName = `result-${result.result}`;

  return (
    <div className="flex items-center justify-center my-4">
      <div
        className={`relative p-8 rounded-full flex items-center justify-center bg-amber-200 animate-gachaResult bg-gradient-to-r from-${resultClassName} to-${resultClassName}/50 shadow-lg shadow-${resultClassName}/50`}
      >
        <h1
          className={"text-8xl font-extrabold text-white text-shadow-lg"}
          style={{ textShadow: `0 0 20px var(--tw-colors-${resultClassName})` }}
        >
          {result.result}
        </h1>
      </div>
    </div>
  );
};

export default Result;
