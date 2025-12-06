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

    for (let r = 0; r < grid.length ; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if(grid[r][c] === '@' &&
                isAccessible(grid, r, c)) {
                count++
            }
        }
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

forkLiftableRolls(grid)
