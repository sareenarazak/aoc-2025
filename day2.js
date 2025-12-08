const getRanges = (input) => input.split(',')
                       .map(r => {
                                const [start, end] = r.split('-');
                                return [Number(start), Number(end)];
                            });

const isInvalidId = (id, count) => {
    if (id.length % count !== 0) return false;
    const part = id.slice(0, id.length / count);
    return part.repeat(count) === id;
}

const invalidIdSum = () => {
    const invalidIDs = [];
    let sum = 0;
    const input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"
    const ranges = getRanges(input);
    for (const [start, end ] of ranges) {
        for (let num = start; num <= end; num++) {
            const id = String(num);
            // part 2 
            for (let count = 2; count <= id.length; count++) {
                 if (isInvalidId(id, count)) {
                    invalidIDs.push(id);
                     sum += num;
                     break; 
                }
            }
        }
    }

    console.log(`sum: ${sum}`);
    console.log(`bad ids ${invalidIDs}`);
}

invalidIdSum();

