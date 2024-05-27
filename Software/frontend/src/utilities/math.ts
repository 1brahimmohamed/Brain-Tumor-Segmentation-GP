const EPSILON = 1e-6;

class MathUtils {
    /**
     * Check if two numbers are equal within a certain epsilon
     * @param {number} first - first number
     * @param {number} second - second number
     * @param {number} epsilon - epsilon value
     * @returns {boolean} - true if the numbers are equal, false otherwise
     */
    public static areEqual = (first: number, second: number, epsilon: number = EPSILON): boolean =>
        Math.abs(first - second) < epsilon;

    /**
     * Check if a number is nearly zero
     * @param {number} value - number to check
     */
    public static isNearlyZero = (value: number) => Math.abs(value) < EPSILON;

    /**
     * Convert radians to degrees
     * @param {number} radians - radians
     */
    public static toDegrees = (radians: number) => (radians * 180) / Math.PI;

    /**
     * Convert degrees to radians
     * @param {number} degrees - degrees
     */
    public static toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    /**
     * Sum an array of numbers
     * @param {number[]} arr - array of numbers
     */
    public static sum = (arr: number[]) => arr.reduce((acc, value) => acc + value, 0);
}

export default MathUtils;
