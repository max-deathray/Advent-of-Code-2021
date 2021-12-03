const fs = require("fs");

const diagnosticReport = fs
  .readFileSync("binary.txt", { encoding: "utf-8" })
  .split("\n");

const calculateGammaRate = (binaryArray) => {
  const resultArray = new Array(12).fill(0);

  for (let i = 0; i < binaryArray.length; i++) {
    // e.g. "000011001000"
    const currentBinaryString = binaryArray[i];

    for (let j = 0; j < currentBinaryString.length; j++) {
      // e.g. "1" or "0"
      const currentBinaryChar = currentBinaryString[j];

      resultArray[j] = resultArray[j] + Number(currentBinaryChar);
    }
  }

  return resultArray;
};

const finalNumbers = calculateGammaRate(diagnosticReport);

console.log({ finalNumbers });

const getGammaAndEpsilonRates = (arrayOfNumbers) => {
  const gammaRateArray = [];
  const epsilonRateArray = [];

  arrayOfNumbers.forEach((number) => {
    if (number > 500) {
      gammaRateArray.push(1);
      epsilonRateArray.push(0);
    } else {
      gammaRateArray.push(0);
      epsilonRateArray.push(1);
    }
  });

  const gammaRate = gammaRateArray.join("");
  const epsilonRate = epsilonRateArray.join("");

  const gammaRateDecimal = parseInt(gammaRate, 2);
  const epsilonRateDecimal = parseInt(epsilonRate, 2);

  return { gammaRate, gammaRateDecimal, epsilonRate, epsilonRateDecimal };
};

const { gammaRateDecimal, epsilonRateDecimal, gammaRate, epsilonRate } =
  getGammaAndEpsilonRates(finalNumbers);

const finalAnswer = gammaRateDecimal * epsilonRateDecimal;

console.log({ finalAnswer });

// Part Two

const findOxygenGeneratorRating = (inputArray, gammaRate) => {};

const oxy = findOxygenGeneratorRating(diagnosticReport, gammaRate);

console.log({ oxy });
