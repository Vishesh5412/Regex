import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useAlert } from "../context/AlertContext";
import TestRegex from "../components/TestRegex";
import GenerateRegex from "../components/GenerateRegex";
import { IoSettings } from "react-icons/io5";

const Home = () => {

  const [genRegexPage, setGenRegexPage] = useState(true);
  const [testRegexPage, setTextRegexPage] = useState(false);
  const [isSettingVisible, setIsSettingVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);


  return (
    <>
      <div className={styles.container}>
        <IoSettings
          className={styles.settingIcon}
          onClick={() => setIsSettingVisible(!isSettingVisible)}
        />
        <div className="stpr">
          <button
            className={styles.chgBtn}
            onClick={() => (setGenRegexPage(true), setTextRegexPage(false))}
          >
            Generate
          </button>
          <button
            className={styles.chgBtn}
            onClick={() => (setGenRegexPage(false), setTextRegexPage(true))}
          >
            Test
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        {isSettingVisible && (
          <div className={styles.cseIstt}>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="customSwitch"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                
              />
              <label className="form-check-label" htmlFor="customSwitch">
                Case Insensitive
              </label>
            </div>
          </div>
        )}
        <div className={styles.prtDv}>
          {genRegexPage && <GenerateRegex />}
          {testRegexPage && <TestRegex isChecked={isChecked} />}
        </div>
      </div>
    </>
  );
};

export default Home;
