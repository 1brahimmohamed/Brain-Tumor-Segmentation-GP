import Point from './Point';

class Line {
    p1: Point;
    p2: Point;
    m: number;
    c: number;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.m = (p2.y - p1.y) / (p2.x - p1.x);
        this.c = p1.y - this.m * p1.x;
    }

    length() {
        return this.p1.distance(this.p2);
    }

    distance(line: Line) {
        const d = Math.abs(line.c - this.c) / Math.sqrt(1 + Math.pow(this.m, 2));
        if (isNaN(d)) return 0;
        else return d;
    }
}

export default Line;
