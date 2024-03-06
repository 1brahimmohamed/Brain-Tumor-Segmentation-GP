import { ReactNode } from 'react';
import './ViewportOverlay.scss';
import { IStore } from '@/models';
import { useSelector } from 'react-redux';

type TViewportOverlayProps = {
    topLeft: ReactNode;
    topRight: ReactNode;
    bottomRight: ReactNode;
    bottomLeft: ReactNode;
};

const ViewportOverlay = ({ topLeft, topRight, bottomRight, bottomLeft }: TViewportOverlayProps) => {
    const { isInfoOnViewportsShown } = useSelector((store: IStore) => store.viewer);

    const metadataOverlay = () => {
        return (
            <>
                <div className="absolute top-0      left-0  bg-red-500 text-white p-2">{topLeft}</div>
                <div className="absolute top-0      right-0 bg-yellow-500 text-white p-2">{topRight}</div>
                <div className="absolute bottom-0   left-0  bg-green-400 text-white p-2">{bottomLeft}</div>
                <div className="absolute bottom-0   right-0 bg-black text-white p-2">{bottomRight}</div>

                <div className="absolute top-1/2 right-0 bg-blue-500 text-white p-2">L</div>
                <div className="absolute top-1/2 left-0 bg-yellow-500 text-white p-2">R</div>

                <div className="absolute top-0 left-1/2 bg-yellow-500 text-white p-2">P</div>
                <div className="absolute bottom-0 left-1/2 bg-yellow-500 text-white p-2">A</div>
            </>
        );
    };

    return isInfoOnViewportsShown ? metadataOverlay() : <></>;
};

export default ViewportOverlay;
