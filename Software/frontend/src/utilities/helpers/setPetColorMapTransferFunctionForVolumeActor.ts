import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';

interface IVolumeInfo {
    volumeActor: vtkVolume;
    preset?: string;
}

/**
 * Sets the color map transfer function for a volume actor based on the provided volume information.
 *
 * @param {any} volumeInfo - An object containing the volume actor and an optional preset.
 * @param {vtkVolume} volumeInfo.volumeActor - The volume actor to set the color map transfer function for.
 * @param {string} [volumeInfo.preset] - The preset to use for the color map transfer function. If not provided, the 'hsv' preset will be used.
 * @return {void} This function does not return anything.
 */
export default function setPetColorMapTransferFunctionForVolumeActor(volumeInfo: IVolumeInfo): void {
    const { volumeActor, preset } = volumeInfo;
    const mapper = volumeActor.getMapper();
    mapper?.setSampleDistance(1.0);

    const cfun = vtkColorTransferFunction.newInstance();
    const presetToUse = preset ? preset : vtkColorMaps.getPresetByName('hsv');
    cfun.applyColorMap(presetToUse);
    cfun.setMappingRange(0, 5);

    volumeActor.getProperty().setRGBTransferFunction(0, cfun);

    // Create scalar opacity function
    const ofun = vtkPiecewiseFunction.newInstance();
    ofun.addPoint(0, 0.0);
    ofun.addPoint(0.1, 0.9);
    ofun.addPoint(5, 1.0);

    volumeActor.getProperty().setScalarOpacity(0, ofun);
}
