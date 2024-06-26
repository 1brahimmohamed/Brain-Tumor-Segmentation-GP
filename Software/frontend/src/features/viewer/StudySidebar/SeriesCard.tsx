import { useTheme } from '@mui/material/styles';
import { Image } from '@ui/library';
import { IDicomSeriesData } from '@/models';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useState } from 'react';
import DeleteSeriesModal from './DeleteSeriesModal';
import { Box } from '@mui/material';

const gatewayUrl = import.meta.env.VITE_SERVER_URL;

interface SeriesCardProps {
    seriesData: IDicomSeriesData;
    seriesIndex: number;
    selectedIndex: number;
    onSelectedSeriesChange: (seriesIndex: number, seriesInstanceUid: string) => void;
}

const SeriesCard = ({ seriesData, seriesIndex, selectedIndex, onSelectedSeriesChange }: SeriesCardProps) => {
    const theme = useTheme();

    const [isDeleting, setIsDeleting] = useState(false);

    const imageSrc = `${gatewayUrl}/dicom/studies/${seriesData.studyInstanceUid}/series/${seriesData.seriesInstanceUid}/image`;

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <Box className="flex-col p-2" sx={{ backgroundColor: theme.palette.primary.light }}>
                        <Box className={'flex justify-between items-center mb-1'}>
                            <Box className={'flex items-center w-11/12 '}>
                                <Box className={'text-lg font-bold text-AAPrimary w-2/12'}>
                                    {seriesData.seriesModality}
                                </Box>
                                <Box
                                    className={'text-sm w-10/12 whitespace-nowrap truncate'}
                                    title={seriesData.seriesDescription}
                                >
                                    {seriesData.seriesDescription}
                                </Box>
                            </Box>

                            <Box className={'w-1/12'}>{seriesData.numberOfInstances}</Box>
                        </Box>

                        <Box>
                            <Image
                                width={100}
                                height={100}
                                className={`border cursor-pointer ${selectedIndex === seriesIndex ? 'border-AAPrimary' : ''}`}
                                src={imageSrc}
                                alt="Series Image"
                                onDoubleClick={() => {
                                    onSelectedSeriesChange(seriesIndex, seriesData.seriesInstanceUid);
                                }}
                            />
                        </Box>
                    </Box>
                </ContextMenu.Trigger>
                <ContextMenu.Content className="z-50 min-w-[8rem] overflow-hidden rounded-md bg-AASecondary dark:bg-AAFirstShade p-1 text-black dark:text-white shadow-md">
                    <ContextMenu.Item
                        onClick={() => setIsDeleting(true)}
                        className="transition-all hover:opacity-60 text-red-500 dark:text-red-400 cursor-pointer"
                    >
                        Delete {seriesData.seriesDescription}
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
            {isDeleting && (
                <DeleteSeriesModal
                    isOpen={isDeleting}
                    onClose={() => setIsDeleting(false)}
                    seriesId={seriesData.seriesInstanceUid}
                    seriesTitle={seriesData.seriesDescription}
                />
            )}
        </>
    );
};

export default SeriesCard;
