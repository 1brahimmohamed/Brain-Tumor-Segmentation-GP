import { Button, Typography, Box } from '@mui/material';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { OPTIONS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import '@styles/DateRange.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import { DicomUtil } from '@/utilities';
import { Logo } from '@/ui/library';

const HomeTopBar = () => {
    return (
        <Box
            className={
                'flex flex-col-reverse gap-4 md:flex-row justify-between md:items-center w-full h-full'
            }
        >
            {/* Left Side */}
            <Box className={'h-3/12'}>
                <Box className={'flex h-12 justify-center'}>
                    <Logo />
                </Box>
            </Box>

            {/* Right Side */}
            <Box className={`flex flex-wrap gap-1`}>
                {OPTIONS.map((option, index) => (
                    <CustomButton
                        key={index}
                        onClick={option.onClick}
                        icon={option.icon}
                        menuItems={option?.menuItems}
                        menuComponent={option?.menuComponent}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HomeTopBar;
