const fs = require('fs');
const readline = require('readline');

async function day2part1() {
  const re = /(\d+) ([a-z]+)/g;
  const matchingGame = [];
  const h = {
    blue: 14,
    green: 13,
    red: 12,
  };
  const hNumberOfDice = 14 + 13 + 12;

  const lineReader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    console.log(`Line: ${line}`);

    const id = +line.substring(5, line.indexOf(':'));
    console.log(id);
    const clonedLine = line.substring(line.indexOf(':') + 1);
    console.log(clonedLine);
    const game = clonedLine.split(';');
    console.log(game);
    const rounds = game.map((r) => {
      const dicesGroup = [...r.matchAll(re)];
      return dicesGroup.reduce((acc, g) => { acc[g[2]] = +g[1]; return acc; }, {});
    });
    console.log(rounds);

    const reject = rounds.some((r) => {
      const totalDice = (+r.blue || 0) + (+r.green || 0) + (+r.red || 0);
      console.log(totalDice);
      if (totalDice > hNumberOfDice) {
        console.log('too many dices');
        return true;
      }
      if (r.blue > h.blue || r.green > h.green || r.red > h.red) {
        console.log('too many dices of a color');
        return true;
      }

      return false;
    });

    if (!reject) {
      matchingGame.push(id);
    }
  });

  lineReader.on('close', () => {
    console.log(`result: ${matchingGame.reduce((sum, game) => sum += game, 0)}`);
  });
}

day2part1();
