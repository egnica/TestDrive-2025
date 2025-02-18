import React from "react";
import ObjectBank from "../../../banks.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Feature from "../category-comp/Cat-Feature";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

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
    return (
      <p>
        {matchedCategory.score} Videos: {videoCount} {actualFeatureCount}/
        {featureCount}
      </p>
    );
  };

  return (
    <>
      <div>Category</div>
      {Object.entries(ObjectBank.key_Data).map(([key, value], index) => {
        return (
          <div key={index} onClick={() => categoryClick(value.name)}>
            <p>{value.name}</p>
          </div>
        );
      })}
      <hr />
      <p>{selectedCategory}</p>
      {selectedCategory != null &&
        Object.entries(ObjectBank.bank_layout).map(
          ([key, { bank_name, categorys }], index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => featureClick(index)}
                  style={{ display: "flex" }}
                >
                  <>
                    <p>{bank_name}</p>
                    {categoryScore(selectedCategory, categorys)}
                  </>
                </div>
                {index == selectedFeature && (
                  <Feature category={selectedCategory} bank={bank_name} />
                )}
              </div>
            );
          }
        )}
    </>
  );
};

export default Category;
