
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

maxJoltage = (battery, count) => {
    let maxJoltage = 0;
    let start = 0; 
    while(count > 0) {
        const end = battery.length - count + 1;
        // console.log(`considering ${battery.slice(start, end)}`);
        const [digit, index] =  maxDigitWithIndex(battery.slice(start, end));
        start += index + 1; // move start +1 after the max digit index 

        maxJoltage  += (10 ** (count - 1)) * digit;
        count--;
    }


    return maxJoltage;
}

// :D 
totJolt = (batteries, count = 12) => {
    let total = 0;


    batteries.forEach(bat => {
        total += maxJoltage(bat, count);
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
console.log(`part 1: ${totJolt(batteries, 2)}`);
console.log(`part 2 ${totJolt(batteries)}`);

