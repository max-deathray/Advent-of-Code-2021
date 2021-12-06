const { count } = require('console');
const fs = require('fs');

const bingoInput = fs
  .readFileSync('testInput.txt', { encoding: 'utf-8' })
  // split on double link break
  .split('\n\n')
  // remove falsy values (empty strings)
  .filter((x) => Boolean(x))
  // trim extra white space
  .map((x) =>
    x
      .replace(/[\n ,]+/g, ' ')
      .trim()
      .split(' ')
      // convert strings to number
      .map(Number)
  );

let [drawnNumbers, ...cards] = bingoInput;

class Card {
  constructor(numbers) {
    this.cardSize = 5;
    this.numbers = numbers;
    this.numberToPosition = new Map();
    for (let i = 0; i < this.numbers.length; i++) {
      const number = this.numbers[i];
      this.numberToPosition.set(number, {
        row: Math.floor(i / this.cardSize),
        column: i % this.cardSize,
      });
    }
    this.rows = new Array(this.cardSize).fill(0);
    this.columns = new Array(this.cardSize).fill(0);
  }

  addMarkedNumber(n) {}

  showMap() {
    for (const item of this.numberToPosition) {
      console.log(item, this.numberToPosition.get(item));
    }
  }
}

cards = cards.map((x) => new Card(x));

// console.log(cards);

console.log(cards[0].showMap());

// console.log({ drawnNumbers, cards });
