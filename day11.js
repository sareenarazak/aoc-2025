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

const numOfPaths = (graph, src, dest) => {
    if (src === dest) return 1;

    let count = 0;

    for (const neighbour of graph.get(src)) {
        count += numOfPaths(graph, neighbour, dest);
    }
    return count;
}

const tuples = readInput("day11.txt")
    .split(/\r?\n/)
    .map(line => line.trim().split(':'))
    .map(edges => makeTheThing(edges));

const graph = new Map(tuples);

console.log(`number of paths. ${numOfPaths(graph, "you", "out")}`)