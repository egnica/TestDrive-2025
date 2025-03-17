"use client";
import React from "react";
import ObjectBank from "../../../banks.json";
import Feature from "../bank-comp/Feature";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Banks = () => {
  const [bank, setBank] = useState(null);
  const [feature, setFeature] = useState(null);

  const bankHandler = (bankName) => {
    bankName === bank ? setBank(null) : setBank(bankName);
  };

  const featureHandler = (index) => {
    feature === index ? setFeature(null) : setFeature(index);
  };
  return (
    <>
      <div>Banks</div>
      {Object.entries(ObjectBank.bank_layout).map(([_, value], index) => {
        return (
          <div key={index}>
            <p onClick={() => bankHandler(value.bank_name)}>
              {value.bank_name}
            </p>
          </div>
        );
      })}
      <hr />
      <p>{bank}</p>
      {Object.entries(ObjectBank.bank_layout)
        .filter(([key, value]) => value.bank_name === bank)
        .map(([key, value2]) =>
          value2.categorys.map(({ name, score, features }, index) => (
            <div key={index} onClick={() => featureHandler(index)}>
              <p>
                {name}: {score}
              </p>
              <AnimatePresence>
                {index === feature ? (
                  <motion.div>
                    <Feature feature={features} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))
        )}
    </>
  );
};

export default Banks;
