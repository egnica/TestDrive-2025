"use client";
import React from "react";
import PostObject from "../../posts.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Banner = () => {
  // Filter only carousel items
  const carouselItems = PostObject.Post.filter((item) => item.carousel);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Track if the timer should stop

  // Auto-advance only if NOT paused
  useEffect(() => {
    if (isPaused) return; // Stop auto-play when paused

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // Flip every 5 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length, isPaused]);

  // Handle manual selection
  const handleSelect = (newIndex) => {
    setIndex(newIndex);
    setIsPaused(true); // Stop auto-advancing when user clicks
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
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
            <Image
              src={carouselItems[index].image}
              alt={carouselItems[index].title}
              width={300} // Smaller size
              height={200}
              objectFit="cover"
            />
            <div className="absolute bottom-4 bg-black/50 text-white p-2 rounded-md">
              {carouselItems[index].title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots for manual navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)} // Call function on click
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
