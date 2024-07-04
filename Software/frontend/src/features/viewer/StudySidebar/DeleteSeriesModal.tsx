import { Modal } from '@/ui/library';
import { Box, Button } from '@mui/material';
import { deleteSeriesbyIdThunk } from '@features/studies-table/dicom-studies-table/dicom-studies-actions';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '@/redux/store.ts';

interface DeleteSeriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    seriesId: string;
    seriesTitle: string;
}

const DeleteSeriesModal = ({ isOpen, onClose, seriesId, seriesTitle }: DeleteSeriesModalProps) => {
    const dispatch = useDispatch<TAppDispatch>();

    const handleDeleteClick = async () => {
        dispatch(deleteSeriesbyIdThunk(seriesId));
        onClose(); // Ensure onClose is properly called
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Delete Series ${seriesTitle}`}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <Box>
                <p>Are you sure you want to delete series {seriesTitle}?</p>
                <p>This action cannot be undone.</p>

                <Box className={'flex justify-end gap-x-4'}>
                    <Button variant={'outlined'} color={'secondary'} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={'contained'} color={'secondary'} onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteSeriesModal;
