
const fs = require('node:fs');
// for finding max --> keep track of the max digit (sans the last digit) and the index
// then find the max digit for the rest of the string starting at index+1 

maxDigitWithIndex = (number) => {
    const digits = [...number].map(Number);

    // uhhh -_-
    const maxDigit = Math.max(...digits);
    const maxIndex = digits.findIndex(d => d === maxDigit);

    return [maxDigit, maxIndex];
}

maxJoltage = (battery) => {
    const [maxDigit, maxIndex] =  maxDigitWithIndex(battery.slice(0, -1));
    const [nextMaxDigit, nextMaxIndex] =  maxDigitWithIndex(battery.slice(maxIndex + 1));

    return maxDigit * 10 + nextMaxDigit;
}

// :D 
totJolt = (batteries) => {
    let total = 0;

    batteries.forEach(bat => {
        total += maxJoltage(bat);
    });
    
    return total;
}

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const batteries = readInput("day3.txt").split(/\r?\n/);
console.log(totJolt(batteries));
