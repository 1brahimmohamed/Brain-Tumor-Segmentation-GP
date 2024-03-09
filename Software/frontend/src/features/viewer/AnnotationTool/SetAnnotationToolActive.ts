import * as cornerstoneTools from '@cornerstonejs/tools';
import store from '@/redux/store.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';

export const SetToolActive = (toolName: string, mouseButton: number) => {
    const state = store.getState();
    const { annotationToolGroupId } = state.viewer;
    const annotationToolGroup = cornerstoneTools.ToolGroupManager.getToolGroup(annotationToolGroupId);
    const { selectedAnnotationTools } = state.viewer;

    try {
        if (!annotationToolGroup) {
            console.error('Annotation tool group is not initialized');
            return;
        }
        const existingToolIndex = selectedAnnotationTools.findIndex(
            (tool) => tool.mouseBinding === mouseButton
        );
        if (existingToolIndex !== -1) {
            annotationToolGroup.setToolPassive(selectedAnnotationTools[existingToolIndex].toolName);
        }

        annotationToolGroup.setToolActive(toolName, {
            bindings: [{ mouseButton }]
        });

        store.dispatch(
            viewerSliceActions.setSelectedAnnotationTool({
                toolName,
                mouseBinding: mouseButton
            })
        );
    } catch (error) {
        console.error(`Failed to set tool '${toolName}' as active: ${error}`);
    }
};
