const windowWidth = 400;
const windowCenter = 40;

const lower = windowCenter - windowWidth / 2.0;
const upper = windowCenter + windowWidth / 2.0;

const ctVoiRange = { lower, upper };

/**
 * Sets the color transfer function for a volume actor.
 *
 * @param {Object} options - The options for setting the transfer function.
 * @param {any} options.volumeActor - The volume actor to set the transfer function for.
 * @return {void} This function does not return a value.
 */
export default function setCtTransferFunctionForVolumeActor({ volumeActor }: { volumeActor: any }): void {
    volumeActor.getProperty().getRGBTransferFunction(0).setMappingRange(lower, upper);
}

export { ctVoiRange };
