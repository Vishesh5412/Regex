import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import { useAlert } from "../context/AlertContext";
import { useLoading } from "../context/LoadingContext";

const GenerateRegex = () => {
  const { showToast } = useAlert();
  const { setProgress } = useLoading();

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState("");

  const handleResultCopy = () => {
    if (result === "") return;

    const textToCopy = result;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => showToast("success", "Text copied to clipboard!"))
      .catch((err) => console.error("Error copying text:", err));
  };

  async function handleRegexGeneration(e) {
    e.preventDefault();
    setResult("");
    if (!prompt) {
      showToast("error", "Enter Prompt");
      return;
    }
    setProgress(30);
    let response = await fetch("/api/regexRace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    setProgress(60);
    if (!response.ok) {
      showToast("error", "Please try again");
      setProgress(100);
    }
    const data = await response.json();
    if (data.result === "error") {
      setProgress(100);
      setPrompt("");
      return showToast("error", "Please enter valid prompt");
    }
    setResult(data.result);
    setProgress(100);
  }

  return (
    <>
      <style jsx>{`
        .btnflx {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .opt {
          color: grey;
        }
      `}</style>
      <div className="container mt-3">
        <div className="mb-2">
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="5"
            placeholder="Enter Prompt here for regex"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            spellCheck={false}
            required
          ></textarea>
        </div>
        <div className="btnflx">
          <button
            type="submit"
            className="btn btn-outline-primary px-5"
            onClick={handleRegexGeneration}
          >
            Generate
          </button>

          <button
            type="submit"
            className="btn btn-outline-primary px-5"
            onClick={() => (setPrompt(""), setResult(""))}
          >
            Clear
          </button>
        </div>
        <br /> <br />
        {result && (
          <div className="btnflx">
            <h4 className="opt">Output</h4>

            <button className="btn ">
              <IoCopyOutline onClick={handleResultCopy} />
            </button>
          </div>
        )}
        <br />
        <h4>{result}</h4>
      </div>
    </>
  );
};

export default GenerateRegex;
