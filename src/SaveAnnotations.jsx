const saveAnnotations = (element) => {
    const allAnnotations = {};
    annotationToolsNames.forEach((toolsName) => {
        const annotations = cornerstoneTools.annotation.state.getAnnotations(
            toolsName,
            element
        );
        if (annotations && annotations.length > 0) {
            allAnnotations[toolsName] = annotations;
        }
    });

    // Serialize the annotations to JSON
    const annotationsString = JSON.stringify(allAnnotations);

    // Create a Blob from the JSON string
    const blob = new Blob([annotationsString], {
        type: "application/json",
    });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "annotations.json";

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);

    cornerstoneTools.annotation.state.removeAllAnnotations(element);

    // Update the canvas
    renderingEngine.current.render();
};

const uploadAnnotations = (element) => {
    // --- To put the tool data back ---

    // Create an input element
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".json";

    // Listen for the change event on the input element
    inputElement.addEventListener("change", (event) => {
        // Read the content of the selected file
        const reader = new FileReader();
        reader.onload = (loadEvent) => onReaderLoad(loadEvent, element);
        reader.readAsText(event.target.files[0]);
    });

    // Trigger a click on the input element to open the file dialog
    inputElement.click();
};

const onReaderLoad = (event, element) => {
    const fileContent = event.target.result;

    try {
        const allToolData = JSON.parse(fileContent);
        for (const toolType in allToolData) {
            if (allToolData.hasOwnProperty(toolType)) {
                for (let i = 0; i < allToolData[toolType].length; i++) {
                    cornerstoneTools.annotation.state.addAnnotation(
                        allToolData[toolType][i],
                        element
                    );
                }
            }
        }

        // Update the canvas
        renderingEngine.current.render();
    } catch (error) {
        console.error("Error parsing JSON file:", error);
    }
};
