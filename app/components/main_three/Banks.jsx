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
  const [zipBank, setZipBank] = useState(null);
  const [isHovering, setIsHovering] = useState({
    value: false,
    text: null,
    index: null,
  });

  const bankHandler = (bankName) => {
    bankName === bank ? setBank(null) : setBank(bankName);
  };

  const rowColor = (input) => {
    return input % 2 === 0 ? styles.rowTableEven : styles.rowTableOdd;
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

  // const winnerDisplayOn = (value) => {
  //   setIsHovering(value);
  // };
  // const winnerDisplayOff = (value) => {
  //   setIsHovering(value);
  // };

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
                onClick={() => {
                  bankHandler(value.bank_name);
                  setZipBank(value.asset_zip);
                }}
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
      <hr id="feature" />
      <div className={styles.titleHeader}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={bank}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={styles.titleH1}
          >
            {bank}
          </motion.h1>
          {bank && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: "flex" }}
              >
                <Image
                  src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/winner.svg"
                  height={40}
                  width={40}
                  alt="winner icon"
                  style={{ borderRadius: "20px", paddingTop: "10px" }}
                />
                <p style={{ paddingTop: "5px" }}>
                  &nbsp; = indicates category winner
                </p>
              </motion.div>
              <a href={zipBank} className={styles.downloadBtn}>
                Download <br /> Screenshots
              </a>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.listContainer}>
        {bank && (
          <div className={styles.topTable}>
            <h3>Categories</h3>
            <h3 style={{ textAlign: "center" }}>Videos Available</h3>
            <h3 style={{ textAlign: "center" }}>Features Credited</h3>
            <h3 style={{ textAlign: "center" }}>Points Earned</h3>
            <div></div>
          </div>
        )}

        {Object.entries(ObjectBank.bank_layout)
          .filter(([key, value]) => value.bank_name === bank)
          .map(([key, value2]) =>
            value2.categorys.map(
              ({ name, score, features, winner, asset_zip }, index) => (
                <div key={name} style={{ position: "relative" }}>
                  <div>
                    <div
                      onClick={() =>
                        setFeature((prev) => (prev === index ? null : index))
                      }
                      className={rowColor(index)}
                    >
                      <p>{name}</p>
                      <p style={{ textAlign: "center" }}>
                        {videoCount(features)}
                      </p>
                      <p style={{ textAlign: "center" }}>
                        {featureCount(features)}
                      </p>
                      <p style={{ textAlign: "center" }}>{score}</p>
                      <div>
                        <AnimatePresence mode="wait">
                          {winner != null ? (
                            <motion.div
                              className={styles.winContImage}
                              variants={boxVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                            >
                              <Image
                                onMouseOver={() =>
                                  setIsHovering({
                                    value: true,
                                    text: winner,
                                    index: index,
                                  })
                                }
                                onMouseOut={() =>
                                  setIsHovering({
                                    value: false,
                                    text: null,
                                    index: null,
                                  })
                                }
                                src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/winner.svg"
                                height={30}
                                width={30}
                                alt="winner icon"
                                style={{ borderRadius: "20px" }}
                              />
                            </motion.div>
                          ) : (
                            <div style={{ width: "30px" }}></div>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence mode="wait">
                        {isHovering.value && isHovering.index === index && (
                          <motion.div
                            key={`tooltip-${index}`}
                            className={styles.absoluteHover}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                          >
                            <p>{isHovering.text}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                </div>
              )
            )
          )}
      </div>
      <div style={{ height: "200px" }}></div>
    </>
  );
};

export default Banks;
