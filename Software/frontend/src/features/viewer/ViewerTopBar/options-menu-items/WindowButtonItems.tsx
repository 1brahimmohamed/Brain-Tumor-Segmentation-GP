import { MenuItem } from '@mui/material';
import { InvertColors as InvertTool } from '@mui/icons-material';

const WindowButtonItems = () => {
    return (
        <div>
            <MenuItem>
                <div className={'flex items-center'}>
                    <div className={'text-xl'}>
                        <InvertTool />
                    </div>
                    <div className={'truncate text-xs'}>Invert</div>
                </div>
            </MenuItem>
        </div>
    );
};

export default WindowButtonItems;
