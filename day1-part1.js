const fs = require('node:fs');

const MOD = 100;

const analyzeRotations = (rotations, start) => {
    let current = start;
    let zeroHits = 0;

    for (const rotate of rotations) {
        const direction = rotate[0] === 'L' ? -1 : 1;
        const distance = Number(rotate.slice(1));
        console.log(`direction :  ${direction} , distance : ${distance}`)

        let end = ( current + (direction * distance) + MOD ) % MOD;
        if (end === 0) zeroHits++;
        current = end;
    }

    console.log(`zeroHits ${zeroHits}`);
    return zeroHits;
}

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const rotations = readInput("day1.txt").split(/\r?\n/);
analyzeRotations(rotations, 50);

