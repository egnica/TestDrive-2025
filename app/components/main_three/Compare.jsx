"use client";
import React, { useState } from "react";
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
      scale: 0.95,
      y: 20,
      height: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      height: "150px",
      overflow: "hidden",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      height: 0,
      overflow: "hidden",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };
  const boxVariantsTwo = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      height: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      height: "auto",
      overflow: "hidden",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      height: 0,
      overflow: "hidden",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  const categoryImage = (cateName) => {
    const imageFilter = Object.values(BankObject.key_Data).filter((item) => {
      return cateName === item.name;
    });
    return imageFilter[0].icon;
  };

  const desktopFilter = Object.values(BankObject.key_Data).filter((item) =>
    desktop === "desk" ? item.desktop === true : item.desktop === false
  );

  const editName = (string) => {
    return string.split(" ").slice(1).join(" ");
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
    const selectedBanks = [];
    const formData = new FormData(event.target);
    formData.forEach((_, key) => {
      selectedBanks.push(key);
    });
    setBankArray(selectedBanks);

    const newFeatures = selectedBanks.map((bank) => {
      const bankReturn = Object.values(BankObject.bank_layout).find(
        (item) => bank === item.bank_name
      );
      return Object.values(bankReturn.categorys).find(
        (item) => categorySelect === item.name
      ).features;
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

  const backButton = () => {
    if (desktop) {
      setCategorySelect(null);
      setBankArray(null);
      setSelectedBanks([]);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!desktop && (
          <motion.div
            key="select-platform"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={boxVariants}
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
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {desktop && (
          <motion.div
            key="nav-buttons"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={boxVariants}
          >
            <button
              className={styles.btnComp}
              style={{ width: "100px", height: "50px", marginRight: "10px" }}
              onClick={startOver}
            >
              Start Over
            </button>
            <button
              className={styles.btnComp}
              style={{ width: "100px", height: "50px" }}
              onClick={backButton}
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "grid", placeContent: "center" }}>
        {!categorySelect && desktop && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Which set of features would you like to review? Select chapter.
            </h2>
            <div className={styles.chapSelect}>
              <AnimatePresence mode="wait">
                {Object.values(desktopFilter).map((category, index) => (
                  <motion.div
                    variants={boxVariants}
                    key={`key:${category.name} ${index}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.chapSelectBtn}
                    onClick={() => setCategorySelect(category.name)}
                  >
                    <p>{editName(category.name)}</p>
                    <Image
                      src={categoryImage(category.name)}
                      width={50}
                      height={50}
                      alt={category.name}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        {categorySelect && (
          <>
            <motion.h1
              key={`category-heading-${categorySelect}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={boxVariantsTwo}
              style={{ textAlign: "center" }}
            >
              {categorySelect}
            </motion.h1>

            <motion.h2
              key={`selBank-${categorySelect}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={boxVariantsTwo}
              style={{ textAlign: "center" }}
            >
              Select up to 6 banks
            </motion.h2>

            <form style={{ display: "grid" }} onSubmit={submitHandler}>
              <motion.div
                className={styles.formContain}
                key={`checkBoxBank-${categorySelect}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={boxVariantsTwo}
              >
                {Object.values(BankObject.bank_layout).map(
                  ({ bank_name }, index) => {
                    const isChecked = selectedBanks.includes(bank_name);
                    const disableCheckbox =
                      !isChecked && selectedBanks.length >= 6;

                    return (
                      <motion.div
                        key={`checkBoxBankInd-${bank_name}`}
                        variants={boxVariantsTwo}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.checkItem}
                      >
                        <label className={styles.checkItem}>
                          <input
                            type="checkbox"
                            name={bank_name}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            disabled={disableCheckbox}
                          />
                          <span className={styles.checkmark}></span>
                          {bank_name}
                        </label>
                      </motion.div>
                    );
                  }
                )}
              </motion.div>

              <button
                className={styles.btnComp}
                style={{ textAlign: "center", height: "40px" }}
                type="submit"
              >
                SUBMIT
              </button>
            </form>

            <AnimatePresence mode="wait">
              {bankArray && (
                <motion.div
                  key={`table-${bankArray.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "grid" }}
                >
                  <hr />
                  <Table
                    style={{ placeContent: "center" }}
                    bankArray={bankArray}
                    categoryObject={features}
                    categoryName={categorySelect}
                  />
                </motion.div>
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
