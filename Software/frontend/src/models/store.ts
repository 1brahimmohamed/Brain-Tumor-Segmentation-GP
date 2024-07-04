import {
    INotification,
    IUserInfo,
    IDicomStudyData,
    IDicomTableStudy,
    ILayout,
    IDicomSeriesData
} from '@/models';
import { TModeType } from '@assets/theme/theme';
import { ISegmentation } from '@models/viewer.ts';
import { INiftiStudyData, INiftiTableStudy, IStudyReport } from './study';

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
    niftiStudies: INiftiTableStudy[];
    selectedNiftiStudy: INiftiStudyData | null;
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
    currentStudyInstanceUid: string;
    selectedSeriesInstanceUid: string;
    studyData: IDicomSeriesData[] | null;
    annotationToolGroupIds: string[];
    currentToolGroupId: string;
    selectedCornerstoneTools: Array<{
        toolName: string;
        mouseBinding: number;
    }>;
    viewportsWithCinePlayer: string[];
    segmentations: ISegmentation[];
    selectedStudyReports: IStudyReport[];
}

export const initialState: IStoreViewerSlice = {
    // ui
    isFullScreen: false,
    layout: {
        numRows: 1,
        numCols: 1
    },
    isRightPanelOpen: true,
    isStudiesPanelOpen: false,
    isInfoOnViewportsShown: true,

    // viewport
    viewports: [],
    renderingEngineId: 'myRenderingEngine',
    selectedViewportId: '',
    currentStudyInstanceUid: '',
    selectedSeriesInstanceUid: '',
    studyData: null,
    annotationToolGroupIds: [],
    currentToolGroupId: '',
    selectedCornerstoneTools: [],
    viewportsWithCinePlayer: [],
    segmentations: [],
    selectedStudyReports: []
};

export interface IStore {
    ui: IStoreUISlice;
    auth: IStoreAuthSlice;
    studies: IStoreStudiesSlice;
    viewer: IStoreViewerSlice;
}
