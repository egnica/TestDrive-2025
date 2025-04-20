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
  const [selectedBanks, setSelectedBanks] = useState([]);

  const boxVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      borderRadius: "8px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 1,
        bounce: 0.3,
        restSpeed: 0.01,
        restDelta: 0.01,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
      borderRadius: "12px",
      boxShadow: "0px 4px 18px rgb(192, 185, 255)",
      cursor: "pointer",
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.3 },
      backgroundColor: "rgb(238, 236, 254)",
    },
    selected: {
      opacity: 1,
      scale: 1.05,
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgb(192, 185, 255)",
      transition: { duration: 0.3, stiffness: 300 },
    },
  };

  const desktopFilter = Object.values(BankObject.key_Data).filter((item) =>
    desktop === "desk" ? item.desktop === true : item.desktop === false
  );
  const editName = (string) => {
    const stringArray = string.split(" ").splice(1).join(" ");
    return stringArray;
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      // Add to selected list (only if fewer than 6)
      if (selectedBanks.length < 6) {
        setSelectedBanks((prev) => [...prev, name]);
      }
    } else {
      // Remove from selected list
      setSelectedBanks((prev) => prev.filter((bank) => bank !== name));
    }
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
    setFeatures(null);
    setSelectedBanks([]);
  };
  const backButton = (input) => {
    if (desktop) {
      setDesktop(input);
      setCategorySelect(null);
      setBankArray(null);
      setSelectedBanks([]);
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
            <AnimatePresence mode="wait">
              <div className={styles.chapSelect}>
                {Object.values(desktopFilter).map((category, index) => {
                  return (
                    <motion.div
                      variants={boxVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className={styles.chapSelectBtn}
                      key={index}
                      onClick={() => {
                        setCategorySelect(category.name);
                      }}
                    >
                      {editName(category.name)}
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
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
                    const isChecked = selectedBanks.includes(bank_name);
                    const disableCheckbox =
                      !isChecked && selectedBanks.length >= 6;

                    return (
                      <div className={styles.checkItem} key={index}>
                        <input
                          type="checkbox"
                          name={bank_name}
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          disabled={disableCheckbox}
                        />
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
                }}
                type="submit"
              >
                SUBMIT
              </button>
            </form>
            {bankArray && (
              <div style={{ display: "grid" }}>
                <hr />

                <h2>{categorySelect}</h2>

                <Table
                  bankArray={bankArray}
                  categoryObject={features}
                  categoryName={categorySelect}
                />
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
