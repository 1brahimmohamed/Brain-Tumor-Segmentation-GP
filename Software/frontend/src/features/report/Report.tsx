import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PlateEditor from './components/plate-editor';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch } from '@/redux/store';
import { useParams } from 'react-router-dom';
import { fetchDicomStudyByIdThunk } from '@features/studies-table/dicom-studies-table/dicom-studies-actions';
import { fetchStudyReportByIdThunk } from '@features/report/report-actions';
import { IStore } from '@/models';

export default function Report() {
    const dispatch = useDispatch<TAppDispatch>();
    const { reportId, studyId } = useParams();
    const [initialReport, setInitialReport] = useState<any[]>([]);

    useEffect(() => {
        if (studyId) {
            dispatch(fetchDicomStudyByIdThunk(studyId));
            dispatch(fetchStudyReportByIdThunk(studyId));
        }
    }, [studyId]);

    const selectedStudyReports = useSelector((store: IStore) => store.viewer.selectedStudyReports || []);

    useEffect(() => {
        if (selectedStudyReports && selectedStudyReports.length > 0) {
            console.log(selectedStudyReports);
            const selectedStudyReport = selectedStudyReports.find((report) => String(report.id) === reportId);
            if (selectedStudyReport) {
                setInitialReport(JSON.parse(selectedStudyReport.content));
            }
        } else if (selectedStudyReports && selectedStudyReports.length === 0) {
            setInitialReport([]);
        }
    }, [selectedStudyReports, reportId]);

    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <TooltipProvider>
                <Box className={'flex-col mt-4 space-y-5'}>
                    <Box className={'h-3/4'}>
                        <PlateEditor initialReadOnly={Boolean(true)} initialReport={initialReport} />
                    </Box>
                </Box>
            </TooltipProvider>
        </NextThemesProvider>
    );
}
