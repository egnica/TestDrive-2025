import React from "react";
import styles from "../page.module.css";
const Feature = ({ feature }) => {
  return (
    <div>
      {Object.entries(feature).map(([key, value], index) => {
        return (
          <div className={styles.innerRow} key={index}>
            <p>{value.name}</p>
            <p style={{ textAlign: "center" }}></p>
            <p style={{ textAlign: "center" }}></p>
            <p style={{ textAlign: "center", paddingRight: "10px" }}>
              {value.points}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Feature;
