// import {IVolumeViewport} from "@cornerstonejs/core/dist/cjs/types";
// import {metaData} from "@cornerstonejs/core";
// import * as cornerstoneTools from "@cornerstonejs/tools";
//
// type TOrientationMarkersProps = {
//     currentImageId: string;
//     viewport: IVolumeViewport | null;
// }
// export function getOrientationMarkers(imageId :string, viewport: IVolumeViewport) {
//
//     const imagePlane = metaData.get('imagePlane', imageId);
//     if (!imagePlane || !imagePlane.rowCosines || !imagePlane.columnCosines) {
//         return;
//     }
//
//     const rowString = cornerstoneTools.
//         imagePlane.rowCosines
//     );
//     const columnString = cornerstoneTools.orientation.getOrientationString(
//         imagePlane.columnCosines
//     );
//     const oppositeRowString = cornerstoneTools.orientation.invertOrientationString(
//         rowString
//     );
//     const oppositeColumnString = cornerstoneTools.orientation.invertOrientationString(
//         columnString
//     );
//
//     const markers = {
//         top: oppositeColumnString,
//         left: oppositeRowString
//     };
//
//     // If any vertical or horizontal flips are applied, change the orientation strings ahead of
//     // the rotation applications
//     if (viewport.vflip) {
//         markers.top = cornerstoneTools.orientation.invertOrientationString(
//             markers.top
//         );
//     }
//
//     if (viewport.hflip) {
//         markers.left = cornerstoneTools.orientation.invertOrientationString(
//             markers.left
//         );
//     }
//
//     // Swap the labels accordingly if the viewport has been rotated
//     // This could be done in a more complex way for intermediate rotation values (e.g. 45 degrees)
//     if (viewport.rotation === 90 || viewport.rotation === -270) {
//         return {
//             top: markers.left,
//             left: cornerstoneTools.orientation.invertOrientationString(markers.top)
//         };
//     } else if (viewport.rotation === -90 || viewport.rotation === 270) {
//         return {
//             top: cornerstoneTools.orientation.invertOrientationString(markers.left),
//             left: markers.top
//         };
//     } else if (viewport.rotation === 180 || viewport.rotation === -180) {
//         return {
//             top: cornerstoneTools.orientation.invertOrientationString(markers.top),
//             left: cornerstoneTools.orientation.invertOrientationString(markers.left)
//         };
//     }
// }
//
//
//
//
//
// const OrientationMarkers = ({currentImageId, viewport} : TOrientationMarkersProps) => {
//
//     if (!currentImageId || !viewport)
//         return null;
//
//     // const markers = getOrientationMarkers(imageId, viewport);
//
// };
//
// export default OrientationMarkers;
