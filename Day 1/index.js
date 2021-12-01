const fs = require("fs");

const depthsArray = fs
  .readFileSync("sea_depths.txt", { encoding: "utf-8" })
  .split("\n")
  .map(Number);

const countIncreased = (depths) => {
  let increased = 0;

  for (let i = 1; i < depths.length; i++) {
    const prevDepth = depths[i - 1];

    const currentDepth = depths[i];

    if (currentDepth > prevDepth) {
      increased++;
    }
  }

  return increased;
};

const countIncreasedWindows = (depths) => {
  let increased = 0;

  for (let i = 3; i < depths.length; i++) {
    const prevWindowTotal = depths[i - 3] + depths[i - 2] + depths[i - 1];

    const currentWindowTotal = depths[i - 2] + depths[i - 1] + depths[i];

    if (currentWindowTotal > prevWindowTotal) {
      increased++;
    }
  }

  return increased;
};

// console.log(countIncreased(depthsArray));

console.log(countIncreasedWindows(depthsArray));
