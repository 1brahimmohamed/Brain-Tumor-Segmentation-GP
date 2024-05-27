import {MathUtils} from '@/utilities';
import {HelpersUtil} from '@/utilities';

export default class Matrix {
    rows: number[][];


    /**
     * Creates a new matrix.
     * @param {number[][]} rows - The rows of the matrix.
     */
    constructor(...rows: number[][]) {
        this.rows = rows;
    }

    /**
     * get value at i-th row and j-th column
     * @param {number} i - The row index.
     * @param {number} j - The column index.
     */
    get(i: number, j: number): number {
        return this.rows[i][j];
    }

    /**
     * gets the columns of the matrix
     * @returns {number[][]} - The columns of the matrix.
     */
    columns(): number[][] {
        return this.rows[0].map((_, i) => this.rows.map((r) => r[i]));
    }

    /**
     * Applies a component-wise operation to the current matrix and another matrix.
     *
     * @param {(row: number, el: number) => number} func - The function to apply to each pair of elements.
     * @param {Matrix} other - The other matrix to apply the operation to.
     * @return {Matrix} A new matrix with the result of the component-wise operation.
     */
    componentWiseOperation(func: (row: number, el: number) => number, {rows}: Matrix): Matrix {
        const newRows = rows.map((row, i) => row.map((element, j) => func(this.rows[i][j], element)));
        return new Matrix(...newRows);
    }

    /**
     * Adds another matrix to this matrix element-wise and returns the result.
     *
     * @param {Matrix} other - The matrix to be added.
     * @return {Matrix} - The resulting matrix after the addition.
     */
    add(other: Matrix): Matrix {
        return this.componentWiseOperation((a: number, b: number) => a + b, other);
    }

    /**
     * Subtracts another matrix from this matrix component-wise.
     *
     * @param {Matrix} other - The matrix to subtract from this matrix.
     * @return {Matrix} A new matrix that is the result of subtracting the other matrix from this matrix.
     */
    subtract(other: Matrix): Matrix {
        return this.componentWiseOperation((a: number, b: number) => a - b, other);
    }

    /**
     * Scales the matrix by a given number.
     *
     * @param {number} number - The number to scale the matrix by.
     * @return {Matrix} - A new matrix with the scaled values.
     */
    scaleBy(number: number): Matrix {
        const newRows = this.rows.map((row) => row.map((element) => element * number));
        return new Matrix(...newRows);
    }

    /**
     * Multiplies this matrix by another matrix and returns the result.
     *
     * @param {Matrix} other - The matrix to multiply with.
     * @return {Matrix} The resulting matrix after the multiplication.
     * @throws {Error} If the number of columns of this matrix is not equal to the number of rows of the given matrix.
     */
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

    /**
     * Transposes the current matrix and returns a new matrix with the transposed values.
     *
     * @return {Matrix} A new matrix with the transposed values.
     */
    transpose(): Matrix {
        return new Matrix(...this.columns());
    }

    /**
     * Calculates the determinant of the matrix.
     *
     * @return {number} The determinant of the matrix.
     * @throws {Error} If the matrix is not square.
     */
    determinant(): number {
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

    /**
     * Returns a new Matrix object with the specified dimension, filled with zeros.
     * If a value exists in the original matrix at a specific position, it is copied
     * over to the new matrix. If no value exists, a 1 is placed on the diagonal,
     * and 0's are placed elsewhere.
     *
     * @param {number} dimension - The desired dimension of the new Matrix object.
     * @return {Matrix} A new Matrix object with the specified dimension.
     */
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

    /**
     * Returns an array containing all the elements of the matrix in row-major order.
     *
     * @return {number[]} An array of numbers representing the matrix elements.
     */
    components(): number[] {
        return this.rows.reduce((acc, row) => [...acc, ...row], []);
    }

    /**
     * Maps the elements of the matrix using the provided function and returns a new Matrix object.
     *
     * @param {(e: number, i: number, j: number) => number} func - The function to apply to each element of the matrix.
     *                                                           The function takes three parameters: the element value,
     *                                                           the row index, and the column index.
     * @return {Matrix} - The new Matrix object with the mapped elements.
     */
    map(func: (e: number, i: number, j: number) => number): Matrix {
        return new Matrix(...this.rows.map((row, i) => row.map((element, j) => func(element, i, j))));
    }


    /**
     * Calculates the minor of a matrix at the specified row and column indices.
     *
     * @param {number} i - The index of the row to exclude.
     * @param {number} j - The index of the column to exclude.
     * @return {number} The determinant of the matrix formed by excluding the specified row and column.
     */
    minor(i: number, j: number) {
        const newRows = HelpersUtil.withoutElementAtIndex(this.rows, i).map((row) =>
            HelpersUtil.withoutElementAtIndex(row, j)
        );

        const matrix = new Matrix(...newRows);
        return matrix.determinant();
    }

    /**
     * Calculates the cofactor of the element at the specified row and column.
     *
     * @param {number} i - The row index.
     * @param {number} j - The column index.
     * @return {number} The cofactor value.
     */
    cofactor(i: number, j: number) {
        const sign = Math.pow(-1, i + j);
        const minor = this.minor(i, j);
        return sign * minor;
    }

    /**
     * Calculates the adjugate of the matrix.
     *
     * @return {Matrix} The adjugate matrix.
     */
    adjugate() {
        return this.map((_: number, i: number, j: number) => this.cofactor(i, j)).transpose();
    }

    /**
     * Calculates the inverse of the matrix.
     *
     * @return {Matrix} The inverse matrix.
     * @throws {Error} If the determinant of the matrix is zero.
     */
    inverse(): Matrix {
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("Determinant can't be  zero.");
        }
        const adjugate = this.adjugate();
        return adjugate.scaleBy(1 / determinant);
    }
}
