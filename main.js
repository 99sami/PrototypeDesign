// find our elements
const stageContainer = document.getElementById("stage-container");

// let stageContainerWidth = stageContainer.offsetWidth;
// console.log(stageContainerWidth);
// find our height
// console.log(stageContainerHeight)

let stageContainerWidth = window.innerWidth;
let stageContainerHeight = window.innerHeight;

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
const page1 = new Konva.Group({ visible: true });
const page2 = new Konva.Group({ visible: false });

// add pages to layer
firstLayer.add(page1);
firstLayer.add(page2);

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
  height: stageContainerHeight,
  fill: "black",
  // draggable: true
  stroke: "pink",
});

// add rectangles to layer
page1.add(rect.clone());
page2.add(rect.clone());

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

// Adding images using an array due to the large quantity of files but keeping the code above just incase i need to upload them individually

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

// flowers.forEach((path, index) => {
//   const imageObj = new Image();

//   imageObj.onload = function () {
//     const flower = new Konva.Image({
//       x: 20 + (index % 3) * 130,
//       y: 20 + Math.floor(index / 3) * 130,
//       image: imageObj,
//       width: 150,
//       height: 150,
//       draggable: false,
//     });

flowers.forEach((path, index) => {
  const imageObj = new Image();

  imageObj.onload = function () {
    // adding in a block
    const itemsPerPage = 18;

    const pageIndex = Math.floor(index / itemsPerPage);
    const indexInPage = index % itemsPerPage;

    const col = indexInPage % 3;
    const row = Math.floor(indexInPage / 3);

    // flowers
    const flower = new Konva.Image({
      x: 20 + col * 130,
      y: 20 + row * 130,
      image: imageObj,
      width: 120,
      height: 120,
      draggable: false,
    });

    // Drag and Drop feautre
    flower.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });

    flower.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    // copy function on click
    flower.on("mousedown", function () {
      const pos = this.getAbsolutePosition();

      const cloneImg = new Image();
      cloneImg.src = path;

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

          tr.nodes([this]);

          firstLayer.draw();
        });

        firstLayer.add(clone);
        firstLayer.draw();
      };
    });

    if (pageIndex === 0) {
      page1.add(flower);
    } else {
      page2.add(flower);
    }
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

// to enhance user ecperience, im going to start by adding pages into the tool to remove having to scroll down to retrive assets.

const nextArrow = new Konva.Text({
  x: stage.width() - 120,
  y: stage.height() - 80,
  text: "→",
  fontSize: 50,
  fill: "red",
  cursor: "pointer",
});

firstLayer.add(nextArrow);
nextArrow.zIndex(9999);
firstLayer.draw();

let currentPage = 0;
const pages = [page1, page2];

nextArrow.on("click", () => {
  pages[currentPage].visible(false);

  currentPage = (currentPage + 1) % pages.length;

  pages[currentPage].visible(true);

  firstLayer.draw();
});
