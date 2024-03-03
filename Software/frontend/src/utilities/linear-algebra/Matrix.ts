import { MathUtils } from '@/utilities';
import { HelpersUtil } from '@/utilities';

export default class Matrix {
    rows: number[][];

    constructor(...rows: number[][]) {
        this.rows = rows;
    }

    get(i: number, j: number): number {
        return this.rows[i][j];
    }

    columns(): number[][] {
        return this.rows[0].map((_, i) => this.rows.map((r) => r[i]));
    }

    componentWiseOperation(func: (row: number, el: number) => number, { rows }: Matrix) {
        const newRows = rows.map((row, i) => row.map((element, j) => func(this.rows[i][j], element)));
        return new Matrix(...newRows);
    }

    add(other: Matrix): Matrix {
        return this.componentWiseOperation((a: number, b: number) => a + b, other);
    }

    subtract(other: Matrix): Matrix {
        return this.componentWiseOperation((a: number, b: number) => a - b, other);
    }

    scaleBy(number: number): Matrix {
        const newRows = this.rows.map((row) => row.map((element) => element * number));
        return new Matrix(...newRows);
    }

    multiply(other: Matrix): Matrix {
        if (this.rows[0].length !== other.rows.length) {
            throw new Error(
                'The number of columns of this matrix is not equal to the number of rows of the given matrix.'
            );
        }
        const columns = other.columns();
        const newRows = this.rows.map((row) =>
            columns.map((column) => MathUtils.sum(row.map((element, i) => element * column[i])))
        );
        return new Matrix(...newRows);
    }

    transpose(): Matrix {
        return new Matrix(...this.columns());
    }

    determinant() {
        if (this.rows.length !== this.rows[0].length) {
            throw new Error('Only matrices with the same number of rows and columns are supported.');
        }
        if (this.rows.length === 2) {
            return this.rows[0][0] * this.rows[1][1] - this.rows[0][1] * this.rows[1][0];
        }

        const parts: number[] = this.rows[0].map((coef, index) => {
            const matrixRows = this.rows
                .slice(1)
                .map((row) => [...row.slice(0, index), ...row.slice(index + 1)]);
            const matrix = new Matrix(...matrixRows);
            const result = coef * matrix.determinant();
            return index % 2 === 0 ? result : -result;
        });

        return MathUtils.sum(parts);
    }

    toDimension(dimension: number): Matrix {
        const zeros = new Array(dimension).fill(0);
        const newRows = zeros.map((_, i) =>
            zeros.map((__, j) => {
                if (this.rows[i] && this.rows[i][j] !== undefined) {
                    return this.rows[i][j];
                }
                return i === j ? 1 : 0;
            })
        );
        return new Matrix(...newRows);
    }

    components(): number[] {
        return this.rows.reduce((acc, row) => [...acc, ...row], []);
    }

    map(func: (e: number, i: number, j: number) => number): Matrix {
        return new Matrix(...this.rows.map((row, i) => row.map((element, j) => func(element, i, j))));
    }

    minor(i: number, j: number) {
        const newRows = HelpersUtil.withoutElementAtIndex(this.rows, i).map((row) =>
            HelpersUtil.withoutElementAtIndex(row, j)
        );

        const matrix = new Matrix(...newRows);
        return matrix.determinant();
    }

    cofactor(i: number, j: number) {
        const sign = Math.pow(-1, i + j);
        const minor = this.minor(i, j);
        return sign * minor;
    }

    adjugate() {
        return this.map((_: number, i: number, j: number) => this.cofactor(i, j)).transpose();
    }

    inverse() {
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("Determinant can't be  zero.");
        }
        const adjugate = this.adjugate();
        return adjugate.scaleBy(1 / determinant);
    }
}
