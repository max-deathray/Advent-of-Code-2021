const fs = require('fs');

const entries = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');

// console.log({ entries });

const outputFromEntries = entries.map((string) => {
  const [signals, output] = string.split(' | ');
  return output.split(' ');
});

console.log({ outputFromEntries });

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

console.log({ count });
