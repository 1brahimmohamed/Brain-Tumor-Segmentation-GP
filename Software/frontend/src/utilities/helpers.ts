class HelpersUtil {
    /**
     * Returns a new array with the element at the specified index removed.
     * @param {any[]} arr - The array to remove the element from.
     * @param {number} index - The index of the element to remove.
     */
    public static withoutElementAtIndex = (arr: any[], index: number) => [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];

    /**
     * Checks if a value is a valid number.
     * @param {any} value - The value to check.
     */
    public static isValidNumber = (value: any) => {
        return value !== null && value !== undefined && typeof value === 'number' && !isNaN(value);
    };

    /**
     * Formats a number to a specified precision.
     *
     * @param {number | string} number - The number to format. If a string is provided, it will be parsed as a float.
     * @param {number} precision - The number of decimal places to round to.
     * @return {number | undefined} - The formatted number, rounded to the specified precision. Returns undefined if the input is null.
     */
    public static formatNumberPrecision(number: number | string, precision: number): number | undefined {
        if (number !== null) {
            if (typeof number === 'string') {
                number = parseFloat(number);
            }

            const multiplier = Math.pow(10, precision);
            return Math.floor(number * multiplier) / multiplier;
        }
    }

    /**
     * Converts a string to proper case.
     *
     * @param {string} str - The string to convert to proper case.
     * @return {string} The converted string in proper case.
     */
    public static toProperCase(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
        });
    }
}

export default HelpersUtil;
