cmake_minimum_required(VERSION 3.16.3...3.19.7 FATAL_ERROR)

project(nvidia-Segmentation)

#-----------------------------------------------------------------------------
# Extension meta-information
set(EXTENSION_HOMEPAGE "https://www.slicer.org/wiki/Documentation/Nightly/Extensions/RC")
set(EXTENSION_CATEGORY "nvidia")
set(EXTENSION_CONTRIBUTORS "Cairo University")
set(EXTENSION_DESCRIPTION " A 3D Slicer extension for brain tumor segmentation using an AI model. The extension allows users to interactively edit the segmentation for improved accuracy")
# set(EXTENSION_ICONURL "https://www.example.com/Slicer/Extensions/RC.png")
# set(EXTENSION_SCREENSHOTURLS "https://www.example.com/Slicer/Extensions/RC/Screenshots/1.png")
set(EXTENSION_DEPENDS "NA") # Specified as a list or "NA" if no dependencies

#-----------------------------------------------------------------------------
# Extension dependencies
find_package(Slicer REQUIRED)
include(${Slicer_USE_FILE})

#-----------------------------------------------------------------------------
# Extension modules
add_subdirectory(Seg)
add_subdirectory(nvidiaModel)
## NEXT_MODULE

#-----------------------------------------------------------------------------
include(${Slicer_EXTENSION_GENERATE_CONFIG})
include(${Slicer_EXTENSION_CPACK})
