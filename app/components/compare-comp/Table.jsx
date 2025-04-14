import React from "react";
import { useState } from "react";
import styles from "../page.module.css";
const Table = ({ bankArray, categoryObject }) => {
  const [sortConfig, setSortConfig] = useState({
    bankIndex: null,
    ascending: true,
  });
  const [vidDisplay, setVidDisplay] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

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
  let categoryRows = Object.keys(categoryObject[0]).map((categoryKey) => ({
    name: categoryObject[0][categoryKey].name, // Get the category name
    points: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].points
    ),
    video: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].video
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
      <table className={styles.table}>
        <thead>
          <tr className={styles.titleCont}>
            <th scope="col">Features</th>
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
              {bankArray.map((_, bankIndex) => (
                <td className={styles.tableSquare} key={bankIndex}>
                  <div> {row.points[bankIndex]}</div>
                  {row.video[bankIndex] && (
                    <div className={styles.cameraContain} onClick={() => videoDisplay(row.video[bankIndex])}>
                      <span style={{ fontSize: "1.4em", color: "gray" }}>
                        🎥
                      </span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {vidDisplay && (
        <div
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
        </div>
      )}
    </div>
  );
};

export default Table;
