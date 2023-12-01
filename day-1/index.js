import fs from "fs";

let sum1 = 0,
    sum2 = 0;

const spelledOutNumbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

fs.readFile("day-1/input.txt", "utf8", (err, data) => {
    const rows = data.split("\n");
    for (const row of rows) {
        const numbersInText = row.match(/\d/g);
        const rowSum = numbersInText[0] + numbersInText[numbersInText.length-1];
        sum1 += Number(rowSum);
    }
    console.log(sum1);

    for (const row of rows) {
        const dict = {};
        row.split("").forEach((char, i) => {
            if (/\d/.exec(char) != null) {
                dict[i] = Number(char);
            }
        });
        for (const spelledNumber of Object.keys(spelledOutNumbers)) {
            const [firstIndex, lastIndex] = [row.indexOf(spelledNumber), row.lastIndexOf(spelledNumber)];
            if (firstIndex !== -1) {
                dict[firstIndex] = spelledOutNumbers[spelledNumber];
            }
            if (lastIndex !== -1) {
                dict[lastIndex] = spelledOutNumbers[spelledNumber];
            }
        }
        const orderedDict = Object.keys(dict).sort().reduce(
            (obj, key) => {
              obj[key] = dict[key];
              return obj;
            }, {}
        );
        const firstNumber = orderedDict[Object.keys(orderedDict)[0]];
        const lastNumber = orderedDict[Object.keys(orderedDict)[Object.keys(orderedDict).length - 1]];
        const rowSum = `${firstNumber}${lastNumber}`;
        sum2 += Number(rowSum);
    }
    console.log(sum2);
})