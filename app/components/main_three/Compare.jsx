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
      height: 0,
      scale: 0.5,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      borderRadius: "8px",
      height: "auto",
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
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };
  const categoryImage = (cateName) => {
    const imageFilter = Object.values(BankObject.key_Data).filter((item) => {
      return cateName == item.name;
    });

    return imageFilter[0].icon;
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
      if (selectedBanks.length < 6) {
        setSelectedBanks((prev) => [...prev, name]);
      }
    } else {
      setSelectedBanks((prev) => prev.filter((bank) => bank !== name));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let selectedBanks = [];
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

    setFeatures(newFeatures);
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
      <AnimatePresence mode="wait">
        {!desktop && (
          <>
            <motion.div
              key={`desktop:${desktop}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ textAlign: "center" }}>
                Which platform would you like to analyze?
              </h2>
              <div className={styles.analyzeContain}>
                <div
                  className={styles.btnComp}
                  onClick={() => setDesktop("desk")}
                >
                  DESKTOP
                </div>
                <div
                  className={styles.btnComp}
                  onClick={() => setDesktop("mobile")}
                >
                  MOBILE
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {desktop && (
          <motion.div
            key={desktop}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              style={{ width: "100px", height: "50px", marginRight: "10px" }}
              className={styles.btnComp}
              onClick={startOver}
            >
              Start Over
            </button>
            <button
              style={{ width: "100px", height: "50px" }}
              className={styles.btnComp}
              onClick={() => backButton(desktop)}
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: "grid", placeContent: "center" }}>
        <AnimatePresence mode="wait"></AnimatePresence>
        {!categorySelect && desktop && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Which set of features would you like to review? Select chapter.
            </h2>

            <div className={styles.chapSelect}>
              <AnimatePresence mode="wait">
                {Object.values(desktopFilter).map((category, index) => {
                  return (
                    <motion.div
                      variants={boxVariants}
                      key={`key:${category.name} ${index}`}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      exit="exit"
                      className={styles.chapSelectBtn}
                      onClick={() => {
                        setCategorySelect(category.name);
                      }}
                    >
                      <p> {editName(category.name)}</p>
                      <Image
                        src={categoryImage(category.name)}
                        width={50}
                        height={50}
                        alt={category.name}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
      <AnimatePresence mode="wait">
        {categorySelect && (
          <>
            <hr />
            <div>
              <motion.h1
                key={categorySelect.name}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.4 }}
              >
                {categorySelect}
              </motion.h1>
            </div>
            {/* CHECKBOX section */}

            <motion.h2
              key={`selBank ${categorySelect.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center" }}
            >
              Select up to 6 banks
            </motion.h2>
            <form style={{ display: "grid" }} onSubmit={submitHandler}>
              <motion.div
                className={styles.formContain}
                key={`checkBoxBank ${categorySelect.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {Object.values(BankObject.bank_layout).map(
                  ({ bank_name }, index) => {
                    const isChecked = selectedBanks.includes(bank_name);
                    const disableCheckbox =
                      !isChecked && selectedBanks.length >= 6;

                    return (
                      <motion.div
                        variants={boxVariants}
                        key={`checkBoxBankInd ${bank_name}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.checkItem}
                      >
                        <input
                          type="checkbox"
                          name={bank_name}
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          disabled={disableCheckbox}
                        />
                        {bank_name}
                      </motion.div>
                    );
                  }
                )}
              </motion.div>

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
            <AnimatePresence mode="wait">
              {bankArray && (
                <div style={{ display: "grid" }}>
                  <hr />
                  <motion.div
                    key={`Table ${bankArray.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ display: "grid" }}
                  >
                    <Table
                      style={{ placeContent: "center" }}
                      bankArray={bankArray}
                      categoryObject={features}
                      categoryName={categorySelect}
                    />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
      <div style={{ height: "200px" }}></div>
    </>
  );
};

export default Compare;
