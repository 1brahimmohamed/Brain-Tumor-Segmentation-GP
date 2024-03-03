class HelpersUtil {
    public static withoutElementAtIndex = (arr: any[], index: number) => [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];
}

export default HelpersUtil;
