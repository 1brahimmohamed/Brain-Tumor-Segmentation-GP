import { Modal } from '@ui/library';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

const DicomTagsBrowser = () => {

    const [isOpen, setIsOpen] = useState(true)
    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Dicom Tag Browser"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <Box>
                <Typography variant="h4" color="primaryLight" className="mb-4">
                    Series
                </Typography>
            </Box>
        </Modal>
    );
};

export default DicomTagsBrowser;
