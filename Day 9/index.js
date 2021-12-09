const fs = require('fs');

const entries = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');

const heightMap = entries.map((line) => line.split(''));

// console.log({ heightMap });

const findAdjacentValues = (x, y, matrix) => {
  const adjacentValues = [];

  const rowLimit = matrix[0].length;
  const columnLimit = matrix.length;

  const upLoc = x - 1;
  const rightLoc = y + 1;
  const downLoc = x + 1;
  const leftLoc = y - 1;

  if (x !== 0) {
    adjacentValues.push(matrix[upLoc][y]);
  }

  if (y !== rowLimit - 1) {
    adjacentValues.push(matrix[x][rightLoc]);
  }

  if (x !== columnLimit - 1) {
    adjacentValues.push(matrix[downLoc][y]);
  }

  if (y !== 0) {
    adjacentValues.push(matrix[x][leftLoc]);
  }

  return adjacentValues;
};

const lowPointValues = (matrix) => {
  const lowPoints = [];

  // loop over every element in matrix
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let j = 0; j < row.length; j++) {
      const height = row[j];

      const adjacentLocations = findAdjacentValues(i, j, matrix);

      if (adjacentLocations.every((value) => value > height)) {
        lowPoints.push(height);
      }
    }
  }

  // find the value of each element

  // check the adjacent values

  // if any value is less than current element, move on

  // if all defined values are greater, add element to lowPoints array

  // when you have completed the loop, return the lowPoints array

  return lowPoints;
};

const lowPoints = lowPointValues(heightMap);

console.log({ lowPoints });

const riskLevels = lowPoints.map((value) => Number(value) + 1);

const sum = riskLevels.reduce((a, b) => a + b);

console.log({ sum });
