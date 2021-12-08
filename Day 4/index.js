const { count } = require('console');
const fs = require('fs');

const bingoInput = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
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

// console.log({ drawnNumbers, cards });

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
    this.isComplete = false;
  }

  addMarkedNumber(number) {
    const position = this.numberToPosition.get(number);
    // if the number is not on the card at all, early exit
    if (!position) {
      return;
    }
    // otherwise, mark which row and column it is in
    this.rows[position.row]++;
    this.columns[position.column]++;
    if (
      this.rows[position.row] === this.cardSize ||
      this.columns[position.column].length === this.cardSize
    ) {
      this.isComplete = true;
    }
  }

  showMap() {
    for (const item of this.numberToPosition) {
      console.log(item, this.numberToPosition.get(item));
    }
  }
}

cards = cards.map((x) => new Card(x));

let actuallyDrawn = [];

const partOne = (cards, drawnNumbers) => {
  let winningCard;

  for (const drawn of drawnNumbers) {
    let finished = false;
    actuallyDrawn.push(drawn);
    for (const card of cards) {
      card.addMarkedNumber(drawn);

      if (card.isComplete) {
        winningCard = card;

        finished = true;
        break;
      }
    }
    if (finished) break;
  }

  return winningCard;
};

const winningCard = partOne(cards, drawnNumbers);

winningCard.showMap();

const unmarkedTotal = winningCard.numbers
  .filter((number) => !actuallyDrawn.includes(number))
  .reduce((acc, el) => acc + el, 0);

const lastNumberDrawn = actuallyDrawn.slice(-1)[0];

console.log({ unmarkedTotal, lastNumberDrawn });

console.log(unmarkedTotal * lastNumberDrawn);
