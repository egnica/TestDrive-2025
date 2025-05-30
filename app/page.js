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

  useEffect(() => {
    fetch("/api/tracking", { method: "POST" });
  }, []);

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
                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <h1>2025 Digital Business Banking Annual Report​</h1>
                  <p>
                    Here's the 2025 Digital Business Banking Annual
                    Report:&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/annual-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>

                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <h1>MIDDLE MARKET $10MM-&lt;$500MM​</h1>
                  <p>
                    Want importance ratings for Middle Market ($10MM&lt;$500MM)
                    businesses:&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/zips/MM-Importance-Ratings.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>

                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <h1>SMALL BUSINESS $100K- &#60;$10MM </h1>
                  <p>
                    Want importance ratings for Small Business Market
                    ($10MM&lt;$500MM) businesses:&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/SB-importance-ratings.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>

                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <div style={{ lineHeight: "15px" }}>
                    <h1>Downloadable Feature Matrix</h1>
                    <h3>(previously known as Product Roadmap)​</h3>
                  </div>
                  <p>
                    Access Full List of Platform Features, and A Checklist of
                    Which Platform Offers That Feature:&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/feature-matrix.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
