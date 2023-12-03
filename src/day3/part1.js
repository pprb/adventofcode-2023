/* eslint-disable no-plusplus */
const fs = require('fs');
const readline = require('readline');

async function day3part1() {
  const matrix = [];
  const re = /[-!$%^&*()_+|~=`{}[\]:";'<>?,#@/]/g;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`Line: ${line}`);
    matrix.push(line.split(''));
  });

  lineReader.on('close', () => {
    console.log(matrix);
    let result = 0;

    const searchSymbol = (idx, start, end) => {
      console.log('searchSymbol');
      // console.log(`${idx}, ${start}, ${end}`);
      // get number
      const num = +matrix[idx].slice(start, end + 1).join('');
      console.log(num);
      // console.log(matrix[0].length);
      // start coord / end coord
      const startX = start === 0 ? start : start - 1;
      const startY = +idx === 0 ? 0 : +idx - 1;
      const endX = +end === matrix[0].length - 1 ? +end : +end + 1;
      const endY = +idx === matrix[0].length - 1 ? +idx : +idx + 1;
      // console.log(startX);
      // console.log(startY);
      // console.log(endX);
      // console.log(endY);

      // get matching symbol
      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          // console.log(matrix[y][x]);
          if (matrix[y][x].match(re)) {
            console.log('it matches');
            // if matching a symbol, add num to result
            result += num;
            break;
          }
        }
      }
    };

    matrix.forEach((r, idx) => {
      let start;
      let end;
      r.forEach((c, cidx) => {
        // console.log(c);
        // not a number
        if (isNaN(c)) {
          // console.log('isNan');
          // previous was number => search symbol
          if (start !== undefined) {
            searchSymbol(idx, start, end);
            start = undefined;
            end = undefined;
          }
        } else {
          // number
          // first number
          if (start === undefined) {
            // console.log('first');
            start = cidx;
            end = cidx;
          } else {
            // console.log('next');
            // next number
            end = cidx;
          }
          // last car of orw
          if (cidx + 1 === r.length) {
            // console.log('end line');
            searchSymbol(idx, start, end);
            start = undefined;
            end = undefined;
          }
        }
      });
    });

    console.log(result);
  });
}

day3part1();
