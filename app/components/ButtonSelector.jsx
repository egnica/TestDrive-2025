"use client";
import React from "react";
import styles from "./page.module.css";
import { useState } from "react";
const ButtonSelector = ({ sendDataToParent }) => {
  const [btnSelect, setBtnSelect] = useState("");

  const handleClick = (num) => {
    setBtnSelect(num);
    sendDataToParent(num);
  };

  return (
    <>
      <div className={styles.btnRow}>
        <div
          onClick={() => {
            handleClick(0);
          }}
          className={styles.btn}
        >
          Banks
        </div>
        <div
          className={styles.btn}
          onClick={() => {
            handleClick(1);
          }}
        >
          Category
        </div>
        <div
          className={styles.btn}
          onClick={() => {
            handleClick(2);
          }}
        >
          Compare
        </div>
      </div>
    </>
  );
};

export default ButtonSelector;
