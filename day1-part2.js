const fs = require('node:fs');

const MOD = 100;

const analyzeRotations = (rotations, start) => {
    let current = start;
    let zeroHits = 0;

    for (const rotate of rotations) {
        const direction = rotate[0] === 'L' ? -1 : 1;
        const distance = Number(rotate.slice(1));

        // if (direction === -1) {
        //     let zeroPassCount = Math.floor(distance / MOD);
                        
        //     // special case current === 0
        //     if (current === 0 ) zeroPassCount--;
        //     zeroHits += zeroPassCount;

        //     if (current <= (distance % MOD)) zeroHits++;

        // } else {
        //     let zeroPassCount = Math.floor((distance + current) / MOD);
        //     zeroHits += zeroPassCount;
        //     console.log(`zeroHits :  ${zeroHits} , zeroPassCount : ${zeroPassCount}`)
        //     console.log(`current :  ${current} , distance : ${distance} final : ${current + distance}`)

        // }
      
        if (direction === 1) {
            // RIGHT rotation
            // number of zeros passed = how many times dial crosses multiples of 100
            let firstHit = (MOD - current) % MOD; // steps to first zero
            if (distance >= firstHit) {
                // first hit happens
                zeroHits += 1 + Math.floor((distance - firstHit) / MOD);
            }
        } else {
            // LEFT rotation
            // number of zeros passed = steps to reach zero from current
            let firstHit = current; // steps to zero
            if (distance >= firstHit) {
                zeroHits += 1 + Math.floor((distance - firstHit) / MOD);
            }
        }
        let end = ( current + (direction * distance) + MOD ) % MOD;
                // if (end === 0) zeroHits++;  // landing on zero counts

        current = end;
                            console.log(`curreent ${current}`);

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



  //     if (current === 0) zeroClicks--;        }
        // console.log(`direction :  ${direction} , distance : ${distance}`)

        // /***
        //  * 
        //  */
        // if(distance >= MOD) {
        //     const zeroPassCount = Math.floor(distance / MOD);
        //     zeroHits += zeroPassCount;

        // } else {
        //     if (direction === -1) {
        //         if( current - distance < 0) {
        //         zeroHits++;
        //         }
        //             console.log(`zeroHits ${zeroHits}`);


        //     }  else {
        //                         if( current + distance > MOD) {
        //                                    const zeroPassCount = Math.floor((current + distance) / MOD);
        //     zeroHits += zeroPassCount;
        //                         }

        //     }
        // }
        // if  (direction === 1) {  
        //     let zeroClicks = Math.floor((distance + current) / MOD);
        //             console.log(`current :  ${current} , zeroClicks : ${zeroClicks}`)
        //     if (current === 0) zeroClicks--;

        //     zeroHits += zeroClicks;

        // } else {
        //     let zeroClicks = Math.floor(distance / MOD);
        //     if (current === 0) zeroClicks--;
        //     zeroHits += zeroClicks;

        //     if( current < ( distance % MOD )) {
        //         zeroHits++;
        //     }

           
        // }