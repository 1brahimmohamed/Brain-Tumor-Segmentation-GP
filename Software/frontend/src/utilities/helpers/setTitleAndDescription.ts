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
