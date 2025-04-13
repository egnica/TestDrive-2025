"use client";
import React from "react";
import { useState } from "react";
import Table from "../compare-comp/Table";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Image from "next/image";

import BankObject from "../../../banks.json";
const Compare = () => {
  const [desktop, setDesktop] = useState(null);
  const [categorySelect, setCategorySelect] = useState(null);
  const [bankArray, setBankArray] = useState(null);
  const [features, setFeatures] = useState(null);

  const desktopFilter = Object.values(BankObject.key_Data).filter((item) =>
    desktop === "desk" ? item.desktop === true : item.desktop === false
  );
  const editName = (string) => {
    const stringArray = string.split(" ").splice(1).join(" ");
    return stringArray;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedBanks = [];
    const formData = new FormData(event.target);

    formData.forEach((_, key) => {
      selectedBanks.push(key);
    });

    setBankArray(selectedBanks);

    let newFeatures = [];

    selectedBanks.forEach((bank) => {
      const bankReturn = Object.values(BankObject.bank_layout).find(
        (item) => bank === item.bank_name
      );

      const categorySelectObject = Object.values(bankReturn.categorys).find(
        (item) => categorySelect === item.name
      );

      newFeatures.push(categorySelectObject.features);
    });

    setFeatures((prev) => [...(prev || []), ...newFeatures]);
  };

  const startOver = () => {
    setDesktop(null);
    setCategorySelect(null);
    setBankArray(null);
  };
  const backButton = (input) => {
    if (desktop) {
      setCategorySelect(null);
      setBankArray(null);
      setFeatures(null);
      setDesktop(input);
    }
  };

  return (
    <>
      {!desktop && (
        <>
          <h2 style={{ textAlign: "center" }}>
            Which platform would you like to analyze?
          </h2>
          <div className={styles.analyzeContain}>
            <div className={styles.btnComp} onClick={() => setDesktop("desk")}>
              DESKTOP
            </div>
            <div
              className={styles.btnComp}
              onClick={() => setDesktop("mobile")}
            >
              MOBILE
            </div>
          </div>
        </>
      )}
      {desktop && (
        <div>
          <button onClick={startOver}>Start Over</button>
          <div onClick={() => backButton(desktop)}>Back</div>
        </div>
      )}
      <div>
        {!categorySelect && desktop && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Which set of features would you like to review? Select chapter.
            </h2>
            <div className={styles.chapSelect}>
              {Object.values(desktopFilter).map((category, index) => {
                return (
                  <div
                    className={styles.chapSelectBtn}
                    key={index}
                    onClick={() => {
                      setCategorySelect(category.name);
                    }}
                  >
                    {editName(category.name)}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {categorySelect && (
        <>
          <hr />
          <div>
            <h2 style={{ textAlign: "center" }}>Select up to 6 banks</h2>
            <form style={{ display: "grid" }} onSubmit={submitHandler}>
              <div className={styles.formContain}>
                {Object.values(BankObject.bank_layout).map(
                  ({ bank_name }, index) => {
                    return (
                      <div className={styles.checkItem} key={index}>
                        <input type="checkbox" name={bank_name} />
                        {bank_name}
                      </div>
                    );
                  }
                )}
              </div>
              <button
                className={styles.btnComp}
                style={{
                  textAlign: "center",
                  height: "40px",
                  tabSize: "larger",
                }}
                type="submit"
                value="Submit"
              >
                SUBMIT
              </button>
            </form>
            {bankArray && (
              <div>
                <hr />

                <p>{categorySelect}</p>

                <Table bankArray={bankArray} categoryObject={features} />
              </div>
            )}
          </div>
        </>
      )}
      <div style={{ height: "200px" }}></div>
    </>
  );
};

export default Compare;
