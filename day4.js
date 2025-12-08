// bfs counting -- get the grid 2d
// check each cell for either '.' or '@'
// if '@' --> count in 8 directions [[1,1],[1,-1],[-1,1],[0,1],[1,0],[-1,0],[0,-1]] 
// w boundary checks if any time count is > 3 break, else count towards the final accessible number of tp 

const fs = require('node:fs');

const OFFSETS = [[1,1],[-1, -1],[1,-1],[-1,1],[0,1],[1,0],[-1,0],[0,-1]];

const countNeighbours = (grid, r, c) =>
  OFFSETS.reduce((acc, [dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    return (grid[nr]?.[nc] === '@') ? acc + 1 : acc;
  }, 0);

const isAccessible = (grid, r, c) =>
  countNeighbours(grid, r, c) < 4;

const forkLiftableRolls = (grid) => {
    let count = 0;
    const liftableRolls = [];
    for (let r = 0; r < grid.length ; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if(grid[r][c] === '@' &&
                isAccessible(grid, r, c)) {
                liftableRolls.push([r, c])
                count++
            }
        }
    }
    // for part2 , mark all as X
    for (const [r, c] of liftableRolls) {
        grid[r][c] = '.';
    }
    console.log(`count ${count}`);
    return count;
}

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const lines = readInput("day4.txt").split(/\r?\n/);
const grid = lines.map(line => line.split(""));

// part 2
let count = forkLiftableRolls(grid);
let total = 0;
while (count > 0) {
    total += count
    count = forkLiftableRolls(grid);
}
console.log(`total : ${total}`);