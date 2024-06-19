import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PlateEditor from './components/plate-editor';
import { TooltipProvider } from './components/plate-ui/tooltip';
import { Box } from '@mui/material';

export default function Report() {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <TooltipProvider>
                <Box className={'flex-col mt-4 space-y-5'}>
                    <Box className={'h-3/4'}>
                        <PlateEditor />
                    </Box>
                </Box>
            </TooltipProvider>
        </NextThemesProvider>
    );
}
