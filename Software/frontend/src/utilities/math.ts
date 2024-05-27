const EPSILON = 1e-6;

class MathUtils {
    public static areEqual = (first: number, second: number, epsilon = EPSILON) =>
        Math.abs(first - second) < epsilon;

    public static isNearlyZero = (v: number) => Math.abs(v) < EPSILON;

    public static toDegrees = (radians: number) => (radians * 180) / Math.PI;

    public static toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    public static sum = (arr: number[]) => arr.reduce((acc, value) => acc + value, 0);
}

export default MathUtils;
