import React from "react";
import { useState } from "react";
const Table = ({ bankArray, categoryObject }) => {
  const [sortConfig, setSortConfig] = useState({
    bankIndex: null,
    ascending: true,
  });

  const handleSort = (bankIndex) => {
    setSortConfig((prev) => ({
      bankIndex,
      ascending: prev.bankIndex === bankIndex ? !prev.ascending : true,
    }));
  };

  console.log(Object.keys(categoryObject));

  // Extracting category rows (number of rows) with points. We loop through this array to create one row per category in the table.
  let categoryRows = Object.keys(categoryObject[0]).map((categoryKey) => ({
    name: categoryObject[0][categoryKey].name, // Get the category name
    points: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex][categoryKey].points
    ),
  }));

  // categoryObject[bankIndex] → Finds the correct bank's data.
  //[categoryKey] → Dynamically finds "features".
  // .points → Retrieves the actual point value inside the feature.

  // Sorting logic
  if (sortConfig.bankIndex !== null) {
    categoryRows.sort((a, b) => {
      const bankPointsA = a.points[sortConfig.bankIndex];
      const bankPointsB = b.points[sortConfig.bankIndex];

      return sortConfig.ascending
        ? bankPointsB - bankPointsA
        : bankPointsA - bankPointsB;
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Category</th>
          {bankArray.map((bank, index) => (
            <th key={index} scope="col">
              <button
                onClick={() => handleSort(index)}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  fontWeight: "bold",
                }}
              >
                {bank}
                {sortConfig.bankIndex === index
                  ? sortConfig.ascending
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categoryRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row">{row.name}</th>
            {row.points.map((point, bankIndex) => (
              <td key={bankIndex}>{point}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
