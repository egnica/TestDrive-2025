"use client";
import React from "react";
import ObjectBank from "../../../banks.json";
import { useState } from "react";
const Banks = () => {
  const [bank, setBank] = useState(null);
  return (
    <>
      <div>Banks</div>
      {Object.entries(ObjectBank.bank_layout).map(([key, value], index) => {
        return (
          <div key={index}>
            <p onClick={() => setBank(value.bank_name)}>{value.bank_name}</p>
          </div>
        );
      })}
      <hr />
      <p>{bank}</p>
      {Object.entries(ObjectBank.bank_layout)
        .filter(([key, value]) => value.bank_name === bank)
        .map(([key, value2]) =>
          value2.categorys.map(({ name, score, features }, index) => (
            <div key={index}>
              <p>
                {name}: {score}
              </p>
            </div>
          ))
        )}
    </>
  );
};

export default Banks;
