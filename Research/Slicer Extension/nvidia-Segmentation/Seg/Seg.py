import logging
import os
import shutil
import time
import re

import vtk,slicer,ctk
from slicer.ScriptedLoadableModule import *
from slicer.util import VTKObservationMixin
import numpy as  np


import torch
from model.v2.nvidiabrain import *

from model.v2.nnunet import predict_nnunet 
from model.v2.utils import * 
import qt


# Seg

class Seg(ScriptedLoadableModule):
    """Uses ScriptedLoadableModule base class, available at:
    https://github.com/Slicer/Slicer/blob/master/Base/Python/slicer/ScriptedLoadableModule.py
    """

    def __init__(self, parent):
        ScriptedLoadableModule.__init__(self, parent)
        self.parent.title = "Seg"  # TODO: make this more human readable by adding spaces
        self.parent.categories = ["nvidia"]  # TODO: set categories (folders where the module shows up in the module selector)
        self.parent.dependencies = []  # TODO: add here list of module names that this module requires
        self.parent.contributors = ["Cairo University"]  # TODO: replace with "Firstname Lastname (Organization)"
        # TODO: update with short description of the module and a link to online module documentation
        self.parent.helpText = """
This is an example of scripted loadable module bundled in an extension.
"""
        # TODO: replace with organization, grant and thanks
        self.parent.acknowledgementText = """
This file was originally developed by Jean-Christophe Fillion-Robin, Kitware Inc., Andras Lasso, PerkLab,
and Steve Pieper, Isomics, Inc. and was partially funded by NIH grant 3P41RR013218-12S1.
"""

        # Additional initialization step after application startup is complete
        # slicer.app.connect("startupCompleted()", registerSampleData)


#
# Register sample data sets in Sample Data module
#



#
# SegWidget
#

class SegWidget(ScriptedLoadableModuleWidget, VTKObservationMixin):
    """Uses ScriptedLoadableModuleWidget base class, available at:
    https://github.com/Slicer/Slicer/blob/master/Base/Python/slicer/ScriptedLoadableModule.py
    """

    def __init__(self, parent=None):
        """
        Called when the user opens the module the first time and the widget is initialized.
        """
        ScriptedLoadableModuleWidget.__init__(self, parent)
        VTKObservationMixin.__init__(self)  # needed for parameter node observation
        self.logic = None
        self._parameterNode = None
        self._updatingGUIFromParameterNode = False
        self.output_directory=None



    def setup(self):
        """
        Called when the user opens the module the first time and the widget is initialized.
        """
        ScriptedLoadableModuleWidget.setup(self)

        # Hide data probe
        slicer.util.setDataProbeVisible(False)
        # hide Help & Acknowledgement section
        slicer.util.setModuleHelpSectionVisible(False)

        # Load widget from .ui file (created by Qt Designer).
        # Additional widgets can be instantiated manually and added to self.layout.
        uiWidget = slicer.util.loadUI(self.resourcePath('UI/Seg.ui'))
        self.layout.addWidget(uiWidget)
        self.ui = slicer.util.childWidgetVariables(uiWidget)

        # Set scene in MRML widgets. Make sure that in Qt designer the top-level qMRMLWidget's
        # "mrmlSceneChanged(vtkMRMLScene*)" signal in is connected to each MRML widget's.
        # "setMRMLScene(vtkMRMLScene*)" slot.
        uiWidget.setMRMLScene(slicer.mrmlScene)

        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.data = self.setUp()

        # Connections

        # These connections ensure that we update parameter node when scene is closed
        self.addObserver(slicer.mrmlScene, slicer.mrmlScene.StartCloseEvent, self.onSceneStartClose)
        self.addObserver(slicer.mrmlScene, slicer.mrmlScene.EndCloseEvent, self.onSceneEndClose)
        # Set the MRML scene for the qMRMLSubjectHierarchyTreeView widget
        # This is essential for the widget to properly interact with the Slicer MRML scene
        self.ui.SubjectHierarchyTreeView.setMRMLScene(slicer.mrmlScene)


        # Buttons
        self.ui.comboBox.addItems(['None', '3D-uNet', 'nnuNet', 'Nvidia-nnuNet'])
        
        self.ui.applyButton.connect('clicked(bool)', self.onApplyButton)
        self.ui.editSegmentation.connect('clicked(bool)', self.editSegmentation)
        # add a paint brush from segment editor window
        # Create a new segment editor widget and add it to the NiftyViewerWidget
        self._createSegmentEditorWidget_()


        # Make sure parameter node is initialized (needed for module reload)
        # self.initializeParameterNode()


    def _createSegmentEditorWidget_(self):
        """Create and initialize a customize Slicer Editor which contains just some the tools that we need for the segmentation"""

        import qSlicerSegmentationsModuleWidgetsPythonQt

        #advancedCollapsibleButton
        self.segmentEditorWidget = qSlicerSegmentationsModuleWidgetsPythonQt.qMRMLSegmentEditorWidget(
        )
        self.segmentEditorWidget.setMaximumNumberOfUndoStates(10)
        self.segmentEditorWidget.setMRMLScene(slicer.mrmlScene)
        self.segmentEditorWidget.unorderedEffectsVisible = False
        self.segmentEditorWidget.setEffectNameOrder([
            'No editing', 'Draw',
            'Paint','Erase'])    

        self.segmentEditorWidget.segmentationNodeSelectorVisible = False
   
        # self.segmentEditorWidget.setEffectNameOrder([
        #     'No editing','Threshold',
        #     'Paint', 'Draw', 
        #     'Erase','Level tracing',
        #     'Grow from seeds','Fill between slices',
        #     'Margin','Hollow',
        #     'Smoothing','Scissors',
        #     'Islands','Logical operators',
        #     'Mask volume'])
        

         # Create and add the Save button
        self.save_button = qt.QPushButton("Save")
        self.save_button.setToolTip("Save the segmentation")
        self.save_button.connect('clicked(bool)', self.onSaveButtonClick)
        self.save_button.setEnabled(False)
        self.layout.addWidget(self.segmentEditorWidget)
        self.layout.addWidget(self.save_button)


        # Add vertical spacer
        spacer = qt.QSpacerItem(20, 40, qt.QSizePolicy.Minimum, qt.QSizePolicy.Expanding)
        self.layout.addItem(spacer)

    def set_segmentation_and_mask_for_segmentation_editor(self):
        self.segmentEditorWidget.segmentationNodeSelectorVisible = True

        # done to update the user interface and handle any pending events.
        slicer.app.processEvents()
        # This specifies the scene in which the segmentation editor will operate.
        self.segmentEditorWidget.setMRMLScene(slicer.mrmlScene)

        # A new instance of vtkMRMLSegmentEditorNode is created. This node represents the settings and actions of the segmentation editor.
        segmentEditorNode = slicer.vtkMRMLSegmentEditorNode()
        
        # The newly created segmentEditorNode is added to the MRML scene. This step is necessary to make the node part of the scene and accessible by other components in Slicer.
        slicer.mrmlScene.AddNode(segmentEditorNode)
        # associate the created segmentEditorNode with the segmentation editor widget
        self.segmentEditorWidget.setMRMLSegmentEditorNode(segmentEditorNode)


    

# ************************************************************************************************************************************************
            
    def onApplyButton(self):
        """
        Run processing when user clicks "Apply" button.
        """

        modelname = self.ui.comboBox.currentText
        logging.info(f"Model name: {modelname}")
        
        with slicer.util.tryWithErrorDisplay("Failed to compute results.", waitCursor=True):

            # Compute results
            if modelname != 'None':


                if modelname == 'Nvidia-nnuNet':
                    print("hey nvidia")

                    # Get a list of all scalar volume nodes in the scene
                    volume_nodes = slicer.util.getNodesByClass("vtkMRMLScalarVolumeNode")
                    self.output_directory = os.path.dirname(volume_nodes[0].GetStorageNode().GetFileName())
                    current_file_dir_path = os.path.dirname(os.path.abspath(__file__))
                    BraTS2021_train_path =  os.path.join(current_file_dir_path, "BraTS2021_train")
                    BraTS2021_train_folders = os.listdir(BraTS2021_train_path)

                    # Iterate through the files and remove each one(files of previous study)
                    for folder in BraTS2021_train_folders:
                        folder_path = os.path.join(BraTS2021_train_path, folder)
                        if os.path.isdir(folder_path):
                            shutil.rmtree(folder_path)
                    
                    filename = volume_nodes[0].GetName()
                    # Extract the base filename without extension
                    base_filename = os.path.splitext(filename)[0]
                    # Remove the last underscore and everything after it
                    base_filename = base_filename.rsplit('_', 1)[0]

                    # Specify the path of the folder you want to create
                    input_folder_path = os.path.join(BraTS2021_train_path, base_filename)
                    # Use os.makedirs to create the folder and its parent directories if they don't exist
                    os.makedirs(input_folder_path, exist_ok=True)


                    # Loop through the volume nodes and retrieve the NIfTI file path for each
                    for volume_node in volume_nodes:
                        node_name = volume_node.GetName()

                        # Construct the output file path for this volume using its name
                        input_file_path = os.path.join(input_folder_path, f"{node_name}.nii.gz")

                        # Save the scalar volume as a NIfTI file
                        slicer.util.saveNode(volume_node, input_file_path)
                        print(f"Saved NIfTI file '{node_name}' to: {input_file_path}")
                    try:
                        prepare_dataset(input_folder_path, True)
                        print("Finished!")
                    except Exception as e:
                        print(f"An error occurred: {e}")
                    # else:
                    #     # to display the segmentation

                    #     filename = volume_nodes[0].GetName()

                    #     # Extract the base filename without extension
                    #     base_filename = os.path.splitext(filename)[0]

                    #     # Remove the last underscore and everything after it
                    #     base_filename = base_filename.rsplit('_', 1)[0]
                        
                    #     load_and_display_segmentation( os.path.join(self.output_directory, f"{base_filename}.nii.gz"))


 


    def editSegmentation(self):
        
        # Reset the slice views to clear any remaining segmentations
        slicer.util.resetSliceViews()
        self.save_button.setEnabled(True)

        try:
            self.set_segmentation_and_mask_for_segmentation_editor() 

        except:
            print("no mask")      

                
    def onSaveButtonClick(self):
        # to display the segmentation
        volume_nodes = slicer.util.getNodesByClass("vtkMRMLScalarVolumeNode")

        filename = volume_nodes[0].GetName()

        # Extract the base filename without extension
        base_filename = os.path.splitext(filename)[0]

        # Remove the last underscore and everything after it
        base_filename = base_filename.rsplit('_', 1)[0]

        #depends on naming      
        segmentationNode = slicer.util.getNode( f"{base_filename}.nii.gz")
        referenceVolumeNode = slicer.mrmlScene.GetFirstNodeByClass("vtkMRMLScalarVolumeNode")
        labelmapVolumeNode = slicer.mrmlScene.AddNewNodeByClass("vtkMRMLLabelMapVolumeNode")
 
        slicer.modules.segmentations.logic().ExportVisibleSegmentsToLabelmapNode(segmentationNode, labelmapVolumeNode, referenceVolumeNode)
        filepath = os.path.join(str(self.output_directory),'edited_segmentation.nii.gz')

        # Check if the file already exists
        if os.path.exists(filepath):
            os.remove(filepath)  # Remove the existing file
        # Check if a volume with the same name exists in the scene
        existing_volume_node = slicer.mrmlScene.GetFirstNodeByName('edited_segmentation.nii.gz')
        if existing_volume_node:
            slicer.mrmlScene.RemoveNode(existing_volume_node)  # Remove the existing volume

            
        slicer.util.saveNode(labelmapVolumeNode, filepath)

        # Cleanup: remove the labelmapVolumeNode as it was not added to the scene
        slicer.mrmlScene.RemoveNode(labelmapVolumeNode)




        load_and_display_segmentation(filepath)

# ************************************************************************************************************************************************


        
    def cleanup(self):
        """
        Called when the application closes and the module widget is destroyed.
        """
        self.removeObservers()

    def enter(self):
        """
        Called each time the user opens this module.
        """
        # Make sure parameter node exists and observed
        # self.initializeParameterNode()

    def exit(self):
        """
        Called each time the user opens a different module.
        """
        # Do not react to parameter node changes (GUI wlil be updated when the user enters into the module)
        self.removeObserver(self._parameterNode, vtk.vtkCommand.ModifiedEvent, self.updateGUIFromParameterNode)

    def onSceneStartClose(self, caller, event):
        """
        Called just before the scene is closed.
        """
        # Parameter node will be reset, do not use it anymore
        input 

    def onSceneEndClose(self, caller, event):
        """
        Called just after the scene is closed.
        """
        # If this module is shown while the scene is closed then recreate a new parameter node immediately
        # if self.parent.isEntered:
        #     self.initializeParameterNode()
        self.save_button.setEnabled(False)

        self.set_segmentation_and_mask_for_segmentation_editor() 
        self.segmentEditorWidget.segmentationNodeSelectorVisible = False
        self.output_directory = None
        print("Scene has closed!")



    def setParameterNode(self, inputParameterNode):
        """
        Set and observe parameter node.
        Observation is needed because when the parameter node is changed then the GUI must be updated immediately.
        """

        if inputParameterNode:
            self.logic.setDefaultParameters(inputParameterNode)

        # Unobserve previously selected parameter node and add an observer to the newly selected.
        # Changes of parameter node are observed so that whenever parameters are changed by a script or any other module
        # those are reflected immediately in the GUI.
        if self._parameterNode is not None:
            self.removeObserver(self._parameterNode, vtk.vtkCommand.ModifiedEvent, self.updateGUIFromParameterNode)
        self._parameterNode = inputParameterNode
        if self._parameterNode is not None:
            self.addObserver(self._parameterNode, vtk.vtkCommand.ModifiedEvent, self.updateGUIFromParameterNode)

        # Initial GUI update
        self.updateGUIFromParameterNode() 
 
 
    def setUp(self):
        """ Do whatever is needed to reset the state - typically a scene clear will be enough.
        """

        # return data
        return slicer.util.getNodesByClass("vtkMRMLScalarVolumeNode")




            
#
# SegTest
#

class SegTest(ScriptedLoadableModuleTest):
    """
    This is the test case for your scripted module.
    Uses ScriptedLoadableModuleTest base class, available at:
    https://github.com/Slicer/Slicer/blob/master/Base/Python/slicer/ScriptedLoadableModule.py
    """

    def setUp(self):
        """ Do whatever is needed to reset the state - typically a scene clear will be enough.
        """
        
        

    def runTest(self):
        """Run as few or as many tests as needed here.
        """
        self.setUp()

    











    