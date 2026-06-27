import { useRef, useState } from "react";

const CodeBlock = (props) => {
  const code = useRef();
  const [isCopied, setIsCopied] = useState();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.current.innerText);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="text-content p-6 pt-3 border border-rim-strong rounded-xl my-2 md:m-8 px-8 bg-deep">
      <div className="flex justify-between py-4 mb-6 border-b border-rim">
        <div className="cursor-pointer bg-surface rounded-lg px-6 py-2 flex items-center">
          {props.language}
        </div>
        <button
          onClick={copyToClipboard}
          className="cursor-pointer bg-surface rounded-lg p-2 aspect-square flex justify-center items-center w-[5%]"
        >
          {isCopied ? (
            <i class="fa-solid fa-copy"></i>
          ) : (
            <i class="fa-regular fa-copy"></i>
          )}
        </button>
      </div>
      <div className="p-2 wrap-break-word min-w-0">
        <pre className="whitespace-pre-wrap">
          <code ref={code}>{props.text}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
