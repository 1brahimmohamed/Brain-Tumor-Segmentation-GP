const formatNumberPrecision = (number, precision) => {
    if (number !== null) {
        return parseFloat(number).toFixed(precision);
    }
}

export default formatNumberPrecision;
