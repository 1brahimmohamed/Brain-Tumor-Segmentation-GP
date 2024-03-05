import ViewportOverlay from "@features/viewer/Viewport/ViewportOverlay/ViewportOverlay.tsx";

type TViewportProps = {
    onClick: (idx: number) => void;
    selectedViewportId?: number | string;
    id: string | number;
};

const Viewport = ({onClick, selectedViewportId, id}: TViewportProps) => {

    const topLeft = <div>Top Left Metadata</div>
    const topRight = <div>Top Right Metadata</div>
    const bottomRight = <div>Bottom Right Metadata</div>
    const bottomLeft = <div>Bottom Left Metadata</div>


    return (
        <div onClick={ ()=> onClick(1) } className={`h-full w-full relative bg-black ${selectedViewportId === id? 'ring-2 ring-AAPrimary': '' }`}>
            <ViewportOverlay topLeft={topLeft} topRight={topRight} bottomRight={bottomRight} bottomLeft={bottomLeft} />
        </div>
    );
};

export default Viewport;
