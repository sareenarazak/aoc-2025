const fs = require('node:fs');

 const readInput = (path)  =>  {
     try {
         const data = fs.readFileSync(path, 'utf8');
         return data;
     } catch (err) {
         console.error(err);
     }
 }

const findEntry = (matrix) => {
    const row = matrix.findIndex(row => row.includes('S'));
    if (row !== -1) {
        return [row, matrix[row].indexOf('S')]
    }
    return [-1, -1];
} 

// for each cell compute the timelines possible if a particle hits 
// store in mem (row + 1) to avoid recalc
// start from bottom row (where the value is 1) and calculate for all rows
//  '.' or 'S' copy value from cell below -- '.' does not cause a new timeline 
//  '^' add up left n right timeline counts 

const timelines = (matrix) => {
    const entry = findEntry(matrix);
    console.log(`entry point : ${entry}`);

    const rows = matrix.length;
    const cols = matrix[0].length;
    
    const mem = Array.from({ length: rows + 1 }, () => Array(cols).fill(0));
    for (let c = 0; c < cols; c++) mem[rows][c] = 1;


        for (let r = rows - 1; r >= 0; r--) {
            for (let c = 0; c < cols; c++) {
                const cell = matrix[r][c];           
                if (cell === '.' || cell === 'S') {
                    mem[r][c] = mem[r + 1][c];  
                } else if (cell === '^') {
                    const left = c > 0 ? mem[r + 1][c - 1] : 0;
                    const right = c < cols - 1 ? mem[r + 1][c + 1] : 0;
                    mem[r][c] = left + right;
                }
        }
    }
    
    // final timeline count value at the entry point
    const timelines = mem[entry[0]][entry[1]];
    console.log(`timelines : ${timelines}`);
    return timelines;
}

const traverse = (matrix) => {
    const entry = findEntry(matrix);
    console.log(`entry point : ${entry}`);
    let split = 0;
    const stack = [];
    const visited = new Set();
    stack.push([entry[0] + 1, entry[1]]);

    while (stack.length !== 0) {
        const current = stack.pop();

        let row = current[0];
        let col = current [1];
        // [1, 0] travel down while within bounds and  '.'

        while (row < matrix.length && !visited.has(`${row}-${col}`) &&  matrix[row][col] === '.') {
            visited.add(`${row}-${col}`);
            row++;        }

        if (row === matrix.length ) continue; // this means we reached the bottom of matrix

        // split logic
        if(matrix[row][col] === '^' &&  !visited.has(`${row}-${col}`)) {
            visited.add(`${row}-${col}`);
            split++; 
            // split means [0, 1] [0, -1]
            const rightCol = col + 1;
            const leftCol = col - 1; 
            if(rightCol < matrix[0].length && !visited.has(`${row}-${rightCol}`)) stack.push([row, rightCol]);
            if(leftCol > 0 && !visited.has(`${row}-${leftCol}`)) stack.push([row, leftCol]);
        }
    }

    console.log(`split count : ${split}`);
}

const lines = readInput('day7.txt').split(/\r?\n/);
const input = lines.map(line => line.split(''));

// traverse(input);
timelines(input);