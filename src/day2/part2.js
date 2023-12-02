const fs = require('fs');
const readline = require('readline');

async function day2part2() {
  const re = /(\d+) ([a-z]+)/g;
  const diceByGames = [];

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

    const diceByGame = { blue: 0, red: 0, green: 0 };

    rounds.forEach((r) => {
      if (r.blue > diceByGame.blue) {
        diceByGame.blue = r.blue;
      }
      if (r.red > diceByGame.red) {
        diceByGame.red = r.red;
      }
      if (r.green > diceByGame.green) {
        diceByGame.green = r.green;
      }
    });

    diceByGames.push(diceByGame);
  });

  lineReader.on('close', () => {
    console.log(`result: ${diceByGames.reduce((sum, game) => sum += game.blue * game.red * game.green, 0)}`);
  });
}

day2part2();
