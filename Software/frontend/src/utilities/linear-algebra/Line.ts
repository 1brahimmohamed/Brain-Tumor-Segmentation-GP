import Point from './Point';

class Line {
    p1: Point;
    p2: Point;
    m: number;
    c: number;

    /**
     * Constructs a Line object with the given start and end points.
     *
     * @param {Point} p1 - The start point of the line.
     * @param {Point} p2 - The end point of the line.
     */
    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.m = (p2.y - p1.y) / (p2.x - p1.x);
        this.c = p1.y - this.m * p1.x;
    }

    /**
     * Returns the length of the line.
     *
     * @returns {number} The length of the line.
     */
    length(): number {
        return this.p1.distance(this.p2);
    }

    /**
     * Returns the distance between the line and the given point.
     *
     * @param {Line} line - The line to calculate the distance to.
     * @returns {number} The distance between the line and the point.
     */
    distance(line: Line): number {
        const d = Math.abs(line.c - this.c) / Math.sqrt(1 + Math.pow(this.m, 2));
        if (isNaN(d)) return 0;
        else return d;
    }
}

export default Line;
