//find closest but not directly connected
// union find vibes
const fs = require('node:fs');

const readInput = (path)  =>  {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

const distance = (p1, p2) => {
    return Math.sqrt(
        (p1[0] - p2[0]) ** 2 +
        (p1[1] - p2[1]) ** 2 +
        (p1[2] - p2[2]) ** 2
    );
};

const parseCoordinates = (point) => {
    return point.split(',').map(Number);
}

class UnionFind {
    constructor(size) {
        this.parent = Array(size).fill(0).map((_, i) => i);
        this.size = Array(size).fill(1);
    }

    find(x) {
        // path compression thing
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }

        return this.parent[x]; 
    }
    
    union(x, y) {
        const px = this.find(x);
        const py = this.find(y);

        if (px === py) return false;

        if (this.size[px] < this.size[py]) {
           this.parent[px] = py;
            this.size[py] += this.size[px];
        } else {
            this.parent[py] = px;
            this.size[px] += this.size[py];
        }

        return true;
    }
    
    getAllSizes() {
        const roots = new Set(this.parent.map((_, i) => this.find(i)));
        return [...roots].map(r => this.size[r]);
    }
}

const connect1 = (points) => {
    const n = points.length;
    const edges =[];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = distance(parseCoordinates(points[i]), parseCoordinates(points[j]));
            edges.push({i, j, distance: dist});
        }
    }
    // sort by distance 
    edges.sort((a, b) => a.distance - b.distance);
    const unionFind = new UnionFind(n);

    let connections = 0;
    for (const edge of edges) {
        if (connections === 1000) break;
        unionFind.union(edge.i, edge.j);
        connections++;
    }
    // part1 find top 3 circuit based on size 
    const result1 = unionFind.getAllSizes()
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, curr) => acc * curr, 1);
    
    console.log(`value1 ${result1}`);

    return result1;
}

const connect2 = (points) => {
    const n = points.length;
    const edges =[];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = distance(parseCoordinates(points[i]), parseCoordinates(points[j]));
            edges.push({i, j, distance: dist});
        }
    }

    edges.sort((a, b) => a.distance - b.distance);
    const unionFind = new UnionFind(n);


    let connections = 0;
    let lastConnection = null;
    let result2 = 0;

    for (const edge of edges) {
           const connected = unionFind.union(edge.i, edge.j);
            if (connected) {
                connections++;
                lastConnection = edge;
            }
            if (connections === n - 1) break;
    }

    if (lastConnection) {
        const [x1, y1, z1] = parseCoordinates(points[lastConnection.i]);
        const [x2, y2, z2] = parseCoordinates(points[lastConnection.j]);
        result2 = x1 * x2;
        console.log(`value2 ${result2}`);

    }
    return result2;
}

const points = readInput("day8.txt").split(/\r?\n/);

connect1(points);
connect2(points);
