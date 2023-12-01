const fs = require('fs');
const readline = require('readline');

const re = /\d/g;

(async function day1() {
  let result = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`Line: ${line}`);
    const found = line.match(re);
    const value = parseInt(found[0] + found[found.length - 1], 10);
    result += value;
  });

  lineReader.on('close', () => {
    console.log('file closed');
    console.log(`result: ${result}`);
  });
}());
