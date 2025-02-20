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

  // Extracting category rows with points
  let categoryRows = Object.keys(categoryObject[0]).map((categoryKey) => ({
    name: categoryObject[0][categoryKey]?.name ?? "Unknown Category",
    points: bankArray.map(
      (_, bankIndex) => categoryObject[bankIndex]?.[categoryKey]?.points ?? 0
    ),
  }));

  // Sorting logic
  if (sortConfig.bankIndex !== null) {
    categoryRows.sort((a, b) => {
      const bankPointsA = a.points[sortConfig.bankIndex];
      const bankPointsB = b.points[sortConfig.bankIndex];

      return sortConfig.ascending
        ? bankPointsA - bankPointsB
        : bankPointsB - bankPointsA;
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
