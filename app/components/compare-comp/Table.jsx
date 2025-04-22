import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import key from "../../../banks.json";
const Table = ({ bankArray, categoryObject, categoryName }) => {
  const [sortConfig, setSortConfig] = useState({
    bankIndex: null,
    ascending: true,
  });
  const [vidDisplay, setVidDisplay] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [valueChange, setValueChange] = useState(0);

  const keyData = key.key_Data;
  const categoryFilterKey = Object.values(keyData).find(
    (item) => item.name === categoryName
  );

  const featureKeyArray = categoryFilterKey.features;

  const handleSort = (bankIndex) => {
    setSortConfig((prev) => ({
      bankIndex,
      ascending: prev.bankIndex === bankIndex ? !prev.ascending : false,
    }));
  };

  const videoDisplay = (url) => {
    setVideoUrl(url);
    setVidDisplay(true);
  };


  let categoryRows = Object.keys(categoryObject[0]).map((categoryKey, i) => ({
    name: categoryObject[0][categoryKey].name,
    scoreKey: Object.values(featureKeyArray)[i].points, 
    points: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].points
    ),
    video: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].video
    ),
    screen: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].screenShot
    ),
    featureChange: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].featureChange
    ),
  }));

  // Sorting logic
  if (sortConfig.bankIndex !== null) {
    const { bankIndex, ascending } = sortConfig;

    categoryRows.sort((a, b) => {
      const aPoints = a.points[bankIndex] ?? 0;
      const bPoints = b.points[bankIndex] ?? 0;

      // First: sort by raw points
      if (aPoints !== bPoints) {
        return ascending ? aPoints - bPoints : bPoints - aPoints;
      }

      // If zero: sort by scoreKey (feature importance)
      const aWeight = a.scoreKey ?? 0;
      const bWeight = b.scoreKey ?? 0;

      return ascending ? aWeight - bWeight : bWeight - aWeight;
    });
  }
  const setColor = (string, index) => {
    return string[index] == "new"
      ? "#d9f2d0"
      : string[index] == "removed"
      ? "#f8e0d3"
      : "#f2f6f2";
  };

  return (
    <div className={styles.tableContain}>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.table}
          key={bankArray.length}
          initial={{ width: "50%" }}
          animate={{ width: "100%" }}
          exit={{ width: "auto" }}
        >
          <div className={styles.row + " " + styles.titleRow}>
            <div
              className={styles.headerCell}
              style={{ width: "400px", backgroundColor: " #8f96ff" }}
            >
              Features
            </div>
            <div
              style={{ backgroundColor: " #8f96ff" }}
              className={styles.headerCell}
            >
              <p style={{ fontWeight: "600", fontSize: ".8rem" }}>
                % Top Priority/
                <br />
                Very Important
              </p>
            </div>
            <AnimatePresence mode="wait">
              {bankArray.map((bank, index) => (
                <motion.div
                  key={`keyBankSort ${index}`}
                  initial={{
                    opacity: 0,
                    x: -800,
                    scale: 0.5,
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    backgroundColor: " #8f96ff",
                  }}
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: "rgb(187, 192, 251)",
                  }}
                  whileTap={{
                    scale: 0.95,
                    backgroundColor: "rgb(111, 121, 253)",
                  }}
                  transition={{ duration: 0.4 }}
                  className={styles.bankHeader}
                  onClick={() => handleSort(index)}
                >
                  <button className={styles.bankButton}>
                    {bank}
                    {sortConfig.bankIndex === index
                      ? sortConfig.ascending
                        ? "▼"
                        : "▲"
                      : ""}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {categoryRows.map((row, rowIndex) => (
            <div className={styles.row} key={row.name + rowIndex}>
              <div className={styles.featureCell}>{row.name}</div>
              <div className={styles.tableSquareKey}>
                <p style={{ textAlign: "center" }}>{row.scoreKey}</p>
              </div>
              {bankArray.map((_, bankIndex) => (
                <div
                  className={styles.tableSquare}
                  style={{
                    backgroundColor: setColor(row.featureChange, bankIndex),
                  }}
                >
                  <div className={styles.gridTop}></div>
                  <div className={styles.gridCheck}>
                    {row.points[bankIndex] !== 0 ? (
                      <span>✅ </span>
                    ) : (
                      <div className={styles.gridFill}></div>
                    )}
                  </div>
                  <div
                    className={styles.gridVideo}
                    onClick={() => videoDisplay(row.video[bankIndex])}
                  >
                    {row.video[bankIndex] ? (
                      <span>🎥</span>
                    ) : (
                      <div className={styles.gridFill}></div>
                    )}
                  </div>
                  <a
                    className={styles.gridScreenShot}
                    href={row.screen[bankIndex]}
                  >
                    <div>
                      {row.screen[bankIndex] ? (
                        <span>🗂️</span>
                      ) : (
                        <div className={styles.gridFill}></div>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {vidDisplay && (
          <motion.div
            key={vidDisplay ? "key1" : "key2"}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            onClick={() => setVidDisplay(!vidDisplay)}
            className={styles.videoDisplay}
          >
            <div
              onClick={() => setVidDisplay(false)}
              className={styles.cancelBtn}
            >
              X
            </div>

            <video width="80%" controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Table;
