"use client";
import React from "react";
import PostObject from "../../posts.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

const Banner = () => {
  const carouselItems = PostObject.Post.filter((item) => item.carousel);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
      <div className={styles.carouselContain}>
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.textContain}
            key={`text-${carouselItems[index].id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{carouselItems[index].title}</h1>
            <p>{carouselItems[index].description}</p>
            <div className={styles.bannerBtnContain}>
              <Link
                href={carouselItems[index].link}
                className={styles.bannerBtn}
                target="_blank"
                onClick={() => {
                  logInteraction(carouselItems[index].logInteraction);
                }}
              >
                {carouselItems[index].link_title}
              </Link>
              <Link href={"./repository"} className={styles.bannerBtn}>
                Feature Content
                <br />
                Archive
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {carouselItems.length > 0 && (
            <motion.div
              className={styles.content}
              key={`image-${carouselItems[index].id}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,

                transition: { duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0.6, duration: 0.4 },
              }}
            >
              <Image
                className={styles.imageWrapper}
                src={carouselItems[index].image}
                alt={carouselItems[index].title}
                width={850}
                height={450}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
