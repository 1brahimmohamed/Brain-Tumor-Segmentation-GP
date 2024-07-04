import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Box, Button, LinearProgress } from '@mui/material';
import { Cloud, DocumentScanner } from '@mui/icons-material';
import { Modal } from '@ui/library';
import {
    uploadDicomFilesThunk,
    fetchDicomStudiesThunk
} from '@features/studies-table/dicom-studies-table/dicom-studies-actions.ts';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '@/redux/store.ts';

interface UploadDicomModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadDicomModal = ({ isOpen, onClose }: UploadDicomModalProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const dispatch = useDispatch<TAppDispatch>();

    const startSimulateProgress = () => {
        setProgressValue(0);

        const interval = setInterval(() => {
            setProgressValue((value) => {
                if (value >= 95) {
                    clearInterval(interval);
                    return value;
                }
                return value + 5;
            });
        }, 500);

        return interval;
    };

    const handleUpload = async (files: File[]) => {
        setIsUploading(true);
        const progressInterval = startSimulateProgress();

        for (const file of files) {
            await new Promise((resolve) => setTimeout(resolve, 100));

            dispatch(uploadDicomFilesThunk(file));
        }

        clearInterval(progressInterval);
        setProgressValue(100);

        return setTimeout(() => {
            setIsUploading(false);
            onClose();
            dispatch(fetchDicomStudiesThunk());
        }, 1000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Upload Dicom"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <Box className={'flex flex-col gap-y-4'}>
                <Dropzone multiple={true} disabled={isUploading} onDropAccepted={(files) => setFiles(files)}>
                    {({ getRootProps, acceptedFiles }) => (
                        <div className={'flex flex-col gap-2'}>
                            <span className={`text-xl font-semibold ${fileError && 'text-red-400'}`}>
                                DICOM Files
                            </span>
                            <div
                                {...getRootProps()}
                                className={
                                    'h-80 rounded-lg border border-dashed border-gray-300 dark:border-gray-900'
                                }
                            >
                                <div className={'flex h-full w-full items-center justify-center'}>
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/90 ${isUploading && 'cursor-default'}`}
                                    >
                                        <div
                                            className={'flex flex-col items-center justify-center pb-6 pt-5'}
                                        >
                                            <Cloud
                                                className={'mb-2 h-6 w-6 text-zinc-500 dark:text-gray-300'}
                                            />
                                            <p className={'mb-2 text-sm text-zinc-700 dark:text-gray-300'}>
                                                <span className={'font-semibold'}>Click to upload</span> or
                                                drag and drop
                                            </p>
                                            <p className={'text-xs text-zinc-500 dark:text-gray-300'}>
                                                DICOM files
                                            </p>
                                        </div>

                                        {acceptedFiles && acceptedFiles.length > 0 && (
                                            <div
                                                className={
                                                    'mb-2 px-2 py-0.5 grid grid-cols-1 sm:grid-cols-2 gap-1 overflow-y-auto'
                                                }
                                            >
                                                {acceptedFiles.map((file) => (
                                                    <div
                                                        key={file.name}
                                                        className={
                                                            'flex h-[40px] items-center divide-x divide-gray-600 overflow-hidden rounded-md bg-AASecondary dark:bg-AAFirstShade outline outline-[1px] outline-gray-600'
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                'grid h-full place-items-center px-3 py-2'
                                                            }
                                                        >
                                                            <DocumentScanner
                                                                className={'h-4 w-4 text-AAPrimaryLight'}
                                                            />
                                                        </div>
                                                        <div className={'h-full truncate px-3 py-2 text-sm'}>
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {isUploading && (
                                            <div className={'mx-auto mb-4 w-full max-w-xs'}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    color={'secondary'}
                                                    value={progressValue}
                                                />
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            {fileError && (
                                <p className={'text-red-400 font-medium'}>DICOM files are required</p>
                            )}
                        </div>
                    )}
                </Dropzone>

                <Box className={'flex self-end gap-2'}>
                    <Button variant={'outlined'} color={'secondary'} onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        onClick={() => {
                            if (files.length > 0) {
                                setFileError(false);
                                handleUpload(files);
                            } else {
                                setFileError(true);
                            }
                        }}
                        disabled={isUploading}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadDicomModal;
