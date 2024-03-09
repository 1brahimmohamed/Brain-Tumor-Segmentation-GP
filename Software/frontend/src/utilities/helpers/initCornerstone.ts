import initProviders from './initProviders.ts';
import initCornerstoneDICOMImageLoader from './initCornerstoneDICOMImageLoader.js';
import initVolumeLoader from './initVolumeLoader.js';
import { init as csRenderInit } from '@cornerstonejs/core';
import { init as csToolsInit } from '@cornerstonejs/tools';

export default async function initCornerstone() {
    initProviders();
    initCornerstoneDICOMImageLoader();
    initVolumeLoader();
    await csRenderInit();
    await csToolsInit();
}
