import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PlateEditor from './components/plate-editor';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch } from '@/redux/store';
import { useParams } from 'react-router-dom';
import {
    fetchDicomStudyByIdThunk,
    fetchStudyReportByIdThunk
} from '../studies-table/dicom-studies-table/dicom-studies-actions';
import { IStore } from '@/models';

export default function Report() {
    const dispatch = useDispatch<TAppDispatch>();
    const { studyId } = useParams();
    const [initialReport, setInitialReport] = useState<any[]>([]);

    useEffect(() => {
        if (studyId) {
            dispatch(fetchDicomStudyByIdThunk(studyId));
            dispatch(fetchStudyReportByIdThunk(studyId));
        }
    }, [studyId]);

    const selectedStudy = useSelector((store: IStore) => store.studies.selectedDicomStudy);
    const selectedStudyReport = useSelector((store: IStore) => store.studies.selectedStudyReport);
    console.log({ selectedStudy });

    useEffect(() => {
        if (selectedStudyReport && JSON.parse(selectedStudyReport.content)?.length > 0) {
            setInitialReport(JSON.parse(selectedStudyReport.content));
        } else {
            if (selectedStudy) {
                setInitialReport([
                    {
                        id: '1',
                        children: [
                            {
                                text: ''
                            }
                        ],
                        type: 'p'
                    }
                ]);
                // TODO: create template
            }
        }
    }, [selectedStudyReport, selectedStudy]);

    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <TooltipProvider>
                <Box className={'flex-col mt-4 space-y-5'}>
                    <Box className={'h-3/4'}>
                        <PlateEditor
                            initialReadOnly={Boolean(selectedStudyReport)}
                            initialReport={initialReport}
                        />
                    </Box>
                </Box>
            </TooltipProvider>
        </NextThemesProvider>
    );
}
