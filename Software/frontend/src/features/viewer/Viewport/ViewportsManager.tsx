import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import NewViewport from '@features/viewer/Viewport/NewViewport/Viewport.tsx';
import ViewportGrid from '@features/viewer/Viewport/ViewportGrid/ViewportGrid.tsx';
import { useState } from 'react';

const ViewportsManager = () => {
    const { numRows, numCols } = useSelector((store: IStore) => store.viewer.layout);
    const [selectedViewportId, setSelectedViewportId] = useState<number | null>(null);

    const handleViewportClick = (id: number) => {
        console.log('Viewport clicked', id);
        setSelectedViewportId(id);
    };

    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({ length: numRows * numCols }, (_, idx) => (
            <NewViewport
                selectedViewportId={selectedViewportId}
                id={idx}
                onClick={() => {
                    handleViewportClick(idx);
                }}
                key={idx}
            />
        ));
    };

    return (
        <ViewportGrid numCols={numCols} numRows={numRows}>
            {renderCornerstoneElements()}
        </ViewportGrid>
    );
};

export default ViewportsManager;
