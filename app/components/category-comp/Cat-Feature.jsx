import React from "react";
import ObjectBank from "../../../banks.json";

const CatFeature = ({ category, bank }) => {
  const matchedBank = Object.values(ObjectBank.bank_layout).find(
    (value) => value.bank_name === bank
  );

  const matchedCategory = matchedBank.categorys.find(
    (value) => value.name === category
  );

  return (
    <>
      <div>
        {Object.values(matchedCategory.features).map(
          ({ name, points, video }, index) => (
            <div key={index}>
              <p>{name}</p>
              <p>{points}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CatFeature;
