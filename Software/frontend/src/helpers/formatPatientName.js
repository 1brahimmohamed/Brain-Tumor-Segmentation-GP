/**
 * Formats a patient name for display purposes
 */
const formatPatientName = (name) => {
    if (!name) {
        return;
    }

    if (name.Alphabetic){
        return name.Alphabetic;
    }

    // some time the name is

    // Convert the first ^ to a ', '. String.replace() only affects
    // the first appearance of the character.
    const commaBetweenFirstAndLast = name.replace('^', ', ');

    // Replace any remaining '^' characters with spaces
    const cleaned = commaBetweenFirstAndLast.replace(/\^/g, ' ');

    // Trim any extraneous whitespace
    return cleaned.trim();
}

export default formatPatientName;
