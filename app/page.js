"use client";
import { useState } from "react";
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
    num === numSel ? setNumSel(null) : setNumSel(num);
  };
  return (
    <div className={styles.page}>
      <Banner />
      <BtnRow sendDataToParent={selectNum} />
      <hr />
      <div>
        <AnimatePresence mode="wait">
          {numSel == 0 ? (
            <motion.div>
              <Banks />
            </motion.div>
          ) : numSel == 1 ? (
            <motion.div>
              <Category />
            </motion.div>
          ) : numSel == 2 ? (
            <motion.div>
              <Compare />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
