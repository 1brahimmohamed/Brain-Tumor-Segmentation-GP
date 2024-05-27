import { utilities } from '@cornerstonejs/core';

/**
 * Sets the transfer function for a PET volume actor.
 *
 * @param {Object} options - The options for setting the transfer function.
 * @param {any} options.volumeActor - The volume actor to set the transfer function for.
 * @return {void} This function does not return a value.
 */
export default function setPetTransferFunction({ volumeActor }: { volumeActor: any }): void {
    const rgbTransferFunction = volumeActor.getProperty().getRGBTransferFunction(0);

    rgbTransferFunction.setRange(0, 5);

    utilities.invertRgbTransferFunction(rgbTransferFunction);
}
