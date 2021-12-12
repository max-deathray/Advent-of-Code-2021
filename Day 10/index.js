const fs = require('fs');

const navigationSystem = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map((input) => input.split(''));

/** examples

Incomplete:
[({(<(())[]>[[{[]{<()<>> a

Valid:
TK

Corrupted: 
{([(<{}[<>[]}>{[]{[(<()>

{([<[}

**/

const openers = new Map();
openers.set('(', true);
openers.set('[', true);
openers.set('{', true);
openers.set('<', true);

const closers = new Map();
closers.set(')', '(');
closers.set(']', '[');
closers.set('}', '{');
closers.set('>', '<');

const isOpener = (character) => openers.has(character);

const processLine = (line) => {
  const corruptChars = [];
  const stack = [];

  // loop over array

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // if it's an opener, just add it to the stack
    if (isOpener(char)) {
      stack.push(char);
    } else {
      // if it's not an opener, we can assume it is a closer
      // if it is a closer, make sure that the the most recent
      // char added to the stack is it's match
      const lastChar = stack.slice(-1)[0];

      // if we closing something, don't add this char and remove
      // the last Char from the stack
      if (lastChar === closers.get(char)) {
        stack.pop();
      } else {
        // I think we've found a corrupt line
        // so add the char that is out of place to the corrupt chars storage!
        corruptChars.push(char);
      }
    }
  }
  // if valid or incomplete, return empty string?

  // if corrupted, return first corrupt char
  return corruptChars.length ? corruptChars[0] : '';
};

// const result = processLine(navigationSystem[0]);

const legend = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const answerArray = navigationSystem
  .map(processLine)
  .filter(Boolean)
  .map((key) => legend[key]);

const answerValue = answerArray.reduce((a, b) => a + b);

console.log({ answerValue });
