import { useState } from "react";

const MCQBlock = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  return (
    <div className="text-content p-8 border border-rim-strong bg-deep my-2 md:m-8  rounded-lg">
      <div className="text-xl mb-2">{props.question}</div>
      <div className="p-2">
        {props.options.map((option) => (
          <div className="flex gap-3 my-2 items-center">
            <input
              type="checkbox"
              id={option}
              className=" accent-deep border border-rim rounded-xs h-5.5 aspect-square"
            />
            <div>
              <label htmlFor={option}>{option}</label>
            </div>
          </div>
        ))}
      </div>
      {(showAnswer || props.type === "pdf") && (
        <div className="w-full border border-rim rounded-lg px-6 py-3 bg-surface mb-5">
          {props.answer}
        </div>
      )}
      {props.type !== "pdf" && (
        <div className="ml-auto">
          <button
            onClick={toggleAnswer}
            className="px-4 py-2 border border-rim-strong rounded-lg text-content bg-raised hover:bg-surface"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MCQBlock;
