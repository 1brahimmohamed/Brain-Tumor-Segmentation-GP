import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { render, unstable_batchedUpdates } from "react-dom";
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWebImageLoader from "cornerstone-web-image-loader";
// import cornerstoneNIFTIImageLoader from "@cornerstonejs/nifti-image-loader";
const draw = cornerstoneTools.import("drawing/draw");
const drawRect = cornerstoneTools.importInternal("drawing/drawRect");
const getNewContext = cornerstoneTools.import("drawing/getNewContext");
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

//Configure WADO-URI Loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
const config = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: false,
      usePDFJS: false,
      strict: false
    }
  }
};
cornerstoneWADOImageLoader.webWorkerManager.initialize(config);


const DICOMurl = 'dicomweb:base/data/';


// Enable the DOM Element for use with Cornerstone


const mriImages = [
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00000.dcm",
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00001.dcm",
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00002.dcm",
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00003.dcm",
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00004.dcm",
    "wadouri:https://testdicombucket.s3.us-east-2.amazonaws.com/series-00000/series-00000/image-00005.dcm"
];
const segmantationImages = [
    "https://testdicombucket.s3.us-east-2.amazonaws.com/image.0000.jpg",
    "dicomweb:https://testdicombucket.s3.us-east-2.amazonaws.com/2a3c96dd-e659-470a-a83f-8c1f52752399.dcm"
];

const layers = [
  {
    images: mriImages,
    layerId: "",
    options: {
      visible: true,
      opacity: 1,
      name: "MRI",
      viewport: {
        colormap: ""
      }
    }
  },
  {
    images: segmantationImages,
    layerId: "",
    options: {
      name: "SEGMANTATION",
      visible: true,
      opacity: 0.7,
      viewport: {
        colormap: "",
        voi: {
          windowWidth: 30,
          windowCenter: 16
        }
      }
    }
  }
];

console.log(cornerstoneTools.ZoomTool);
const leftMouseToolChain = [
  { name: "Pan", func: cornerstoneTools.PanTool, config: {} },
  { name: "Magnify", func: cornerstoneTools.MagnifyTool, config: {} },
  { name: "Angle", func: cornerstoneTools.AngleTool, config: {} },
  { name: "Wwwc", func: cornerstoneTools.WwwcTool, config: {} },
  { name: "Eraser", func: cornerstoneTools.EraserTool, config: {} }
];

const ViewerTry = () => {
    const [wheelY, setWheelY] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [layerIndex, setLayerIndex] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const [colorMapList, setColorMapList] = useState(
        cornerstone.colors.getColormapsList()
    );
    const [color, setColor] = useState("");
    const viewerRef = useRef(null);
    const leftMouseToolsRef = useRef(null);
    const [leftMouseTool, setLeftMouseTool] = useState(
        leftMouseToolChain[0].name
    );

    function loadImages(index = 0) {
        const promises = [];

        layers.forEach(function (layer) {
            if (layer.options.visible) {
                const loadPromise = cornerstone.loadAndCacheImage(layer.images[index]);
                promises.push(loadPromise);
            }
        });

        return Promise.all(promises);
    }

    const updateTheImages = useCallback(
        async (index) => {
            const images = await loadImages(index);
            images.forEach((image, index) => {
                cornerstone.setLayerImage(
                viewerRef.current,
                image,
                layers[index].layerId
                );
                cornerstone.updateImage(viewerRef.current);
            });
        },
        [viewerRef]
    );

    useEffect(() => {
        if (!viewerRef.current) {
            return;
        }
        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
        cornerstoneWebImageLoader.external.cornerstone = cornerstone;
        cornerstoneTools.external.Hammer = Hammer;
        cornerstoneTools.init();
        cornerstone.enable(viewerRef.current);
        init();
        setTools();
        setEventListeners();
        return () => {
            removeEventListeners();
        };

    function removeEventListeners() {}

    function setEventListeners() {
      viewerRef.current.addEventListener(
        "cornerstonetoolsmousedrag",
        (event) => {
          // console.log(event.detail)
        }
      );
      viewerRef.current.addEventListener(
        "cornerstonetoolsmousewheel",
        (event) => {
          // scroll forward
          if (event.detail.detail.deltaY < 0) {
            setWheelY((position) => {
              if (position >= 4) {
                position = 4;
              } else {
                position += 1;
              }

              updateTheImages(position);
              return position;
            });
          } else {
            // scroll back
            setWheelY((position) => {
              if (position <= 0) {
                position = 0;
              } else {
                position -= 1;
              }

              updateTheImages(position);
              return position;
            });
          }
        }
      );
      // active layer가 변경되면 발동되는 이벤트
      viewerRef.current.addEventListener(
        "cornerstoneactivelayerchanged",
        function (e) {
          const layer = cornerstone.getActiveLayer(viewerRef.current);
          const colormap = layer.viewport.colormap;
          const opacity = layer.options.opacity;
          const isVisible = layer.options.visible;

          unstable_batchedUpdates(() => {
            setOpacity(opacity);
            setIsVisible(isVisible);
            setColor(colormap);
          });
        }
      );
    }
    function setTools() {
      // zoom
      const zoomTool = cornerstoneTools.ZoomTool;
      cornerstoneTools.addTool(zoomTool, {
        configuration: {
          invert: false,
          preventZoomOutsideImage: false,
          minScale: 0.1,
          maxScale: 20.0
        }
      });
      cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 2 });

      for (let i = 0; i < leftMouseToolChain.length; i++) {
        if (i === 0) {
          // panning
          cornerstoneTools.addTool(leftMouseToolChain[i].func);
          cornerstoneTools.setToolActive(leftMouseToolChain[i].name, {
            mouseButtonMask: 1
          });
        } else {
          cornerstoneTools.addTool(leftMouseToolChain[i].func);
          cornerstoneTools.setToolPassive(leftMouseToolChain[i].name, {
            mouseButtonMask: 1
          });
        }
      }
    }

    async function init() {
      const images = await loadImages();
      images.forEach((image, index) => {
        const layer = layers[index];
        const layerId = cornerstone.addLayer(
          viewerRef.current,
          image,
          layer.options
        );
        layers[index].layerId = layerId;

        if (index === 1) {
          cornerstone.setActiveLayer(viewerRef.current, layerId);
        }

        // Display the first image
        cornerstone.updateImage(viewerRef.current);
      });
    }
  }, [updateTheImages]);

  const onClickToggleInterpolation = () => {
    const viewport = cornerstone.getViewport(viewerRef.current);
    viewport.pixelReplication = !viewport.pixelReplication;
    cornerstone.setViewport(viewerRef.current, viewport);
  };

  const onClickRotation = () => {
    const el = document.getElementById("viewer");

    const enel = cornerstone.getEnabledElement(el);
    const context = getNewContext(enel.canvas);

    draw(context, (context) => {
      // A box with only the color defined
      drawRect(
        context,
        el,
        { x: 10, y: 10 },
        { x: 40, y: 40 },
        { color: "red" }
      );

      // Using other options - we can see that lineWidth works but fillStyle does not
      drawRect(
        context,
        el,
        { x: 20, y: 20 },
        { x: 50, y: 50 },
        {
          lineWidth: 4,
          color: "green",
          fillStyle: "pink" // adding fillStyle should cause the box to be filled
        }
      );
    });
    const viewport = cornerstone.getViewport(viewerRef.current);
    viewport.rotation += 90;
    cornerstone.setViewport(viewerRef.current, viewport);
  };

  const onChangeVisibility = (event) => {
    setIsVisible((isVisible = true) => {
      isVisible = !isVisible;

      const layer = cornerstone.getActiveLayer(viewerRef.current);
      layer.options.visible = isVisible;
      if (isVisible) {
        updateTheImages(wheelY).then(() => {
          return isVisible;
        });
      } else {
        return isVisible;
      }
    });

    cornerstone.updateImage(viewerRef.current);
  };

  const onChangeOpacity = (event) => {
    const opacity = event.target.value;
    const layer = cornerstone.getActiveLayer(viewerRef.current);
    layer.options.opacity = opacity;
    cornerstone.updateImage(viewerRef.current);
    setOpacity(opacity);
  };

  const onChangeLayer = (event) => {
    const index = event.target.value;
    setLayerIndex(index);
    cornerstone.setActiveLayer(viewerRef.current, layers[index].layerId);
  };

  const onChangeColorMapList = (event) => {
    const color = event.target.value;
    const layer = cornerstone.getActiveLayer(viewerRef.current);
    layer.viewport.colormap = color;
    cornerstone.updateImage(viewerRef.current);
    setColor(color);
  };

  const onClickToggleInvert = (event) => {
    const viewport = cornerstone.getViewport(viewerRef.current);
    viewport.invert = !viewport.invert;
    cornerstone.setViewport(viewerRef.current, viewport);
  };

  const onChangeLTools = (event) => {
    const toolName = event.target.value;

    for (let i = 0; i < leftMouseToolChain.length; i++) {
      if (leftMouseToolChain[i].name === toolName) {
        // panning
        cornerstoneTools.addTool(leftMouseToolChain[i].func);
        cornerstoneTools.setToolActive(leftMouseToolChain[i].name, {
          mouseButtonMask: 1
        });
      } else {
        cornerstoneTools.addTool(leftMouseToolChain[i].func);
        cornerstoneTools.setToolPassive(leftMouseToolChain[i].name, {
          mouseButtonMask: 1
        });

        cornerstone.updateImage(viewerRef.current);
      }
    }

    setLeftMouseTool(toolName);
  };



return (
    <div>

        <input
        type="file"
        accept=".dcm, .nii, .nii.gz, .dcm.gz"
        />

        <div>
            <label htmlFor="layer">Active layer: </label>
            <select id="layer" onChange={onChangeLayer} value={layerIndex}>
            <option value={0}>MRI</option>
            <option value={1}>SEGMANTATION</option>
            </select>

            <label htmlFor="wheelY"> wheelY: </label>
            <span id="wheelY">{wheelY}</span>

            <label htmlFor="opacity"> opacity: </label>
            <span id="opacity">{opacity}</span>
            <input
            type="range"
            onChange={onChangeOpacity}
            name="opacity"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            />

            <label htmlFor="layer"> Color map: </label>
            <select id="colorMap" value={color} onChange={onChangeColorMapList}>
            <option value="">None</option>
            {colorMapList.map((colorMapItem, index) => (
                <option key={colorMapItem.name + index} value={colorMapItem.id}>
                {colorMapItem.name}
                </option>
            ))}
            </select>

            <label htmlFor="visible"> visibility : </label>
            <input
            id="visible"
            type="checkbox"
            checked={isVisible}
            onChange={onChangeVisibility}
            />

            <button id="rotate" onClick={onClickRotation}>
            rotate 90
            </button>
            <button id="interpolation" onClick={onClickToggleInterpolation}>
            toggle interpolation
            </button>
            <button id="interpolation" onClick={onClickToggleInvert}>
            toggle invert
            </button>

            <form
            id="l-mouse-tools"
            ref={leftMouseToolsRef}
            onChange={onChangeLTools}
            >
            <label htmlFor="l-mouse-tools"> select L-mouse tool: </label>
            {leftMouseToolChain.map((tool) => (
                <Fragment key={tool.name}>
                <label htmlFor={tool.name}>{`| ${tool.name} =>`}</label>
                <input
                    type="radio"
                    name="l-mouse-tool"
                    id={tool.name}
                    value={tool.name}
                    checked={tool.name === leftMouseTool}
                />
                </Fragment>
            ))}
            </form>
        </div>
    
        <div
            ref={viewerRef}
            id="viewer"
            style={{
            width: "512px",
            height: "512px"
            }}
        />
    </div>
);
};

export default ViewerTry;
