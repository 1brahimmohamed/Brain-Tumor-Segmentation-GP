import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';

// Set the active tool for a specific mouse button
export const setToolActive = (toolName: string, mouseButton: number, toolGroupId?: string) => {
    const state = store.getState();
    const { currentToolGroupId: currentAnnotationToolGroupId } = state.viewer;
    const currentToolGroupId = toolGroupId || currentAnnotationToolGroupId;
    const toolGroup = cornerstoneTools.ToolGroupManager.getToolGroup(currentToolGroupId);
    const { selectedCornerstoneTools } = state.viewer;

    try {
        if (!toolGroup) {
            console.error('tool group is not initialized');
            return;
        }

        // Set the tool as passive if it is already active
        toolGroup.setToolPassive(toolName, { removeAllBindings: true });

        // get the index of the existing tool with the same mouse binding and set the tool indexed to it as passive
        const existingToolIndex = selectedCornerstoneTools.findIndex(
            (tool) => tool.mouseBinding === mouseButton
        );
        if (existingToolIndex !== -1) {
            console.log(selectedCornerstoneTools[existingToolIndex].toolName);
            toolGroup.setToolPassive(selectedCornerstoneTools[existingToolIndex].toolName, {
                removeAllBindings: true
            });
        }

        console.log(`Setting tool '${toolName}' as active for mouse button ${mouseButton}`);

        toolGroup.setToolActive(toolName, {
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

// Set the current annotation tool group ID in the store
export const setCurrentToolGroupId = (toolGroupId: string) => {
    store.dispatch(
        viewerSliceActions.setCurrentToolGroupId({
            currentToolGroupId: toolGroupId
        })
    );
};
