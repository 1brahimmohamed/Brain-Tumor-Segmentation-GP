import {useEffect, useState} from "react";
import Box from '@mui/material/Box';

import CustomLinearProgress from "./styles.js";

const LinearProgressBarDeterminate= () => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <CustomLinearProgress variant={"determinate"} value={progress} />
        </Box>
    );
}

export default LinearProgressBarDeterminate;
