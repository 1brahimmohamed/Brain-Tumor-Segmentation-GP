import { InputRange, Modal } from '@ui/library';
import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Select } from '@ui/library';
import DicomTagTable from '@features/viewer/DicomTagsBrowser/DicomTagTable.tsx';

// type TSeriesData = {
//     seriesName: string;
//     numberOfInstances: number;
//     seriesMetadata: any;
// }

const DicomTagsBrowser = () => {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => {
        setIsOpen(false);
    };

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' }
    ];

    const [selectedSeries, setSelectedSeries] = useState(options[0].value);
    const handleSelectedSeriesChange = (newSelect: any, _action: any) => {
        console.log(newSelect.value);
        setSelectedSeries(newSelect.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="DICOM Tag Browser"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <Box className={'h-[53vh] flex flex-col gap-y-4'}>
                <Box className={'flex gap-x-10'}>
                    <Box className={'flex gap-x-5 w-1/2'}>
                        <Box className={'flex items-center'}>
                            <Typography variant="h5" color="primaryLight">
                                Series
                            </Typography>
                        </Box>

                        <Box className={'w-full'}>
                            <Select
                                id={'hima'}
                                placeholder={'series'}
                                options={options}
                                value={selectedSeries}
                                onChange={handleSelectedSeriesChange}
                            />
                        </Box>
                    </Box>
                    <Box className={'flex gap-x-3 w-1/2'}>
                        <Box className={'flex items-center'}>
                            <Typography variant="h5" color="primaryLight">
                                Instance Number
                            </Typography>
                        </Box>

                        <Box className={'items-center w-2/3'}>
                            <InputRange
                                labelClassName={'text-lg'}
                                inputClassName={'w-full'}
                                labelPosition={'left'}
                                value={20}
                                onChange={(value) => {
                                    console.log(value);
                                }}
                                minValue={1}
                                maxValue={20}
                                step={1}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box className={'overflow-y-scroll'}>
                    <DicomTagTable />
                </Box>
            </Box>
        </Modal>
    );
};

export default DicomTagsBrowser;
