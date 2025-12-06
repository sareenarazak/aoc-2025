const fs = require('node:fs');

 const readInput = (path)  =>  {
     try {
         const data = fs.readFileSync(path, 'utf8');
         return data;
     } catch (err) {
         console.error(err);
     }
 }

 const compute = () => {
    const lines = readInput('day6.txt').split(/\r?\n/);
    console.log(`length ${lines.length}`)

    // all excpet last line 
    const numberLines = lines.slice(0, -1);
    const operators = lines[lines.length - 1].trim().split(/\s+/);
    // console.log(`operators ${operators}`);

    const numbers = numberLines.map(line =>
        line.trim().split(/\s+/).map(Number)
    );
    
    const transposed = numbers[0].map((n, colIndex) =>
        numbers.map(row => row[colIndex])
    );

    // console.log(`transposed ${transposed}`);
    
    return  transposed.reduce((acc, curr, index) => {
         if (operators[index] === '+') {
            acc += curr.reduce((a, b) => a + b, 0);
        } else if (operators[index] === '*') {
            acc += curr.reduce((a, b) => a * b, 1);
        }
    return acc;}, 0);
}


 console.log(`sum : ${compute()}`);