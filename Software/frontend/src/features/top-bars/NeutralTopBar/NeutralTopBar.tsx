import { Box } from '@mui/material';
import { OPTIONS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { Link } from 'react-router-dom';
import { Logo } from '@ui/library';

const NeutralTopBar = () => {
    return (
        <Box className={'flex justify-between w-full h-full'}>
            {/* Left Side */}
            <Box className={'flex'}>
                <Box className={'w-44 bg-transparent p-2'}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </Box>
            </Box>

            {/* Right Side */}
            <Box className={'flex space-x-1'}>
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

export default NeutralTopBar;
