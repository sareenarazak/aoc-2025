const fs = require('node:fs');

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const makeTheThing = (edges) => {
    const node = edges[0].trim();
    const neighbours = edges[1] ? edges[1].trim().split(' ') : [];
    return [node, neighbours];
}

const numOfPaths = (graph, src, dest, hasDAC, hasFFT, memo) => {
    const key = `${src}-${hasDAC}-${hasFFT}`;

    if (memo.has(key)) return memo.get(key);

    // this value can be passed down to all the paths from now on 
    if (src === "dac") hasDAC = true;
    if (src === "fft") hasFFT = true;

    if (src === dest) {
        const count = (hasDAC && hasFFT) ? 1 : 0;
        memo.set(key, count);
        return count;
    }

    let count = 0;
    const neighbours = graph.get(src) || [];
    for (const fren of neighbours) {
        count += numOfPaths(graph, fren, dest, hasDAC, hasFFT, memo);
    }

    memo.set(key, count);
    return count;
}

const tuples = readInput("day11.txt")
    .split(/\r?\n/)
    .map(line => line.trim().split(':'))
    .map(edges => makeTheThing(edges));

const graph = new Map(tuples);

//part 1 
// console.log(`number of paths. ${numOfPaths(graph, "you", "out")}`)

// part 2 
// keep track of the path and at the end of the path check for the existence of dac and fft
console.log(`number of paths. ${numOfPaths(graph, "svr", "out", false, false, new Map())}`)
