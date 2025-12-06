const getRanges = (input) => input.split(',')
                       .map(r => {
                                const [start, end] = r.split('-');
                                return [Number(start), Number(end)];
                            });

const isInvalidId = (id) => {
    const len = id.length;
    if (len % 2 !== 0) return false;

    return id.slice(0, len/2) === id.slice(len/2);
}

const invalidIdSum = () => {
    const invalidIDs = [];
    let sum = 0;
    const input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"
    const ranges = getRanges(input);
    for (const [start, end ] of ranges) {
        for (let id = start; id <= end; id++) {
            if (isInvalidId(String(id))) {
                sum += id;
                invalidIDs.push(id);
            }
        }
    }
    console.log(`sum: ${sum}`);
    console.log(`bad ids ${invalidIDs}`);
}

invalidIdSum();

