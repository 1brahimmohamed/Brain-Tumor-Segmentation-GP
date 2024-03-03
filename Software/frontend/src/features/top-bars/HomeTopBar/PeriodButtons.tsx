import SelectionButton from '@features/top-bars/HomeTopBar/SelectionButton.tsx';
import { useState } from 'react';
import { TAppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';
import { TIME_INTERVALS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';

const PeriodButtons = () => {
    const [selectedButton, setSelectedButton] = useState<number | null>(TIME_INTERVALS.length - 1);

    const dispatch = useDispatch<TAppDispatch>();

    const handleButtonClick = (id: number) => {
        setSelectedButton(id);
        dispatch(studiesSliceActions.setFilterPeriod(TIME_INTERVALS[id].label));
    };

    return (
        <>
            {TIME_INTERVALS.map((interval) => (
                <SelectionButton
                    key={interval.id}
                    id={interval.id}
                    lastBtnIndex={TIME_INTERVALS.length - 1}
                    label={interval.label}
                    onClick={handleButtonClick}
                    selected={selectedButton === interval.id}
                />
            ))}
        </>
    );
};

export default PeriodButtons;
