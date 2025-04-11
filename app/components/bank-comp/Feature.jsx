import React, { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Feature = ({ feature }) => {
  const [featureSelected, setFeatureSelected] = useState("");

  const videoBtnClick = (name) => {
    setFeatureSelected((prev) => (prev === name ? "" : name));
  };

  const videoButton = (video, name) =>
    video !== "" && (
      <button onClick={() => videoBtnClick(name)} className={styles.videoBtn}>
        Watch Video
      </button>
    );

  const checkMark = (points) => {
    return (
      points !== 0 && (
        <Image
          src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/check.png"
          width={25}
          height={25}
          alt="check mark"
        />
      )
    );
  };

  return (
    <div>
      {Object.entries(feature).map(([key, value], index) => {
        const isSelected = featureSelected === value.name;

        return (
          <React.Fragment key={value.name}>
            <div className={styles.innerRow}>
              <div></div>
              <p>{value.name}</p>
              <div style={{ textAlign: "center", margin: "auto" }}>
                {videoButton(value.video, value.name)}
              </div>
              <div style={{ textAlign: "center", margin: "auto" }}>
                {checkMark(value.points)}
              </div>
              <p style={{ textAlign: "center", paddingRight: "15px" }}>
                {value.points}
              </p>
              <div></div>
            </div>

            <AnimatePresence mode="wait">
              {isSelected && (
                <motion.div
                  key={`video-${value.name}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden", textAlign: "center" }}
                >
                  <video width="50%" controls autoPlay>
                    <source src={value.video} type="video/mp4" />
                  </video>
                </motion.div>
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Feature;
