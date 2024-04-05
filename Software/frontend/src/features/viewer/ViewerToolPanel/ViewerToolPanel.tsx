import {useState} from "react";
import {ButtonGroup, SidePanel} from "@ui/library";
import SegmentationTab from "@features/viewer/ViewerToolPanel/SegmentationTab.tsx";
import MeasurementsTab from "@features/viewer/ViewerToolPanel/MeasurementsTab.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRuler, faBrush} from "@fortawesome/free-solid-svg-icons";


const ViewerToolPanel = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const onActiveIndexChange = (index: number) => {
        setActiveTabIndex(index);
    }

    return (
        <div>
            <SidePanel title={"Tools"} headerComponent={
                <ButtonGroup
                    buttons={[
                        {
                            children: <FontAwesomeIcon icon={faRuler}/>,
                            onClick: () => console.log("Measurement"),
                            key: `button-Measurement`
                        },
                        {
                            children: <FontAwesomeIcon icon={faBrush}/>,
                            onClick: () => console.log("Segmentation"),
                            key: `button-Segmentation`
                        },

                    ]}
                    onActiveIndexChange={onActiveIndexChange}
                    defaultActiveIndex={activeTabIndex}
                    activeTabColor={"bg-sky-800"}
                />
            }>
                <div className={`${activeTabIndex !== 0 ? 'hidden' : ''}`}><SegmentationTab/></div>
                <div className={`${activeTabIndex !== 1 ? 'hidden' : ''}`}><MeasurementsTab/></div>

            </SidePanel>
        </div>
    )
}

export default ViewerToolPanel;
