"use client";
import React from "react";
import { useState } from "react";
import Table from "../compare-comp/Table";

import BankObject from "../../../banks.json";
const Compare = () => {
  const [desktop, setDesktop] = useState(null);
  const [categorySelect, setCategorySelect] = useState(null);
  const [bankArray, setBankArray] = useState(null);
  const [features, setFeatures] = useState(null);

  const desktopFilter = Object.values(BankObject.key_Data).filter((item) =>
    desktop === "desk" ? item.desktop === true : item.desktop === false
  );

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedBanks = [];
    const formData = new FormData(event.target);

    formData.forEach((_, key) => {
      selectedBanks.push(key);
    });

    setBankArray(selectedBanks);

    let newFeatures = [];

    selectedBanks.forEach((bank) => {
      const bankReturn = Object.values(BankObject.bank_layout).find(
        (item) => bank === item.bank_name
      );

      const categorySelectObject = Object.values(bankReturn.categorys).find(
        (item) => categorySelect === item.name
      );

      newFeatures.push(categorySelectObject.features);
    });

    setFeatures((prev) => [...(prev || []), ...newFeatures]);
  };

  return (
    <>
      <div>
        <p>Which platform would you like to analyze?</p>
        <div onClick={() => setDesktop("desk")}>DESKTOP</div>
        <div onClick={() => setDesktop("mobile")}>MOBILE</div>
      </div>
      <div>
        {desktop && (
          <>
            {Object.values(desktopFilter).map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCategorySelect(category.name);
                  }}
                >
                  {category.name}
                </div>
              );
            })}
          </>
        )}
      </div>
      {categorySelect && (
        <>
          <hr />
          <div>
            <p>Select up to 6 banks</p>
            <form onSubmit={submitHandler}>
              {Object.values(BankObject.bank_layout).map(
                ({ bank_name }, index) => {
                  return (
                    <div key={index}>
                      <input type="checkbox" name={bank_name} />
                      {bank_name}
                    </div>
                  );
                }
              )}
              <button type="submit" value="Submit">
                SUBMIT
              </button>
            </form>
            {bankArray && (
              <div>
                <hr />

                <p>{categorySelect}</p>

                <Table bankArray={bankArray} categoryObject={features} />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Compare;
