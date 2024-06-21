import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PlateEditor from './components/plate-editor';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch } from '@/redux/store';
import { useParams } from 'react-router-dom';
import { fetchStudyReportByIdThunk } from '../studies-table/dicom-studies-table/dicom-studies-actions';
import { IStore } from '@/models';

export default function Report() {
    const dispatch = useDispatch<TAppDispatch>();
    const { studyId } = useParams();
    const [initialReport, setInitialReport] = useState<any[]>();

    useEffect(() => {
        if (studyId) {
            dispatch(fetchStudyReportByIdThunk(studyId));
        }
    }, [studyId]);

    const selectedStudyReport = useSelector((store: IStore) => store.studies.selectedStudyReport);

    useEffect(() => {
        if (selectedStudyReport) {
            if (selectedStudyReport.content) {
                setInitialReport(JSON.parse(selectedStudyReport.content));
            } else {
                // TODO: set placeholder report
            }
        }
    }, [selectedStudyReport]);

    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <TooltipProvider>
                <Box className={'flex-col mt-4 space-y-5'}>
                    <Box className={'h-3/4'}>
                        <PlateEditor />
                    </Box>
                </Box>
            </TooltipProvider>
        </NextThemesProvider>
    );
}
