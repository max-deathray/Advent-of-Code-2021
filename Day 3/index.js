const { count } = require("console");
const fs = require("fs");

const diagnosticReport = fs
  .readFileSync("binary.txt", { encoding: "utf-8" })
  .split("\n");

const testDiagnosticReport = fs
  .readFileSync("test.txt", { encoding: "utf-8" })
  .split("\n");

const countZeroesAndOnes = (arrayOfBinaries) => {
  // determine the length of the given binary numbers
  const length = arrayOfBinaries[0].length;

  // create some storage arrays of that length
  const zeroes = new Array(length).fill(0);
  const ones = new Array(length).fill(0);

  for (binaryNumber of arrayOfBinaries) {
    // take each binary string and split into an array
    const bits = [...binaryNumber];

    // loop over each array of bits and tally the 0s and 1s
    bits.forEach((bit, index) => {
      if (bit === "0") {
        zeroes[index]++;
      } else {
        ones[index]++;
      }
    });
  }

  return { length: length, zeroes: zeroes, ones: ones };
};

const { length, zeroes, ones } = countZeroesAndOnes(testDiagnosticReport);

const findRates = (binaryArray) => {
  const { length, zeroes, ones } = countZeroesAndOnes(binaryArray);

  let gammaRate = "";
  let epsilonRate = "";

  for (let i = 0; i < length; i++) {
    let bit = 0;
    if (ones[i] > zeroes[i]) {
      bit = 1;
    }
    if (ones[i] === zeroes[i]) {
      gammaRate += 1;
      epsilonRate += 0;
    } else {
      gammaRate += bit;
      epsilonRate += bit === 0 ? 1 : 0;
    }
  }

  return {
    gammaRate,
    epsilonRate,
  };
};

const { gammaRate, epsilonRate } = findRates(testDiagnosticReport);

// Part Two

const findOxygen = (array, index = 0) => {
  // base case
  if (array.length === 1) return array;

  const { zeroes, ones } = countZeroesAndOnes(array);

  let most = "1";

  if (zeroes[index] > ones[index]) {
    most = "0";
  }

  const filteredArray = array.filter((binary) => {
    return binary[index] === most;
  });

  return findOxygen(filteredArray, index + 1);
};

const findCarbon = (array, index = 0) => {
  // base case
  if (array.length === 1) return array;

  const { zeroes, ones } = countZeroesAndOnes(array);

  let least = "0";

  if (zeroes[index] > ones[index]) {
    least = "1";
  }

  const filteredArray = array.filter((binary) => {
    return binary[index] === least;
  });

  return findCarbon(filteredArray, index + 1);
};

const oxygen = findOxygen(diagnosticReport);

const carbon = findCarbon(diagnosticReport);

console.log({ oxygen });

console.log({ carbon });

console.log(parseInt(oxygen, 2), parseInt(carbon, 2));

console.log(parseInt(oxygen, 2) * parseInt(carbon, 2));
