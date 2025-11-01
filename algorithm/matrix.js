const calcMatrix = (arr) => {
  // Initialize a result matrix with the same dimensions as arr
  const res = Array.from({ length: arr.length }, () =>
    Array(arr[0].length).fill(0)
  );

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      // formula res[i][j] = res[i][j - 1] + res[i - 1][j] - res[i - 1][j - 1];

      // Base case: Start with the current element
      res[i][j] = arr[i][j];

      // Add value from the left cell if it exists
      if (j > 0) {
        res[i][j] += res[i][j - 1];
      }

      // Add value from the top cell if it exists
      if (i > 0) {
        res[i][j] += res[i - 1][j];
      }

      // Subtract overlapping top-left cell if it exists
      if (i > 0 && j > 0) {
        res[i][j] -= res[i - 1][j - 1];
      }

      console.log(`res[${i}][${j}] = ${res[i][j]}`);
    }
  }

  return res; // Return the cumulative sum matrix
};

const data = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const result = calcMatrix(data);
console.log("Final Result:", result);

// input // [[1, 2, 3],[4, 5, 6]]
// output // [([1, 3, 6], [5, 12, 21])];
