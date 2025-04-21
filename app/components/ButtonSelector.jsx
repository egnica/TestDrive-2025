"use client";
import React from "react";
import styles from "./page.module.css";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
const ButtonSelector = ({ sendDataToParent }) => {
  const [btnSelect, setBtnSelect] = useState("");

  const handleClick = (num) => {
    setBtnSelect(num);
    sendDataToParent(num);
  };

  const boxVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 1,
        bounce: 0.3,
        restSpeed: 0.01,
        restDelta: 0.01,
      },
    },
    hover: {
      scale: 1.04,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      background: "#ffffff",
      boxShadow: "inset 36px 36px 72px #d9d9d9, inset -36px -36px 72px #ffffff",
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
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
      <div className={styles.mainBtnContain}>
        <a href="#lower" style={{ textDecoration: "none", color: "inherit" }}>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate={btnSelect === 0 ? "selected" : "visible"}
            whileHover="hover"
            whileTap="tap"
            className={styles.mainBtn}
            onClick={() => {
              handleClick(0);
            }}
          >
            <h2>Bank View</h2>
            <p>
              View Test Drive features and results by category for a specific
              bank.
            </p>
            <Image
              src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/Bank_View.svg"
              width={160}
              height={100}
              alt="building"
            />
          </motion.div>
        </a>
        <a href="#lower" style={{ textDecoration: "none", color: "inherit" }}>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate={btnSelect === 1 ? "selected" : "visible"}
            whileHover="hover"
            whileTap="tap"
            className={styles.mainBtn}
            onClick={() => {
              handleClick(1);
            }}
            href="#lower"
          >
            <h2>Category View</h2>
            <p>
              View Test Drive features and results by bank for a specific
              feature category.
            </p>
            <Image
              src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/Category_View.svg"
              width={160}
              height={100}
              alt="bullet points"
            />
          </motion.div>
        </a>
        <a href="#lower" style={{ textDecoration: "none", color: "inherit" }}>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate={btnSelect === 2 ? "selected" : "visible"}
            whileHover="hover"
            whileTap="tap"
            className={styles.mainBtn}
            onClick={() => {
              handleClick(2);
            }}
            href="#lower"
          >
            <h2>Compare Matrix</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <Image
              src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/Compare_Banks.svg"
              width={160}
              height={100}
              alt="two buildings"
            />
          </motion.div>
        </a>
        <a href="#lower" style={{ textDecoration: "none", color: "inherit" }}>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate={btnSelect === 3 ? "selected" : "visible"}
            whileHover="hover"
            whileTap="tap"
            className={styles.mainBtn}
            onClick={() => {
              handleClick(3);
            }}
            href="#lower"
          >
            <h2>Downloadable Materials</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <Image
              src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/Compare_Banks.svg"
              width={160}
              height={100}
              alt="two buildings"
            />
          </motion.div>
        </a>
      </div>
      <div style={{ textAlign: "center", paddingBottom: "50px" }}>
        <h2>MIDDLE MARKET $10MM-&lt;$500MM​</h2>
        <p>
          Want importance ratings for Middle Market ($10MM&lt;$500MM)
          businesses?{" "}
          <a
            href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/zips/MM-Importance-Ratings.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here.
          </a>
        </p>
      </div>
    </>
  );
};

export default ButtonSelector;
