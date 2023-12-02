/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
const fs = require('fs');
const readline = require('readline');

const re = /\d/g;

async function day1part1() {
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
}

async function day1part2() {
  let result = 0;

  const numbersString = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`Line: ${line}`);
    let lineNumbers = '';
    let stringBuffer = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const c of line) {
      // console.log(stringBuffer);
      // number -> add to lineNumbers
      if (!isNaN(c)) {
        lineNumbers += c;
        stringBuffer = '';
      } else {
        // add to stringBuffer
        stringBuffer += c;
        // console.log(stringBuffer);
        // search if the string buffer is the start of a number
        if (numbersString.some((n) => n.startsWith(stringBuffer))) {
          const pos = numbersString.indexOf(stringBuffer);
          if (pos !== -1) {
            lineNumbers += pos + 1;
            stringBuffer = c;
          }
        } else {
          // clean previous car
          if (stringBuffer === 'oni') {
            stringBuffer = 'ni';
          } else if (stringBuffer === 'threi') {
            stringBuffer = 'ei';
          } else if (stringBuffer === 'sevei') {
            stringBuffer = 'ei';
          } else {
            stringBuffer = c;
          }
        }
      }
    }

    console.log(`Line cleaned: ${lineNumbers}`);
    console.log(lineNumbers[0] + lineNumbers[lineNumbers.length - 1]);
    const value = parseInt(lineNumbers[0] + lineNumbers[lineNumbers.length - 1], 10);
    result += value;
  });

  lineReader.on('close', () => {
    // console.log('file closed');
    console.log(`result: ${result}`);
  });
}

async function day1part2v2() {
  const numbersString = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let result = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`Line: ${line}`);
    let lineNumbers = '';

    for (let i = 0; i < line.length; i++) {
      // console.log('i', i);
      const c = line[i];
      // number -> add to lineNumbers
      if (!isNaN(c)) {
        lineNumbers += c;
      } else {
        numbersString.some((n) => {
          // console.log('n ', n);
          // console.log('length:', n.length);
          // console.log('value', line.substring(i, i + n.length));
          if (n === line.substring(i, i + n.length)) {
            lineNumbers += `${numbersString.indexOf(n) + 1}`;
            return true;
          }
          return false;
        });
      }
    }

    console.log(`Line cleaned: ${lineNumbers}`);
    console.log(lineNumbers[0] + lineNumbers[lineNumbers.length - 1]);
    const value = parseInt(lineNumbers[0] + lineNumbers[lineNumbers.length - 1], 10);
    result += value;
  });

  lineReader.on('close', () => {
    // console.log('file closed');
    console.log(`result: ${result}`);
  });
}

// day1part1();
// day1part2();
day1part2v2();
