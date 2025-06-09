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
    fetch("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction: "Visited Home Page",
      }),
    });
  }, []);

  async function logInteraction(interactionText) {
    try {
      await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interaction: interactionText }),
      });
    } catch (err) {
      console.error("Logging failed:", err);
    }
  }

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
                    2025 Digital Business Banking Annual Report:&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/annual-report.pdf"
                      onClick={() =>
                        logInteraction(
                          "2025 Digital Business Banking Annual Report"
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>

                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <h1>Feature Importance: Middle Market Banking</h1>
                  <p>
                    Feature importance ratings for Middle Market segment
                    (businesses with $10MM &mdash; &lt;$500MM in annual
                    revenue):&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/MM-Importance-Ratings.pdf"
                      onClick={() => logInteraction("MIDDLE MARKET Report")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here.
                    </a>
                  </p>
                </div>

                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <h1>Feature Importance: Small Business Banking</h1>
                  <p>
                    Feature importance ratings for Small Business segment
                    (businesses with $100K &mdash; &lt;$10MM in annual
                    revenue):&nbsp;
                    <a
                      href="https://mybarlow.barlowresearch.com/mybarlow/testdrive2025/downloads/SB-importance-ratings.pdf"
                      onClick={() => logInteraction("SMALL BUSINESS Report")}
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
                    <h3>
                      (perviously known as Product Roadmap or Test Drive
                      Roadmap)​
                    </h3>
                  </div>
                  <p>
                    Access full list of platform features, and a checklist of
                    which platform offers that feature:&nbsp;
                    <a
                      onClick={() =>
                        logInteraction("Downloadable Feature Matrix")
                      }
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
