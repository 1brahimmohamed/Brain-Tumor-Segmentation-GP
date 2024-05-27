// Define a type for the viewport configuration
export interface IViewportConfig {
    viewportId: string;
    type: string; // Assuming this is a string, adjust the type as necessary
    element: any; // This could be a reference type
    defaultOptions?: {
        orientation: string; // Adjust the type as necessary
    };
}

// Define the initial state type
export interface IViewportSliceState {
    viewports: IViewportConfig[];
    clickedViewportId: string | null;
    clickedSeriesInstanceUid: string | null;
    studyData: any;
}

export interface ILayout {
    numRows: number;
    numCols: number;
}

export interface IAnnotationTool {
    toolName: string;
    mouseBinding: number;
}

export interface ISegmentation {
    volumeId?: string;
    uid: string;
    activeSegmentIndex: number;
    id: string;
    isActive: boolean;
    label: string;
    type?: string;
    colorLUTIndex?: number;
    isVisible: boolean;
    segments: {
        opacity: number;
        isActive: boolean;
        segmentIndex: number;
        color: number[];
        label: string;
        isVisible: boolean;
        isLocked: boolean;
    }[];
}
