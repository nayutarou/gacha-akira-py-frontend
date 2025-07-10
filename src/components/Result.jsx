import resultColor from "../libs/resultColor";

const Result = ({ result }) => {
  return (
    <div className="my-4">
      <h1 className="text-5xl font-bold" style={{ color: resultColor(result.result) }}>
        {result.result}
      </h1>
    </div>
  );
};

export default Result;
