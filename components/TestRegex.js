import React, { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";

const TestRegex = ({ isChecked }) => {
  const { showToast } = useAlert();

  const [inputRegex, setInputRegex] = useState("");
  const [inputText, setInputText] = useState("");
  function handleRegexLogic(regex) {
    if (inputRegex === "" || !inputText === "") {
      return showToast("error", "Both fields are required");
    }
    let finalRegex;

    if (isChecked) {
      const pattern = regex instanceof RegExp ? regex.source : regex;
      finalRegex = new RegExp(pattern, "i");
    } else {
      finalRegex = regex instanceof RegExp ? regex : new RegExp(regex);
    }
    const result = finalRegex.test(inputText);
    if (result) {
      showToast("success", "Yes, It follows");
    } else {
      showToast("error", "Given text does not follow");
    }
  }
  function handleClearInput() {
    setInputRegex("");
    setInputText("");
  }
  return (
    <>
      <style>{`
    .btnflx {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .opt {
          color: grey;
        }
    `}</style>
      <div className="container mt-4">
        <input
          className="form-control form-control-lg mb-2"
          type="text"
          value={inputRegex}
          onChange={(e) => setInputRegex(e.target.value)}
          placeholder="Enter regex"
          spellCheck={false}
          required
        />
        <input
          className="form-control form-control-lg mb-2"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter sample to test"
          spellCheck={false}
          required
        />

        <div className='btnflx'>
          
          <button
            type="button"
            className="btn btn-outline-primary px-5"
            onClick={() => handleRegexLogic(inputRegex)}
          >
            Test
          </button>
          
          <button
            type="button"
            className="btn btn-outline-primary px-5"
            onClick={handleClearInput}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default TestRegex;
