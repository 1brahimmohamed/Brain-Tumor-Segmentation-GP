import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { INotification } from '@/models';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const NotificationItem = ({ id: date, type, content: message }: INotification) => {
    const theme = useTheme();

    return (
        <Box
            className={`rounded-md p-4`}
            sx={{
                backgroundColor: theme.palette.primary.lighter
            }}
        >
            <Box className="flex">
                <Box className="flex-shrink-0">
                    {type === 'error' ? (
                        <ErrorIcon color={'error'} className={`h-5 w-5`} aria-hidden="true" />
                    ) : type === 'warning' ? (
                        <WarningIcon color={'warning'} className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <InfoIcon color={'info'} className="h-5 w-5" aria-hidden="true" />
                    )}
                </Box>
                <Box className="ml-3">
                    <h3 className={`text-sm font-medium`}>{new Date(date).toLocaleString()}</h3>
                    <Box className={`mt-2 text-sm`}>
                        <p>{message}</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationItem;
