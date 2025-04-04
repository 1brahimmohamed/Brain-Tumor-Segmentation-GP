import initProviders from './initProviders.ts';
import initCornerstoneDICOMImageLoader from './initCornerstoneDICOMImageLoader';
import initVolumeLoader from './initVolumeLoader';
import { init as csRenderInit } from '@cornerstonejs/core';
import { init as csToolsInit } from '@cornerstonejs/tools';

export default async function initDemo() {
    initProviders();
    initCornerstoneDICOMImageLoader();
    initVolumeLoader();
    await csRenderInit();
    csToolsInit();
}
