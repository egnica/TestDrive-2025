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
    }, 5000); // Flip every 5 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length, isPaused]);

  const handleSelect = (index) => {
    setIndex(index);
    setIsPaused(true);
  };

  return (
    <div className={styles.carouselContain}>
      <AnimatePresence mode="wait">
        {carouselItems.length > 0 && (
          <motion.div
            key={carouselItems[index].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className={styles.content}>
              <Image
                src={carouselItems[index].image}
                alt={carouselItems[index].title}
                width={300}
                height={200}
              />
              <div className={styles.textContain}>
                <h3>{carouselItems[index].title}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots for manual navigation */}
      <div>
        {carouselItems.map((_, i) => (
          <button
            key={i}
            style={{ background: i === index ? "white" : "gray" }}
            onClick={() => handleSelect(i)}
            className={styles.rotateBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
