"use client";
import React from "react";
import ObjectBank from "../../../banks.json";
import Feature from "../bank-comp/Feature";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Image from "next/image";
const Banks = () => {
  const [bank, setBank] = useState(null);
  const [feature, setFeature] = useState(null);

  const bankHandler = (bankName) => {
    bankName === bank ? setBank(null) : setBank(bankName);
  };

  const videoCount = (feature) => {
    let videoNum = 0;
    feature.forEach((element) => {
      element.video != "" && videoNum++;
    });
    if (videoNum != 0) {
      return videoNum;
    } else {
      return "-";
    }
  };

  const featureCount = (feature) => {
    const featNumTotal = feature.length;
    let actualFeatures = 0;

    feature.forEach((element) => {
      element.points != 0 && actualFeatures++;
    });

    return `${actualFeatures} / ${featNumTotal}`;
  };

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

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Banks</h2>
        <p>
          Select one of the logos below to see how that institution scored this
          year.
        </p>
      </div>
      <div className={styles.bankSelect}>
        {Object.entries(ObjectBank.bank_layout).map(([_, value], index) => {
          return (
            <a
              href="#feature"
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
            >
              <motion.div
                onClick={() => bankHandler(value.bank_name)}
                className={styles.bankItem}
                key={index}
                variants={boxVariants}
                initial="hidden"
                animate={bank === value.bank_name ? "selected" : "visible"}
                whileHover="hover"
                whileTap="tap"
              >
                <Image
                  alt={value.bank_name}
                  height={75}
                  width={75}
                  src={value.logo}
                />
                <p>{value.bank_name}</p>
              </motion.div>
            </a>
          );
        })}
      </div>
      <hr />
      <AnimatePresence mode="wait">
        <motion.h2
          key={bank}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          id="feature"
        >
          {bank}
        </motion.h2>
      </AnimatePresence>

      <div className={styles.listContainer}>
        {bank && (
          <div className={styles.topTable}>
            <h3>Categories</h3>
            <h3 style={{ textAlign: "center" }}>Videos</h3>
            <h3 style={{ textAlign: "center" }}>Features Earned</h3>
            <h3 style={{ textAlign: "center" }}>Points Earned</h3>
          </div>
        )}

        {Object.entries(ObjectBank.bank_layout)
          .filter(([key, value]) => value.bank_name === bank)
          .map(([key, value2]) =>
            value2.categorys.map(({ name, score, features }, index) => (
              <div className={styles.rowContain} key={name}>
                <div
                  onClick={() =>
                    setFeature((prev) => (prev === index ? null : index))
                  }
                  className={styles.rowTable}
                >
                  <p>{name}</p>
                  <p style={{ textAlign: "center" }}>{videoCount(features)}</p>
                  <p style={{ textAlign: "center" }}>
                    {featureCount(features)}
                  </p>
                  <p style={{ textAlign: "center" }}>{score}</p>
                </div>

                <AnimatePresence mode="wait">
                  {index === feature && (
                    <motion.div
                      key={`feature-${name}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ overflow: "hidden" }}
                    >
                      <Feature feature={features} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
      </div>
    </>
  );
};

export default Banks;
