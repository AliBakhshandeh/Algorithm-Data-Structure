var maxMatrixSum = function (matrix) {
  const sumMatrix = Array.from({ length: matrix.length }, () =>
    Array(matrix[0].length).fill(0)
  );
  console.log(sumMatrix);
};
maxMatrixSum([
  [1, -1],
  [-1, 1],
]);
