import fs from "fs";

const possible = {
    red: 12,
    green: 13,
    blue: 14
};

const possibleGameIds = [];

const powers = [];

fs.readFile("day-2/input.txt", "utf8", (err, data) => {
    const rows = data.split("\n");
    for (const row of rows) {
        const [id] = row.split(":")[0].match(/\d+/g);
        const aGames = row.split(":")[1].split(";");
        let bPossible = true;
        const minimum = {
            red: 1,
            green: 1,
            blue: 1
        };
        for (const game of aGames) {
            const [red, green, blue] = [game.match(/\d+ red/g)?.[0].match(/\d+/g), game.match(/\d+ green/g)?.[0].match(/\d+/g), game.match(/\d+ blue/g)?.[0].match(/\d+/g)];
            if (red > minimum.red) { minimum.red = Number(red) }
            if (green > minimum.green) { minimum.green = Number(green) }
            if (blue > minimum.blue) { minimum.blue = Number(blue) }
            if (Number(red) > possible.red ||
            Number(green) > possible.green ||
            Number(blue) > possible.blue) {
                bPossible = false;
            }
        }
        const power = minimum.red * minimum.green * minimum.blue;
        powers.push(power);
        if (bPossible) {
            possibleGameIds.push(id);
        }
    }
    const sum = possibleGameIds.reduce((partialSum, curr) => partialSum + Number(curr), 0);
    const powerSum = powers.reduce((partialPowerSum, curr) => partialPowerSum + curr, 0);
    console.log(sum);
    console.log(powerSum);

});