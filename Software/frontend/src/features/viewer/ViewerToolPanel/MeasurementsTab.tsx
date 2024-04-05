import {MeasurementTable} from "@ui/library";
import {Button} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import {CornerstoneToolManager} from "@features/viewer/CornerstoneToolManager";
import * as cornerstoneTools from "@cornerstonejs/tools";
import {useEffect, useState} from "react";
const MeasurementsTab = () => {

    const annotations = cornerstoneTools.annotation.state.getAllAnnotations();

    const [measurementsData, setMeasurementsData] = useState<any>([]);

    useEffect(() => {
        const data = annotations.map((annotation: any) => {
            return {
                uid: annotation.annotationUID,
                label: annotation.label,
                displayText: annotation.text,
                isActive: false
            }
        });
        setMeasurementsData(data);
    }, []);

    return (
        <div className={""}>
            <MeasurementTable
                title={"Measurements"}
                data={measurementsData}
                onClick={(data) => console.log(data)}
                onEdit={(data) => console.log(data)}
            />
            <div className={"p-2 flex justify-center gap-2"}>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    style={{color: "white"}}
                    endIcon={<UploadIcon className={"rotate-180"}/>}
                    onClick={CornerstoneToolManager.downloadAnnotations}
                >
                    Export

                </Button>

                <Button
                    color={"secondary"}
                    variant={"contained"}
                    style={{color: "white"}}
                    endIcon={<UploadIcon/>}
                    onClick={CornerstoneToolManager.loadAnnotations}
                >
                    Import
                </Button>
            </div>
        </div>
    );
}

export default MeasurementsTab;
