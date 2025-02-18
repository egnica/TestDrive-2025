import React from "react";

const Feature = ({ feature }) => {
  return (
    <div>
      {Object.entries(feature).map(([key, value], index) => {
        return (
          <div key={index}>
            <p>
              {value.name} {value.points}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Feature;
