import {InvertColors as InvertTool} from '@mui/icons-material';

const WindowButtonItems = () => {

    return (
        <div className={'h-auto w-48 px-3'}>
            <div className={'flex space-x-2 items-center'}>
                <div className={'text-xl'}><InvertTool/></div>
                <div className={'truncate text-sm'}> Invert</div>
            </div>
            <div className={'flex space-x-2 items-center'}>
                <div className={'text-xl'}><InvertTool/></div>
                <div className={'truncate text-sm'}> Invert</div>
            </div>
        </div>
    );
};

export default WindowButtonItems;
