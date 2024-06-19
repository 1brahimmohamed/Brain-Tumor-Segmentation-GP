cmake_minimum_required(VERSION 3.16.3...3.19.7 FATAL_ERROR)

project(MMMAI)

#-----------------------------------------------------------------------------
# Extension meta-information
set(EXTENSION_HOMEPAGE "https://www.slicer.org/wiki/Documentation/Nightly/Extensions/MMMAI")
set(EXTENSION_CATEGORY "MMMAI")
set(EXTENSION_CONTRIBUTORS "John Doe (AnyWare Corp.), MMMAI Team (Cairo University)")
set(EXTENSION_DESCRIPTION "The extension allows users to interactively edit the segmentation resulting from advanced AI models and retrain them to improve performance.")
set(EXTENSION_ICONURL "https://www.example.com/Slicer/Extensions/MMMAI.png")
set(EXTENSION_SCREENSHOTURLS "https://www.example.com/Slicer/Extensions/MMMAI/Screenshots/1.png")
set(EXTENSION_DEPENDS "NA") # Specified as a list or "NA" if no dependencies

#-----------------------------------------------------------------------------
# Extension dependencies
find_package(Slicer REQUIRED)
include(${Slicer_USE_FILE})

#-----------------------------------------------------------------------------
# Extension modules
add_subdirectory(InteractiveSegmentation)
## NEXT_MODULE

#-----------------------------------------------------------------------------
include(${Slicer_EXTENSION_GENERATE_CONFIG})
include(${Slicer_EXTENSION_CPACK})
