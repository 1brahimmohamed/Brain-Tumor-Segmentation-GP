import { Box, useTheme } from '@mui/material';
import { DatePicker } from 'antd';
import PeriodButtons from './PeriodButtons';
import ModalityButtons from './ModalityButtons';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '@/redux/store';
import { studiesSliceActions } from '@/features/studies-table/studies-slice';

const { RangePicker } = DatePicker;

const FiltersBar = () => {
    const theme = useTheme();

    const dispatch = useDispatch<TAppDispatch>();

    const rangePickerChangeHandler = (data: any) => {
        if (!data) {
            dispatch(
                studiesSliceActions.setDateFilter({
                    startDate: null,
                    endDate: null
                })
            );

            return;
        }

        dispatch(
            studiesSliceActions.setDateFilter({
                startDate: new Date(data[0]).toISOString(),
                endDate: new Date(data[1]).toISOString()
            })
        );
    };

    return (
        <Box className={'flex flex-col md:flex-row h-full gap-2'}>
            <Box className={'flex h-full'}>
                <RangePicker
                    className={`createDateRangePicker ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                    popupClassName={`createDateRangePickerPopup ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                    allowClear={true}
                    onChange={rangePickerChangeHandler}
                />
            </Box>

            <Box className={'flex h-full'}>
                <PeriodButtons />
            </Box>

            <Box className={'flex h-full'}>
                <ModalityButtons />
            </Box>
        </Box>
    );
};

export default FiltersBar;
