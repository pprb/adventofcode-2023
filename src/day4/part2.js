/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const fs = require('fs');
const readline = require('readline');

async function day4part1() {
  const buffer = {};
  let lastId = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input1.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`${line}`);
    // remove start
    const id = +line.substring(5, line.indexOf(':'));
    const card = line.substring(8).split('|');

    const winningNumbers = card[0].split(' ').filter((n) => n.length);
    const cardNumbers = card[1].split(' ').filter((n) => n.length);
    const winningNumbersInCard = winningNumbers.filter((n) => cardNumbers.includes(n)).length;

    console.log(winningNumbersInCard);

    if (!buffer[id]) {
      buffer[id] = 1;
    }

    console.log(buffer);

    if (winningNumbersInCard) {
      for (let i = 1; i <= winningNumbersInCard; i++) {
        buffer[id + i] = buffer[id + i] === undefined ? 1 + buffer[id] : buffer[id + i] + buffer[id];
      }
    }
    console.log(buffer);
    lastId = id;
  });

  lineReader.on('close', () => {
    let result = 0;
    Object.keys(buffer).forEach((key) => {
      if (+key <= lastId) {
        result += buffer[key];
      }
    });
    console.log(result);
  });
}

day4part1();
