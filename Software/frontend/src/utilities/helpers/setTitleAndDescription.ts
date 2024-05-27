
/**
 * Sets the title and description of the demo.
 *
 * @param {string} titleText - The text to set as the title.
 * @param {string} descriptionText - The text to set as the description.
 */
export default function setTitleAndDescription(titleText: string, descriptionText: string) {
    const title = document.getElementById('demo-title');
    const description = document.getElementById('demo-description');

    if (title) {
        title.innerText = titleText;
    }

    if (description) {
        description.innerText = descriptionText;
    }
}
