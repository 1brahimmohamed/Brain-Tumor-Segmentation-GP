import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Image } from '@ui/library';
import { IDicomSeriesData } from '@/models';

interface SeriesCardProps {
    seriesData: IDicomSeriesData;
    seriesIndex: number;
    selectedIndex: number;
    onSelectedSeriesChange: (seriesIndex: number, seriesInstanceUid: string) => void;
}

const SeriesCard = ({ seriesData, seriesIndex, selectedIndex, onSelectedSeriesChange }: SeriesCardProps) => {
    const theme = useTheme();
    const imageSrc = `http://localhost:8000/dicom/studies/${seriesData.studyInstanceUid}/series/${seriesData.seriesInstanceUid}/image`;

    return (
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
    );
};

export default SeriesCard;
