import { INotification, IUserInfo, IDicomStudyData, IDicomTableStudy, ILayout } from '@/models';
import { TModeType } from '@assets/theme/theme';

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

    // tools
    rightMouseTool: string;
    leftMouseTool: string;
    middleMouseTool: string;
    mouseWheelTool: string;

    // ismail
    viewports: [];
    clickedViewportId: null;
    clickedSeriesInstanceUid: null;
    studyData: null;
}

export interface IStore {
    ui: IStoreUISlice;
    auth: IStoreAuthSlice;
    studies: IStoreStudiesSlice;
    viewer: IStoreViewerSlice;
}
