import { useState } from 'react';
import { TAppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';
import SelectionButton from '@features/top-bars/components/SelectionButton.tsx';


const modalities = [
    { id: 0, label: 'CT' },
    { id: 1, label: 'MR' },
    { id: 2, label: 'US' },
    { id: 3, label: 'PET' },
    { id: 4, label: 'XA' },
];


const ModalityButtons = () => {
    const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
    const dispatch = useDispatch<TAppDispatch>();
    const handleButtonClick = (id: number) => {

        setSelectedButtons((prevSelectedButtons) => {

            if (prevSelectedButtons.includes(id)) {
                // If button is selected, deselect it
                dispatch(studiesSliceActions.removeFilterModality(modalities[id].label));
                return prevSelectedButtons.filter((selectedId) => selectedId !== id);

            } else {
                // If button is not selected, select it
                dispatch(studiesSliceActions.addFilterModality(modalities[id].label));
                return [...prevSelectedButtons, id];
            }

        });
    };

    return (
        <>
            {modalities.map((modality) => (
                <SelectionButton
                    key={modality.id}
                    id={modality.id}
                    lastBtnIndex={modalities.length - 1}
                    label={modality.label}
                    onClick={handleButtonClick}
                    selected={selectedButtons.includes(modality.id)}
                />
            ))}
        </>
    );
};

export default ModalityButtons;
