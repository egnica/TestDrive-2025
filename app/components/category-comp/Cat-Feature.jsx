import React, { useState } from "react";
import ObjectBank from "../../../banks.json";
import styles from "../page.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CatFeature = ({ category, bank }) => {
  const [featureSelected, setFeatureSelected] = useState("");

  const matchedBank = Object.values(ObjectBank.bank_layout).find(
    (value) => value.bank_name === bank
  );

  const matchedCategory = matchedBank.categorys.find(
    (value) => value.name === category
  );

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
      {Object.values(matchedCategory.features).map(
        ({ name, points, video }, index) => {
          const isSelected = featureSelected === name;
          return (
            <React.Fragment key={name}>
              <div className={styles.innerRow}>
              <div></div>
                <p>{name}</p>
                <div style={{ textAlign: "center", margin: "auto" }}>
                  {videoButton(video, name)}
                </div>
                <div style={{ textAlign: "center", margin: "auto" }}>
                  {checkMark(points)}
                </div>
                <p style={{ textAlign: "center", paddingRight: "15px" }}>
                  {points}
                </p>
                <div></div>
              </div>

              <AnimatePresence mode="wait">
                {isSelected && (
                  <motion.div
                    key={`video-${name}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden", textAlign: "center" }}
                  >
                    <video width="50%" controls autoPlay>
                      <source src={video} type="video/mp4" />
                    </video>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};

export default CatFeature;
