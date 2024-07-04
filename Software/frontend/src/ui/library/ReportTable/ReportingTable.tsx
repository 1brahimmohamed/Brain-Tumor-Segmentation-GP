import { IStudyReport } from '@/models';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import classnames from 'classnames';
import { Button } from '@mui/material';

type ReportingTableProps = {
    data: IStudyReport[];
    renderContent: (content: string, wordLimit: number) => string;
    currentStudyInstanceUid: string;
    onDelete?: (reportId: number, studyId: string) => void;
    onCreate?: (studyId: string, navigate: any) => void;
};

const ReportingTable = ({
    data,
    renderContent,
    currentStudyInstanceUid,
    onDelete,
    onCreate
}: ReportingTableProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="bg-AAPrimaryLight flex justify-between px-2 py-1">
                <span className="text-base font-bold text-white">Reports</span>
            </div>

            <div className="p-2">
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <p
                                        className="text-AAPrimary font-bold hover:text-gray-200 hover:cursor-pointer"
                                        onClick={() => navigate(`/report/${item.id}/study/${item.studyId}`)}
                                    >
                                        Report {item.id}
                                    </p>
                                }
                                description={
                                    <p className="text-gray-300">{renderContent(item.content, 5)}</p>
                                }
                            />
                            <DeleteIcon
                                className={classnames(
                                    'w-4 cursor-pointer text-white transition duration-300 hover:text-gray-400'
                                )}
                                onClick={() => onDelete(item.id, item.studyId)}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className="flex justify-center p-2 gap-1">
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    style={{ color: 'white' }}
                    onClick={() => onCreate(currentStudyInstanceUid, navigate)}
                >
                    Create Report
                </Button>
            </div>
        </div>
    );
};

export default ReportingTable;
