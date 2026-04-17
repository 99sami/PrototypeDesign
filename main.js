// find our elements
const stageContainer = document.getElementById("stage-container");

let stageContainerWidth = stageContainer.offsetWidth;
// console.log(stageContainerWidth);
// find our height
let stageContainerHeight = stageContainer.offsetHeight;
// console.log(stageContainerHeight)

// create the konva stage
const stage = new Konva.Stage({
  container: "konva-stage",
  width: stageContainerWidth,
  height: stageContainerHeight,
});
// create our layer
const firstLayer = new Konva.Layer();
// add the layer to our stage
stage.add(firstLayer);

// Transformer
const tr = new Konva.Transformer();
firstLayer.add(tr);
// selected object tracker
let selected = null;

// adding my rectangle
const rect = new Konva.Rect({
  x: 0,
  y: 0,
  width: 450,
  height: 2000,
  fill: "black",
  // draggable: true
  stroke: "pink",
});

// add rectangle to layer
firstLayer.add(rect);

// draw the layer
firstLayer.draw();

// Adding my flower pngs

// const imageObj = new Image();

// imageObj.onload = function () {
//   const flower = new Konva.Image({
//     x: 2,
//     y: 2,
//     image: imageObj,
//     width: 120,
//     height: 120,
//     draggable: true
//   });

//   firstLayer.add(flower);
//   firstLayer.draw();
// };

// imageObj.src = "assets/Flower1.png";

// Adding images using an array due to the large quantity of files

// Flower Array
const flowers = [
  "assets/Flower1.png",
  "assets/Flower2.png",
  "assets/Flower3.png",
  "assets/Flower4.png",
  "assets/Flower5.png",
  "assets/Flower6.png",
  "assets/Flower7.png",
  "assets/Flower8.png",
  "assets/Flower9.png",
  "assets/Flower10.png",
  "assets/Flower11.png",
  "assets/Flower12.png",
  "assets/Flower13.png",
  "assets/Flower14.png",
  "assets/Flower15.png",
  "assets/Flower16.png",
  "assets/Flower17.png",
  "assets/Flower18.png",
  "assets/Flower19.png",
  "assets/Flower20.png",
  "assets/Flower21.png",
  "assets/Bouquet1.png",
  "assets/Bouquet2.png",
  "assets/Bouquet3.png",
  "assets/Stem1.png",
  "assets/Bow1.png",
  "assets/Bow2.png",
  "assets/Bow3.png",
  "assets/Bow4.png",
  "assets/Bow6.png",
  "assets/Bow7.png",
  "assets/Lace1.png",
  "assets/Lace2.png",
  "assets/Star1.png",
  "assets/Star2.png",
];

flowers.forEach((path, index) => {
  const imageObj = new Image();

  imageObj.onload = function () {
    const flower = new Konva.Image({
      x: 20 + (index % 3) * 130,
      y: 20 + Math.floor(index / 3) * 130,
      image: imageObj,
      width: 150,
      height: 150,
      draggable: false,
    });

    // Drag and Drop feautre
    flower.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });

    flower.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    //   Creating copy function on click
    flower.on("mousedown", function () {
      const pos = this.getAbsolutePosition();

      const cloneImg = new Image();
      cloneImg.src = path; // ✅ FIXED

      cloneImg.onload = function () {
        const clone = new Konva.Image({
          x: pos.x,
          y: pos.y,
          image: cloneImg,
          width: 150,
          height: 150,
          draggable: true,
        });

        clone.on("mouseover", function () {
          document.body.style.cursor = "pointer";
        });

        clone.on("mouseout", function () {
          document.body.style.cursor = "default";
        });

        // Select and transform
        clone.on("click", function () {
          selected = this;

          tr.nodes([this]); // attach transformer

          firstLayer.draw();
        });

        firstLayer.add(clone);
        firstLayer.draw();
      };
    });

    firstLayer.add(flower);
    firstLayer.draw();
  };

  imageObj.src = path;
});

// Deselect on click background
stage.on("click", function (e) {
  if (e.target === stage) {
    selected = null;
    tr.nodes([]);
    firstLayer.draw();
  }
});

// Transform
tr.on("transformstart", () => {
  console.log("transform start");
});

tr.on("transform", () => {
  console.log("transforming");
});

tr.on("transformend", () => {
  console.log("transform end");
});
