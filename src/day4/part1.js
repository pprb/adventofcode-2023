/* eslint-disable no-plusplus */
const fs = require('fs');
const readline = require('readline');

async function day4part1() {
  let result = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input1.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`${line}`);
    // remove start
    const card = line.substring(8).split('|');

    const winningNumbers = card[0].split(' ').filter((n) => n.length);
    const cardNumbers = card[1].split(' ').filter((n) => n.length);
    const winningNumbersInCard = winningNumbers.filter((n) => cardNumbers.includes(n));

    result += winningNumbersInCard.length ? 2 ** (winningNumbersInCard.length - 1) : 0;
  });

  lineReader.on('close', () => {
    console.log(result);
  });
}

day4part1();
