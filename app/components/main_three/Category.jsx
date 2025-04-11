import React from "react";
import ObjectBank from "../../../banks.json";
import { useState } from "react";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Feature from "../category-comp/Cat-Feature";
import Image from "next/image";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [zipBank, setZipBank] = useState(null);
  const [isHovering, setIsHovering] = useState({
    value: false,
    text: null,
    index: null,
  });

  const categoryClick = (name) => {
    name === selectedCategory
      ? setSelectedCategory(null)
      : setSelectedCategory(name);
  };

  const featureClick = (num) => {
    num === selectedFeature
      ? setSelectedFeature(null)
      : setSelectedFeature(num);
  };

  const toggleDisplay = () => {
    return selectedCategory ? "flex" : "block";
  };

  const rowColor = (index) => {
    return index % 2 === 0 ? "#ffff" : "#efefef";
  };

  const categoryScore = (selected, categorys) => {
    const matchedCategory = categorys.find(({ name }) => name === selected);
    let videoCount = 0;
    let featureCount = 0;
    let actualFeatureCount = 0;
    Object.entries(matchedCategory.features).forEach(
      ([key, { points, video }]) => {
        if (video != "") videoCount++;
        if (points) featureCount++;
        if (points != "-") actualFeatureCount++;
      }
    );
    if (videoCount == 0) videoCount = "-";
    return (
      <>
        <p style={{ textAlign: "center" }}>{videoCount}</p>
        <p style={{ textAlign: "center" }}>
          {featureCount}/{actualFeatureCount}
        </p>
        <p style={{ textAlign: "center" }}>{matchedCategory.score}</p>
      </>
    );
  };

  const boxVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      borderRadius: "8px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 1,
        bounce: 0.3,
        restSpeed: 0.01,
        restDelta: 0.01,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
      borderRadius: "12px",
      boxShadow: "0px 4px 18px rgb(192, 185, 255)",
      cursor: "pointer",
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.3 },
      backgroundColor: "rgb(238, 236, 254)",
    },
    selected: {
      opacity: 1,
      scale: 1.05,
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgb(192, 185, 255)",
      transition: { duration: 0.3, stiffness: 300 },
    },
  };

  const rowVariants = {
    hover: {
      backgroundColor: "#53b8f8",
      color: "#ffff",
      cursor: "pointer",
    },
    selected: {
      backgroundColor: "#53b8f8",
      color: "#ffff",
    },
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Categories</h2>
        <p>
          Select one of the categories below to see how each bank scored in
          regard to that topic
        </p>
      </div>
      {selectedCategory ? <p>version 2</p> : <p>version 1</p>}
      <div className={styles.catContain} style={{ display: toggleDisplay() }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory ? "container-two" : "container-one"}
            className={
              selectedCategory
                ? styles.centeredSelectionContainTwo
                : styles.centeredSelectionContainOne
            }
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {Object.entries(ObjectBank.key_Data).map(([key, value]) => (
              <motion.div
                className={styles.categoryItem}
                key={value.name}
                onClick={() => {
                  categoryClick(value.name);
                  setZipBank(value.asset_zip);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>{value.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ width: "100%" }}>
          <div className={styles.listContainer}>
            {selectedCategory && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: "flex", padding: "10px" }}
                >
                  <p>{selectedCategory}</p>
                  <Image
                    src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/winner.svg"
                    height={40}
                    width={40}
                    alt="winner icon"
                    style={{ borderRadius: "20px", paddingTop: "10px" }}
                  />
                  <p style={{ paddingTop: "5px" }}>
                    &nbsp; = indicates category winner
                  </p>

                  <a href={zipBank} className={styles.downloadBtn}>
                    Download <br /> Screenshots
                  </a>
                </motion.div>
                <div className={styles.topTable}>
                  <h3>Banks</h3>
                  <h3 style={{ textAlign: "center" }}>Videos</h3>
                  <h3 style={{ textAlign: "center" }}>Features Earned</h3>
                  <h3 style={{ textAlign: "center" }}>Points Earned</h3>
                </div>{" "}
              </>
            )}

            {selectedCategory != null &&
              Object.entries(ObjectBank.bank_layout).map(
                ([key, { bank_name, categorys }], index) => {
                  const feature = categorys.find(
                    (cat) => cat.name === selectedCategory
                  );
                  return (
                    <div key={index} className={styles.rowContain}>
                      <motion.div
                        variants={rowVariants}
                        whileHover="hover"
                        whileTap="selected"
                        onClick={() => featureClick(index)}
                        className={styles.categoryRow}
                        style={{ backgroundColor: rowColor(index) }}
                      >
                        <>
                          <p>{bank_name}</p>
                          {categoryScore(selectedCategory, categorys)}
                          <div>
                            <AnimatePresence mode="wait">
                              {feature.winner != null ? (
                                <motion.div
                                  className={styles.winContImage}
                                  variants={boxVariants}
                                  initial="hidden"
                                  animate="visible"
                                  whileHover="hover"
                                >
                                  <Image
                                    onMouseOver={() =>
                                      setIsHovering({
                                        value: true,
                                        text: feature.winner,
                                        index: index,
                                      })
                                    }
                                    onMouseOut={() =>
                                      setIsHovering({
                                        value: false,
                                        text: null,
                                        index: null,
                                      })
                                    }
                                    src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/winner.svg"
                                    height={30}
                                    width={30}
                                    alt="winner icon"
                                    style={{ borderRadius: "20px" }}
                                  />
                                </motion.div>
                              ) : (
                                <div style={{ width: "30px" }}></div>
                              )}
                            </AnimatePresence>
                          </div>
                          <AnimatePresence mode="wait">
                            {isHovering.value && isHovering.index === index && (
                              <motion.div
                                key={`tooltip-${index}`}
                                className={styles.absoluteHover}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                              >
                                <p>{isHovering.text}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {index == selectedFeature && (
                          <motion.div
                            key={`feature-${selectedFeature}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ overflow: "hidden" }}
                          >
                            <Feature
                              category={selectedCategory}
                              bank={bank_name}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
      <div style={{ height: "200px" }}></div>
      <hr />
    </>
  );
};

export default Category;
