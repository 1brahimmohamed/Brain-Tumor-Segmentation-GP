import { INotification } from '@models/notification';
import { modeType } from '@assets/theme/theme';
import { IUserInfo } from '@models/auth.ts';
import { IDicomTableStudy } from '@models/study.ts';

export interface IStoreUISlice {
    notification: INotification | null;
    isLoading: boolean;
    themeMode: modeType;
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
    selectedDicomStudy: any;
    niftiStudies: any[];
    selectedNiftiStudy: any;
    startDateFilter: Date | null;
    endDateFilter: Date | null;
    filterPeriod: string;
    selectedModalities: string[];
}

export interface IStore {
    ui: IStoreUISlice;
    auth: IStoreAuthSlice;
    studies: IStoreStudiesSlice;
}
