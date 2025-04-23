"use client";
import React from "react";
import PostObject from "../../posts.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";

const Banner = () => {
  const carouselItems = PostObject.Post.filter((item) => item.carousel);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 7000); // Flip every 7 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length, isPaused]);

  const handleSelect = (index) => {
    setIndex(index);
    setIsPaused(true);
  };

  return (
    <>
      <div
        // style={{
        //   backgroundImage: `url(${carouselItems[index].image})`,
        // }}
        className={styles.carouselContain}
      >
        <div>
          <AnimatePresence mode="wait">
            {carouselItems.length > 0 && (
              <motion.div
                key={carouselItems[index].id}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
              >
                <div className={styles.content}>
                  <Image
                    className={styles.imageWrapper}
                    src={carouselItems[index].image}
                    alt={carouselItems[index].title}
                    width={850}
                    height={450}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={carouselItems[index].id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.textContain}
            >
              <h1>{carouselItems[index].title}</h1>
              <p>{carouselItems[index].description}</p>
              <div className={styles.bannerBtnContain}>
                <a href={carouselItems[index].link} target="_blank">
                  <button>{carouselItems[index].link_title}</button>
                </a>
                <a href="">
                  <button>Feature Content</button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.rotateBtnContain}>
        {carouselItems.map((_, i) => (
          <button
            key={i}
            style={{ background: i === index ? "white" : "gray" }}
            onClick={() => handleSelect(i)}
            className={styles.rotateBtn}
          />
        ))}
      </div>
    </>
  );
};

export default Banner;
