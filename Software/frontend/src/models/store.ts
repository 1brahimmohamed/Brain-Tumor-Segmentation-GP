import {INotification, IUserInfo, IDicomStudyData, IDicomTableStudy, ILayout} from '@/models';
import {TModeType} from '@assets/theme/theme';
import {ISegmentation} from "@models/viewer.ts";

export interface IStoreUISlice {
    notification: INotification | null;
    notifications: INotification[];
    isLoading: boolean;
    themeMode: TModeType;
    isDisplayingDicomStudies: boolean;
    currentLanguage: string;
}

export interface IStoreAuthSlice {
    hasAutoLoginFinished?: boolean;
    userInfo: IUserInfo | null;
    token: string | null;
}

export interface IStoreStudiesSlice {
    dicomStudies: IDicomTableStudy[];
    selectedDicomStudy: IDicomStudyData | null;
    niftiStudies: any[];
    selectedNiftiStudy: any;
    startDateFilter: string | null;
    endDateFilter: string | null;
    filterPeriod: string;
    selectedModalities: string[];
}

export interface IStoreViewerSlice {
    // ui
    isFullScreen: boolean;
    layout: ILayout;
    isRightPanelOpen: boolean;
    isStudiesPanelOpen: boolean;
    isInfoOnViewportsShown: boolean;

    viewports: [];
    renderingEngineId: string;
    selectedViewportId: string;
    selectedSeriesInstanceUid: string;
    studyData: null;
    annotationToolGroupIds: string[];
    currentToolGroupId: string;
    selectedCornerstoneTools: Array<{
        toolName: string;
        mouseBinding: number;
    }>;
    viewportsWithCinePlayer: string[];
    segmentation: {
        currentSegmentationId: string | null;
        segmentations: Array<ISegmentation>;
    }
}

export interface IStore {
    ui: IStoreUISlice;
    auth: IStoreAuthSlice;
    studies: IStoreStudiesSlice;
    viewer: IStoreViewerSlice;
}
