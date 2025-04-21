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
  // const featureKey = Object.values(featureKeyArray).map((item) => item.points);
  // The above was moved into the categoryRows object

  const handleSort = (bankIndex) => {
    setSortConfig((prev) => ({
      bankIndex,
      ascending: prev.bankIndex === bankIndex ? !prev.ascending : true,
    }));
  };

  const videoDisplay = (url) => {
    setVideoUrl(url);
    setVidDisplay(true);
  };

  // Extracting category rows (number of rows) with points. We loop through this array to create one row per category in the table.
  let categoryRows = Object.keys(categoryObject[0]).map((categoryKey, i) => ({
    name: categoryObject[0][categoryKey].name,
    scoreKey: Object.values(featureKeyArray)[i].points, // attach it directly
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

  // categoryObject[bankIndex] → Finds the correct bank's data.
  //[categoryKey] → Dynamically finds "features".
  // .points → Retrieves the actual point value inside the feature.

  // Sorting logic
  if (sortConfig.bankIndex !== null) {
    categoryRows.sort((a, b) => {
      const bankPointsA = a.points[sortConfig.bankIndex];
      const bankPointsB = b.points[sortConfig.bankIndex];

      return sortConfig.ascending
        ? bankPointsB - bankPointsA
        : bankPointsA - bankPointsB;
    });
  }

  return (
    <div className={styles.tableContain}>
      <AnimatePresence mode="wait">
        <motion.table
          className={styles.table}
          key={bankArray.length}
          initial={{ width: "50%" }}
          animate={{ width: "100%" }}
          exit={{ width: "auto" }}
        >
          <thead>
            <tr className={styles.titleCont}>
              <th scope="col">Features</th>
              <th style={{ fontSize: ".8em" }} scope="col">
                % Top Priority/​
                <br />
                Very Important
              </th>

              {bankArray.map((bank, index) => (
                <th
                  className={styles.bankDisplay}
                  onClick={() => handleSort(index)}
                  key={index}
                  scope="col"
                >
                  <button
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {bank}
                    {sortConfig.bankIndex === index
                      ? sortConfig.ascending
                        ? "▲"
                        : "▼"
                      : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categoryRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className={styles.featureContain} scope="row">
                  {row.name}
                </th>

                <td className={styles.tableSquare}>{row.scoreKey}</td>

                {bankArray.map((_, bankIndex) => (
                  <td className={styles.tableSquare} key={bankIndex}>
                    <div>
                      {row.points[bankIndex] != 0 ? (
                        <span style={{ fontSize: "1.4em" }}> ✅ </span>
                      ) : null}
                    </div>
                    {row.video[bankIndex] && (
                      <div
                        className={styles.cameraContain}
                        onClick={() => videoDisplay(row.video[bankIndex])}
                      >
                        <span style={{ fontSize: "1.4em" }}>🎥</span>
                      </div>
                    )}
                    {row.video[bankIndex] && (
                      <a href={row.screen[bankIndex]}>
                        <div className={styles.cameraContain}>
                          <span style={{ fontSize: "1.4em" }}>🗂️</span>
                        </div>
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </motion.table>
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
