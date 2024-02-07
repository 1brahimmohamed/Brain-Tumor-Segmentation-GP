import SelectionButton from '@features/top-bars/components/SelectionButton.tsx';
import { useState } from 'react';
import { TAppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';


const timeIntervals = [
    { id: 0, label: '1d' },
    { id: 1, label: '3d' },
    { id: 2, label: '1w' },
    { id: 3, label: '1m' },
    { id: 4, label: '1y' },
    { id: 5, label: 'Any' },
];

const PeriodButtons = () => {
    const [selectedButton, setSelectedButton] = useState<number | null>(timeIntervals.length - 1);

    const dispatch = useDispatch<TAppDispatch>();

    const handleButtonClick = (id: number) => {
        setSelectedButton(id);
        dispatch(studiesSliceActions.setFilterPeriod(timeIntervals[id].label));
    };

    return (
        <>
            {timeIntervals.map((interval) => (
                <SelectionButton
                    key={interval.id}
                    id={interval.id}
                    lastBtnIndex={timeIntervals.length - 1}
                    label={interval.label}
                    onClick={handleButtonClick}
                    selected={selectedButton === interval.id}
                />
            ))}
        </>
    );
};

export default PeriodButtons;
