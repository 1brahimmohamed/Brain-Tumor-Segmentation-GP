import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { ANNOTATION_TOOLS } from './tools';
import CornerstoneToolManager from './CornerstoneToolManager';

// Download the current annotations as a JSON file and remove all the annotations from the rendering engine
// and re-renders the viewport
export const downloadAnnotations = () => {
    const state = store.getState();
    const { renderingEngineId } = state.viewer;
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

    const annotations = cornerstoneTools.annotation.state.getAllAnnotations();
    console.log(annotations);
    const annotationsString = JSON.stringify(annotations);
    // Create a Blob from the JSON string
    const blob = new Blob([annotationsString], {
        type: 'application/json'
    });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'annotations.json';

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);

    cornerstoneTools.annotation.state.removeAllAnnotations();

    renderingEngine?.render();
};

// Load annotations from a JSON file and add them to the rendering engine
export const loadAnnotations = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.json';

    inputElement.addEventListener('change', (event) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const state = store.getState();
            const { renderingEngineId } = state.viewer;
            const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

            const annotationsString = event.target?.result as string;
            const annotations = JSON.parse(annotationsString);
            console.log(annotations);

            try {
                annotations.forEach((annotation: cornerstoneTools.Types.Annotation) => {
                    cornerstoneTools.annotation.state.addAnnotation(
                        annotation,
                        annotation.metadata.FrameOfReferenceUID
                    );
                });

                CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Length'].toolName, 1);
                cornerstoneTools.annotation.visibility.showAllAnnotations();
            } catch (error) {
                console.error(`Failed to load annotations: ${error}`);
            }

            renderingEngine?.render();
        };

        reader.readAsText(event.target?.files[0]);
    });

    // Trigger a click on the input element to open the file dialog
    inputElement.click();
};
