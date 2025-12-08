// merge ranges, do i sort first and then compare the adjacent ranges to merge ? 
// then check each number whether it exists in the sorted ranges 
// dont really wanna do any search algo right now
// 2-20 3-25 29-30
const fs = require('node:fs');

const sortAndMergeRanges = (ranges) => {
    ranges.sort((a, b) => a[0] - b[0]);
    console.log(`sorted : ${ranges}`);
    mergedRanges = [];

    for (const range of ranges) {
        const mergedSize = mergedRanges.length;
        // if first element or no overlap with last merged range
        if (mergedSize === 0 || mergedRanges[mergedSize-1][1] < range[0]) {
            mergedRanges.push(range);
        } else {
            // overlap case, merge 
            mergedRanges[mergedSize - 1][1] = Math.max(mergedRanges[mergedSize - 1][1],range[1]);
        }
    }
    console.log(`merged : ${mergedRanges}`);
    return mergedRanges;
 }

 const readInput = (path)  =>  {
     try {
         const data = fs.readFileSync(path, 'utf8');
         return data;
     } catch (err) {
         console.error(err);
     }
 }

const lines = readInput('day5.txt').split(/\r?\n/); 

const ranges = lines
    .filter(l => l.includes('-'))
    .map(l => l.split('-').map(Number));

const ids = lines
    .filter(l => l && !l.includes('-'))
    .map(Number);

const total = (ranges, ids) => {
    let count = 0; 
    const merged = sortAndMergeRanges(ranges);

    for (const id of ids) {
        // is id in any of the ranges --> start <= id <= end
        if(merged.some(range => id >= range[0] && id <= range[1])) count++;
    }
    console.log(`freshhh ^-^ ${count}`);
    return count;
}

// total(ranges,ids);
//2 -4 ==? 3
//part 2
const merged = sortAndMergeRanges(ranges);
const sum = merged.reduce((acc, curr) =>  acc + ( curr[1] - curr[0] + 1 ), 0);

console.log(`total fresh : ${sum}`);