import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "transparent"
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: "#10a9e2"
    },
}));

export default CustomLinearProgress;
