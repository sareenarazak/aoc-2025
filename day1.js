const fs = require('node:fs');

const MOD = 100;

const analyzeRotations1 = (rotations, start) => {
    let current = start;
    let zeroHits = 0;

    for (const rotate of rotations) {
        const direction = rotate[0] === 'L' ? -1 : 1;
        const distance = Number(rotate.slice(1));

        let end = ( current + (direction * distance) + MOD ) % MOD;
        if (end === 0) zeroHits++;
        current = end;
    }

    return zeroHits;
}

const analyzeRotations2 = (rotations, start) => {
    let current = start;
    let zeroClicks = 0;
    for (const rotate of rotations) {
        const direction = rotate[0] === 'L' ? -1 : 1;
        const distance = Number(rotate.slice(1));
        const move = direction * distance;

        zeroClicks += Math.floor(distance/MOD);
        const remainder = move % MOD;

        if (current + remainder < 0 || current + remainder > MOD) {
            if (current !== 0) zeroClicks += 1;
        }

        const end = ((current + move) % MOD + MOD) % MOD;
        if (end === 0) zeroClicks += 1;

        current = end;
    }

    console.log(`zeroHits ${zeroClicks}`);
    return zeroClicks;
};

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const rotations = readInput("day1.txt").split(/\r?\n/);
analyzeRotations1(rotations, 50);

analyzeRotations2(rotations, 50);
