import { useState } from 'react';
import { TAppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';
import { MODALITIES } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import SelectionButton from '@features/top-bars/HomeTopBar/SelectionButton.tsx';

const ModalityButtons = () => {
    const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
    const dispatch = useDispatch<TAppDispatch>();
    const handleButtonClick = (id: number) => {
        setSelectedButtons((prevSelectedButtons) => {
            if (prevSelectedButtons.includes(id)) {
                // If button is selected, deselect it
                dispatch(studiesSliceActions.removeFilterModality(MODALITIES[id].label));
                return prevSelectedButtons.filter((selectedId) => selectedId !== id);
            } else {
                // If button is not selected, select it
                dispatch(studiesSliceActions.addFilterModality(MODALITIES[id].label));
                return [...prevSelectedButtons, id];
            }
        });
    };

    return (
        <>
            {MODALITIES.map((modality) => (
                <SelectionButton
                    key={modality.id}
                    id={modality.id}
                    lastBtnIndex={MODALITIES.length - 1}
                    label={modality.label}
                    onClick={handleButtonClick}
                    selected={selectedButtons.includes(modality.id)}
                />
            ))}
        </>
    );
};

export default ModalityButtons;
