const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
}

export default isValidNumber;
