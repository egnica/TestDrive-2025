"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Object from "../banks.json";
import BtnRow from "./components/ButtonSelector.jsx";
import Banner from "./components/Banner";
import Banks from "./components/main_three/Banks";
import Category from "./components/main_three/Category";
import Compare from "./components/main_three/Compare";

export default function Home() {
  const [numSel, setNumSel] = useState(null);

  const selectNum = (num) => {
    setNumSel(num);
  };

  return (
    <div className={styles.page}>
      <Banner />
      <BtnRow sendDataToParent={selectNum} />
      <hr />
      <AnimatePresence mode="wait">
        {numSel !== null && (
          <motion.div
            id="lower"
            key={numSel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {numSel === 0 ? (
              <Banks />
            ) : numSel === 1 ? (
              <Category />
            ) : numSel === 2 ? (
              <Compare />
            ) : (
              <div style={{ padding: "100px" }}>
                <h1 style={{ textAlign: "center" }}>
                  ***DOWNLOADS COMING SOON***
                </h1>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
