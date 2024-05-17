import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    SkipNext as NextFrameIcon,
    SkipPrevious as PreviousFrameIcon
} from '@mui/icons-material';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { InputRange } from '@ui/library';

import { utilities } from '@cornerstonejs/tools';

type TCinePlayerProps = {
    viewportElementRef: React.RefObject<HTMLDivElement>;
};

const CinePlayer = ({ viewportElementRef }: TCinePlayerProps) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [fps, setFps] = useState<number>(24);

    if (!viewportElementRef.current) return null;

    const handleCinePlayStop = () => {
        if (viewportElementRef.current) {
            if (!isPlaying) {
                utilities.cine.playClip(viewportElementRef.current, { framesPerSecond: fps });
            } else {
                utilities.cine.stopClip(viewportElementRef.current);
            }

            setIsPlaying(!isPlaying);
        }
    };
    const handleInputRangeChange = (value: number) => {
        setFps(value);
        // modify the fps of the cine player
        if (isPlaying && viewportElementRef.current)
            utilities.cine.playClip(viewportElementRef.current, { framesPerSecond: value });
    };

    const handleNextAndPreviousFrames = (direction: number) => {
        if (viewportElementRef.current) {
            utilities.cine.playClip(viewportElementRef.current, { framesPerSecond: direction * 1000 });
            // wait for 1 second
            setTimeout(() => {
                utilities.cine.stopClip(viewportElementRef.current!);
            }, 1);
        }
    };

    return (
        <div className={'bg-AASecondShade flex h-full justify-center items-center w-full'}>
            <div>
                <IconButton onClick={() => handleNextAndPreviousFrames(-1)}>
                    <PreviousFrameIcon />
                </IconButton>
            </div>
            <div>
                <IconButton onClick={handleCinePlayStop}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
            </div>
            <div>
                <IconButton onClick={() => handleNextAndPreviousFrames(1)}>
                    <NextFrameIcon />
                </IconButton>
            </div>

            <div className={'flex space-x-2'}>
                <InputRange
                    value={24}
                    onChange={handleInputRangeChange}
                    minValue={2}
                    maxValue={60}
                    step={1}
                />
                fps
            </div>
        </div>
    );
};

export default CinePlayer;
