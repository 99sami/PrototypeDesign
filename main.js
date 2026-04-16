// find our elements
const stageContainer = document.getElementById("stage-container");
const circleButton = document.getElementById("circle-button");

let stageContainerWidth = stageContainer.offsetWidth;
// console.log(stageContainerWidth);
// find our height
let stageContainerHeight = stageContainer.offsetHeight;
// console.log(stageContainerHeight)

// set default circle colour
let circleColour = "red";

// create the konca stage
const stage = new Konva.Stage({
  container: "konva-stage",
  width: stageContainerWidth,
  height: stageContainerHeight,
});
// create our layer
const firstLayer = new Konva.Layer();

// add the layer to our stage
stage.add(firstLayer);
