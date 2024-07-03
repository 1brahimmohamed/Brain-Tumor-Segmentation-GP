import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import ReportingTable from '@/ui/library/ReportTable/ReportingTable';
import { createReportThunk, deleteReportbyIdThunk } from '@/features/report/report-actions';
import store from '@/redux/store.ts';

const ReportingTab = () => {
    const { selectedStudyReports, currentStudyInstanceUid } = useSelector((store: IStore) => store.viewer);

    const renderContent = (content: string, wordLimit: number) => {
        try {
            const parsedContent = JSON.parse(content);
            let textContent = parsedContent
                .map((item: any) => {
                    if (item.type === 'p') {
                        return item.children.map((child: any) => child.text).join(' ');
                    }
                    return '';
                })
                .join(' ');

            // Limit the number of words displayed
            const words = textContent.split(' ');
            if (words.length > wordLimit) {
                textContent = words.slice(0, wordLimit).join(' ') + '...';
            }

            return textContent;
        } catch (error) {
            return 'Error displaying content';
        }
    };

    const deleteReport = (reportId: number, studyId: string) => {
        store.dispatch(deleteReportbyIdThunk(reportId, studyId));
    };

    const createReport = (studyId: string, reportContent: string) => {
        store.dispatch(createReportThunk(studyId, reportContent));
    };

    return (
        <div>
            <ReportingTable
                data={selectedStudyReports}
                renderContent={renderContent}
                currentStudyInstanceUid={currentStudyInstanceUid}
                onDelete={deleteReport}
                onCreate={createReport}
            />
        </div>
    );
};

export default ReportingTab;
