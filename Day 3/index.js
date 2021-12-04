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
  console.log({ resultArray });
  return resultArray;
};

const finalNumbers = calculateGammaRate(diagnosticReport);

console.log({ finalNumbers });

const getGammaAndEpsilonRates = (arrayOfNumbers) => {
  const gammaRateArray = [];
  const epsilonRateArray = [];

  arrayOfNumbers.forEach((number) => {
    if (number >= arrayOfNumbers.length / 2) {
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

console.log({ gammaRate, epsilonRate });

const finalAnswer = gammaRateDecimal * epsilonRateDecimal;

// console.log({ finalAnswer });

// Part Two

// gammaRate: '011111101100'

const findOxygenRate = (binArray, index, value) => {
  console.log("line 67, length of input array:", binArray.length);

  // base case

  if (binArray.length === 1) return binArray;

  // filter out any binaries that do not have the given value in the given index

  console.log("current evaulating index:", index);

  const filteredArray = binArray.filter(
    (binaryNumber) => binaryNumber[index] === value
  );
  // call this on the filtered array, incrementing the index and updating the value
  // based on what is most common in that position.....
  const prepNums = calculateGammaRate(filteredArray);

  console.log(
    "just filtered out everything except one where the ",
    index,
    "position has ",
    value
  );
  console.log({ filteredArray });

  const { gammaRate } = getGammaAndEpsilonRates(prepNums);

  const nextIndex = index + 1;

  const nextValue = gammaRate[nextIndex];

  return findOxygenRate(filteredArray, nextIndex, nextValue);
};

const oxygenThing = findOxygenRate(diagnosticReport, 0, "0");

console.log({ oxygenThing });

// { oxygenThing: [ '000000000100' ] }

const findCarbonRate = (binArray, index, value) => {
  console.log("line 67, length of input array:", binArray.length);

  // base case

  if (binArray.length === 1) return binArray;

  // filter out any binaries that do not have the given value in the given index

  console.log("current evaulating index:", index);

  const filteredArray = binArray.filter(
    (binaryNumber) => binaryNumber[index] === value
  );
  // call this on the filtered array, incrementing the index and updating the value
  // based on what is most common in that position.....
  const prepNums = calculateGammaRate(filteredArray);

  const { epsilonRate } = getGammaAndEpsilonRates(prepNums);

  const nextIndex = index + 1;

  const nextValue = epsilonRate[nextIndex];

  return findCarbonRate(filteredArray, nextIndex, nextValue);
};

const carbonThing = findCarbonRate(diagnosticReport, 0, "1");

console.log({ carbonThing });

// { carbonThing: [ '111111111100' ] }

const oxygenDecimal = parseInt(oxygenThing, 2);

const carbonDecimal = parseInt(carbonThing, 2);

console.log({ oxygenDecimal, carbonDecimal });

console.log(oxygenDecimal * carbonDecimal);

// { oxygenDecimal: 4, carbonDecimal: 4092 }
