import os, slicer

def load_and_display_segmentation(output_volume_path):
            
        if os.path.exists(output_volume_path):
           
            # Hide all segmentation nodes
            segmentation_nodes = slicer.util.getNodesByClass("vtkMRMLSegmentationNode")

            if(segmentation_nodes):
                for segmentation_node in segmentation_nodes:
                    segmentation_node.GetDisplayNode().SetVisibility(False)
            # Load the output volume into Slicer
            slicer.util.loadSegmentation(output_volume_path)
            # Show the output volume in the 3D view
            slicer.app.processEvents()  # Make sure events are processed
        else:
              print("No segmentation to display")

