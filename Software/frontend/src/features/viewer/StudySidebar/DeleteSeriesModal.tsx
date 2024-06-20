import { Modal } from '@/ui/library';
import { Box, Button } from '@mui/material';

interface DeleteSeriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    seriesId: string;
    seriesTitle: string;
}

const DeleteSeriesModal = ({ isOpen, onClose, seriesId, seriesTitle }: DeleteSeriesModalProps) => {
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
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        onClick={() => console.log('Delete series', seriesId)}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteSeriesModal;
