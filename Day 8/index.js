const fs = require('fs');

const entries = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');

// console.log({ entries });

const outputFromEntries = entries.map((string) => {
  const [signals, output] = string.split(' | ');
  return output.split(' ');
});

// console.log({ outputFromEntries });

const knownValues = new Map();

knownValues.set(2, 1); // length 2 means value is 1
knownValues.set(3, 7); // length 3 means value is 7
knownValues.set(4, 4); // length 4 means value is 4
knownValues.set(7, 8); // length 8 means value is 8

const countKnownOutputValues = (arrayOfArrays) => {
  return arrayOfArrays.reduce((count, arr) => {
    return (
      count +
      arr.reduce((acc, el) => {
        return knownValues.has(el.length) ? 1 + acc : acc;
      }, 0)
    );
  }, 0);
};

const count = countKnownOutputValues(outputFromEntries);

// console.log({ count });

// Part Two

// aecgdbf badcg fbcage gdabce be gaedb bced dfeag adbfgc abe | gedbacf be bdfcga bedfgca

const createCipher = (arrayOfMysteries) => {
  let mysteries = [...arrayOfMysteries];

  const knownValues = new Map();

  const charMap = new Map();

  // loop over values in array until all 10 values are determined
  while (knownValues.size < 10 && mysteries.length) {
    let stubbornMysteries = [];

    for (const mystery of mysteries) {
      if (mystery.length === 2) {
        knownValues.set(mystery, 1); // length 2 means value is 1
        charMap.set(1, mystery.split(''));
      }
      if (mystery.length === 3) {
        knownValues.set(mystery, 7); // length 3 means value is 7
      }
      if (mystery.length === 4) {
        knownValues.set(mystery, 4); // length 4 means value is 4
        charMap.set(4, mystery.split(''));
      }
      if (mystery.length === 5) {
        // check if the charMap has 1 and 6 yet
        // if not, then toss this value in the stubborn mysteries stack to re-evaluate
        if (!charMap.has(1) || !charMap.has(6)) {
          stubbornMysteries.push(mystery);
        } else {
          // else if it is known what the 2 chars are, then check if this mystery fully includes all of them
          const charsOfOne = charMap.get(1);
          const charsOfSix = charMap.get(6);
          if (charsOfOne.every((char) => mystery.includes(char))) {
            // then you have found 3
            knownValues.set(mystery, 3);
          } else {
            const charsOfThisMystery = mystery.split('');

            if (charsOfThisMystery.every((char) => charsOfSix.includes(char))) {
              knownValues.set(mystery, 5);
            } else {
              knownValues.set(mystery, 2);
            }
          }
        }
      }
      if (mystery.length === 6) {
        // if we don't have the chars of 1 and 4 yet, move on
        if (!charMap.has(1) || !charMap.has(4)) {
          stubbornMysteries.push(mystery);
        } else {
          // if both ARE known
          // if it includes all the chars form both 1 and 4, it is 9
          const allChars = charMap.get(1).concat(charMap.get(4));
          const charsOfOne = charMap.get(1);
          if (allChars.every((char) => mystery.includes(char))) {
            knownValues.set(mystery, 9);
            // if it includes all the chrs form 1 but not all from 4, it's 0
          } else if (charsOfOne.every((char) => mystery.includes(char))) {
            knownValues.set(mystery, 0);
            // otherwise it is 6
          } else {
            knownValues.set(mystery, 6);
            charMap.set(6, mystery.split(''));
          }
        }
      }
      if (mystery.length === 7) {
        knownValues.set(mystery, 8); // length 8 means value is 8
      }
    }

    // reset the array of mysteries to only the ones we haven't solved yet...
    mysteries = [...stubbornMysteries];
  }

  return knownValues;
};

// possible values

// missing values:
// 2, 3, 5 (5 length)
// 6, 9, 0 (6 length)

// length

// 5: 2,3,5
// length is 5 and includes both chars from 1, then it's: 3
// length is 5 and all of its chars are available in the known 6, it's 5
// otherwise, it's

// 6: 6,9,0
// length is 6 and includes both chars from 1, is either 9 or 0
// if it includes all the chars from 4, then it's 9
// otherwise it's 0
// if length is 6 and does not include both chars from 1, is 6

const testString = 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb';

const testArray = testString.split(' ');

const cipher = createCipher(testArray);

console.log({ cipher });

const encrypedOutput = 'fdgacbe cefdb cefbgd gcbe'.split(' ');

const decipherOutput = (output, decoder) => {};

const result = decipherOutput(encrypedOutput, cipher);

console.log({ result });
