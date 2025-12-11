const fs = require('node:fs');

const readInput = path => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
  }
};

const makeTheThing = (line) => {
  const lights = line.match(/\[(.*?)\]/)?.[1];

  const wirings = [...line.matchAll(/\((.*?)\)/g)]
    .map(m => m[1] ? m[1].split(',').map(Number) : []);

  const joltages = line.match(/\{(.*?)\}/)?.[1]
    ?.split(',')
    .map(Number) ?? [];
  return { lights, wirings, joltages };
};

const minButtonPress = (light, wirings) => {
  const target = [...light].reduce(
    (acc, curr, i) => acc | (curr === '#' ? 1 << i : 0),
    0
  );

  const wiringsMask = wirings.map(wire => 
    wire.reduce((mask, idx) =>
         mask | (1 << idx), 0)
  );

  const visited = new Map([[0, 0]]);
  // pair is current state,shortest numb of presses to state 
  const queue = [[0, 0]]; 

  while (queue.length) {
    const [state, presses] = queue.shift();

    if (state === target) return presses;

    for (const mask of wiringsMask) {
      const next = state ^ mask;

      if (!visited.has(next) || visited.get(next) > presses + 1) {
        visited.set(next, presses + 1);
        queue.push([next, presses + 1]);
      }
    }
  }
  return 0; 
}

const getKey = input => input.join(',');

const dfs = (current,target, wirings, memo) => {
    const key = getKey(current);

    if (memo.has(key)) return memo.get(key);

    if (current.every((jolt, i) => jolt === target[i])) return 0;

    let minPresses = Infinity;

    for (const wire of wirings) {

        // UGHHH DO NOT FORGET TO COPY
        const next = [...current]; 
        
        let reachable = true;

      for (const w of wire) {
        next[w]++;
        if (next[w] > target[w]) {
          reachable = false;
          break;
        }
      }

      if (!reachable) continue;

      const presses = 1 + dfs(next, target, wirings, memo); 
      if (presses < minPresses) minPresses = presses;
    }

    memo.set(key, minPresses);
    return minPresses;
};

const minJoltagePress = (joltages, wirings) => {
  const n = joltages.length;
  const memo = new Map();
  
  return dfs(Array(n).fill(0), joltages, wirings, memo);
};

const input = readInput("day10.txt")
  .split(/\r?\n/)
  .filter(Boolean)
  .map(makeTheThing);

let total1 = 0;
// part 1
for (const { lights, wirings, joltages } of input) {
  total1 += minButtonPress(lights, wirings);
}

console.log(`part 1 ${total1}`);

let total2 = 0;
// part 2 
for (const { lights, wirings, joltages } of input) {
  total2 += minJoltagePress(joltages, wirings);
}

console.log(`part 2 ${total2}`);
