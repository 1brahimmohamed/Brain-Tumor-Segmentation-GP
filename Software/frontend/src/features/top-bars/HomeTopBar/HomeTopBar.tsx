import { DatePicker } from 'antd';
import { Box, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';
import { TAppDispatch } from '@/redux/store.ts';
import PeriodButtons from '@features/top-bars/HomeTopBar/PeriodButtons.tsx';
import ModalityButtons from '@features/top-bars/HomeTopBar/ModalityButtons.tsx';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { OPTIONS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import '@styles/DateRange.scss';

const { RangePicker } = DatePicker;

const HomeTopBar = () => {
    const theme = useTheme();

    const dispatch = useDispatch<TAppDispatch>();

    const rangePickerChangeHandler = (data: any) => {

        if (!data) {
            dispatch(studiesSliceActions.setDateFilter({
                startDate: null,
                endDate: null,
            }));

            return;
        }

        dispatch(studiesSliceActions.setDateFilter({
            startDate: data[0].format('YYYY-MM-DD'),
            endDate: data[1].format('YYYY-MM-DD'),
        }));

    };


    return (
        <Box className={'flex justify-between w-full h-full'}>

            {/* Left Side */}
            <Box className={'flex'}>

                <Box className={'flex'}>
                    <RangePicker
                        className={`createDateRangePicker ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                        popupClassName={`createDateRangePickerPopup ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                        allowClear={true}
                        onChange={rangePickerChangeHandler}
                    />
                </Box>


                <Box className={'flex ml-2 h-full'}>
                    <PeriodButtons />
                </Box>


                <Box className={'flex ml-2 '}>
                    <ModalityButtons />
                </Box>
            </Box>

            {/* Right Side */}
            <Box className={'flex space-x-1'}>
                {
                    OPTIONS.map((option, index) => (
                        <CustomButton
                            key={index}
                            onClick={option.onClick}
                            icon={option.icon}
                            menuItems={option?.menuItems}
                        />
                    ))
                }
            </Box>
        </Box>
    );
};

export default HomeTopBar;
