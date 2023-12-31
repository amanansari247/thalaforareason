import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import vediothala from './vedio/thala.mp4';
import { FiCopy } from 'react-icons/fi'; // Import the copy icon
import moyemoye from './vedio/download.jpg'
import moyemoyeaudio from './vedio/moye-moye.mp3'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const textWithoutSpaces = text.replace(/\s/g, ""); // Remove spaces
    navigator.clipboard.writeText(textWithoutSpaces);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    toast("Share With Your Friends!!🎉");
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

      return `${formattedInput} = 7 `;
    }

    return value;
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="text-3xl font-bold mb-8 text-blue-500">
          {formatInput(input)}  Thala for a reason
        </p>
        <div className="relative">
          <video
            src={`https://thalaforareason-tau.vercel.app/static/media/thala.f6b8a66dba4ecf16cb6d.mp4`}
            controls
            loop
            className="w-64 mx-auto"
            style={{ display: "block" }}
          />
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            <Link to="/">Thala is the reason || Click And Have Fun !!</Link>
          </button>
        </div>
      </div>
     
    </div>
  );
};
const Footer = () => {
  return(
    <div className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white ">
      Made With 💓 by Aman Hussain
    </div>
  )


}
const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonclicked, setbuttonclicked] = useState(false);

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
    if(input === 'thala' || input==='Thala' ||  input==='THALA' ){
         sum = 7;
      }

    else if (typeof input === "number" || typeof input === "string") {
      
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
    setbuttonclicked(true)
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

      return `${formattedInput}`;
    }

    return value;
  };

  const handleShare = () => {
    const uniqueUrl = `https://thalaforareason-tau.vercel.app/${input}/${result}`;
    console.log("Share this URL:", uniqueUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-500">👋Hey!! </h1>
        <h1 className="text-3xl font-bold mb-4 text-blue-500">Thala for a reason </h1>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your input"
          value={input}
          onChange={handleInputChange}
          required
        />
        <button
          className={`bg-${!input.trim() ? 'gray-400' : 'blue-500'} text-white px-4 py-2 rounded mr-4 mb-4`}
          onClick={() => handleCheckSum(input, result)}
          disabled={!input.trim()}  // Disable the button when input is empty or contains only spaces
        >
          Check
        </button>

        {showConfetti && (
          <CopyButton className="mt-4" text={`https://thalaforareason-tau.vercel.app/meme/${encodeURIComponent(input)}/${result}`} />
        )}
        {showConfetti && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-center text-lg text-gray-800 text-3xl font-bold ">
              {formatInput(input)} = 7 Thala for a reason
            </p>
            <video
              src={vediothala}
              autoPlay
              loop
              className="w-64 mt-4"
              style={{ display: "block" }}
            />
          </div>
        )}
        {buttonclicked && !showConfetti && (
          <>
           <p className="text-center text-lg text-gray-800 text-3xl font-bold ">
              {formatInput(input)} ≠ 7 Thala is not a reason
            </p>
          <img
            src={moyemoye} // Replace with the actual path
            alt="Confetti Image"
            className="w-64 mx-auto mb-4 mt-4"
          />
            <audio
              src={moyemoyeaudio} // Replace with the actual path
              autoPlay

            /></>
        )}
      </div>
      <ToastContainer />
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
      <Footer />
    </Router>
  );
};

export default App;
