import ReactModal from 'react-modal';
import { ReactNode } from 'react';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop } from '@ui/library';
import './Modal.scss';

if (typeof document !== 'undefined') {
    ReactModal.setAppElement(document.getElementById('root')!);
}

type TModalProps = {
    shouldCloseOnEsc: boolean;
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    shouldCloseOnOverlayClick: boolean;
};

const Modal = ({
    shouldCloseOnEsc,
    isOpen,
    title,
    onClose,
    children,
    shouldCloseOnOverlayClick
}: TModalProps) => {
    const renderHeader = () => {
        return (
            <>
                <Backdrop show={isOpen} />
                {title && (
                    <header className="bg-AASecondShade flex items-center rounded-tl rounded-tr px-[20px] py-[13px]">
                        <Typography
                            variant="h3"
                            color="primaryLight"
                            className="flex grow !leading-[1.2] p-2"
                            data-cy="modal-header"
                        >
                            {title}
                        </Typography>
                        {onClose && (
                            <IconButton onClick={onClose}>
                                <CloseIcon name="close" className="text-primary-active cursor-pointer" />
                            </IconButton>
                        )}
                    </header>
                )}
            </>
        );
    };

    return (
        <ReactModal
            className="relative max-h-full w-11/12 text-white outline-none lg:w-10/12  xl:w-5/12"
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex items-start justify-center py-16"
            shouldCloseOnEsc={shouldCloseOnEsc}
            onRequestClose={onClose}
            isOpen={isOpen}
            // title={title}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            {renderHeader()}
            <section className="modal-content bg-AAFirstShade overflow-y-auto rounded-bl rounded-br px-7 pt-5 pb-[20px]">
                {children}
            </section>
        </ReactModal>
    );
};

export default Modal;
