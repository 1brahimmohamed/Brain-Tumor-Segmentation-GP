class HelpersUtil {
    public static withoutElementAtIndex = (arr: any[], index: number) => [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];

    public static isValidNumber = (value: any) => {
        return value !== null && value !== undefined && typeof value === 'number' && !isNaN(value);
    };
    public static formatNumberPrecision(number: number | string, precision: number) {
        if (number !== null) {
            if (typeof number === 'string') {
                number = parseFloat(number);
            }

            const multiplier = Math.pow(10, precision);
            return Math.floor(number * multiplier) / multiplier;
        }
    }

    public static toProperCase(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
        });
    }
}

export default HelpersUtil;
