import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import vediothala from './vedio/thala.mp4';
import { FiCopy } from 'react-icons/fi'; // Import the copy icon

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleCopy}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
      <span className="text-gray-500">{text}</span>
    </div>
  );
};

const Meme = () => {
  const { input, result } = useParams();

  const formatInput = (value) => {
    if (typeof value === "number" || typeof value === "string") {
      const formattedInput = value
        .toString()
        .split("")
        .map((char, index) => {
          const separator = index === 0 ? "" : "+";
          return `${separator}${char}`;
        })
        .join("");

      return `${formattedInput} = 7`;
    }

    return value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="mt-4 flex flex-col items-center">
        <p className="text-center">
          {formatInput(input)} Thala for a reason
        </p>
        <video
  src={`https://thalaforareason-tau.vercel.app/static/media/thala.f6b8a66dba4ecf16cb6d.mp4`}
  
  loop
  className="w-64"
  style={{ display: "block" }}
/>
      </div>
    </div>
  );
};

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const inputParam = queryParams.get("input");
    const resultParam = queryParams.get("result");

    if (inputParam) {
      setInput(inputParam);
      handleCheckSum(inputParam, resultParam); // Pass both input and result as parameters
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCheckSum = (input, result) => {
    let sum;

    if (typeof input === "number" || typeof input === "string") {
      const digitSum = input
        .toString()
        .split("")
        .filter((char) => /\d/.test(char))
        .reduce((acc, digit) => acc + parseInt(digit), 0);

      const alphabetCount = input
        .toString()
        .replace(/\s/g, "")
        .split("")
        .filter((char) => /[a-zA-Z]/.test(char))
        .length;

      sum = digitSum + alphabetCount;
    }

    console.log("Input Value:", input);
    console.log("Result:", result);
    console.log("Sum:", sum);

    if (sum === 7) {
      setShowConfetti(true);
      setResult(sum.toString());
    } else {
      setShowConfetti(false);
      setResult("");
    }
  };

  const formatInput = (value) => {
    if (typeof value === "number" || typeof value === "string") {
      const formattedInput = value
        .toString()
        .split("")
        .map((char, index) => {
          const separator = index === 0 ? "" : "+";
          return `${separator}${char}`;
        })
        .join("");

      return `${formattedInput} = 7`;
    }

    return value;
  };

  const handleShare = () => {
    const uniqueUrl = `https://thalaforareason-tau.vercel.app/${input}/${result}`;
    console.log("Share this URL:", uniqueUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Thala for a reason</h1>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your input"
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={() => handleCheckSum(input, result)}
        >
          Check
        </button>
        {showConfetti && (
          <CopyButton text={`https://thalaforareason-tau.vercel.app/meme/${encodeURIComponent(input)}/${result}`} />
        )}
        {showConfetti && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-center">
              {formatInput(input)} Thala for a reason
            </p>
            <video
              src={vediothala}
              autoPlay
              loop
              className="w-64"
              style={{ display: "block" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/meme/:input/:result" element={<Meme />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
