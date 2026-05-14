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
// add pages in the stage
stage.add(firstLayer);
const page1 = new Konva.Group({ visible: true });
const page2 = new Konva.Group({ visible: false });
const page3 = new Konva.Group({ visible: false });
const page4 = new Konva.Group({ visible: false });
const page5 = new Konva.Group({ visible: false });

// add pages to layer
firstLayer.add(page1);
firstLayer.add(page2);
firstLayer.add(page3);
firstLayer.add(page4);
firstLayer.add(page5);

// Transformer
const tr = new Konva.Transformer();
firstLayer.add(tr);
// selected object tracker
let selected = null;

// adding my rectangle
const rect = new Konva.Rect({
  x: 0,
  y: 0,
  width: 600,
  height: stageContainerHeight,
  fill: "black",
  // draggable: true
  stroke: "pink",
});

// add rectangles to layer
page1.add(rect.clone());
page2.add(rect.clone());
page3.add(rect.clone());
page4.add(rect.clone());
page5.add(rect.clone());

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
  //   "assets/Flower17.png",
  //   "assets/Flower18.png",
  //   "assets/Flower19.png",
  //   "assets/Flower20.png",
  "assets/Flower21.png",
  "assets/Flower22.png",
  "assets/Flower23.png",
  "assets/Flower24.png",
  "assets/Flower25.png",
  "assets/Flower26.png",
  "assets/Flower27.png",
  "assets/Flower28.png",
  "assets/Flower29.png",
  "assets/Flower30.png",
  "assets/Flower31.png",
  "assets/Flower32.png",
  "assets/Flower33.png",
  "assets/Flower34.png",
  "assets/Flower35.png",
  "assets/Flower36.png",
  "assets/Flower37.png",
  "assets/Flower38.png",
  "assets/Flower39.png",
  "assets/Flower40.png",
  "assets/Flower41.png",
  "assets/Flower42.png",
  "assets/Flower43.png",
  "assets/Flower44.png",
  "assets/Flower45.png",
  "assets/Flower46.png",
  "assets/Flower47.png",
  "assets/Flower48.png",
  "assets/Flower49.png",
  "assets/Flower50.png",
  "assets/Flower51.png",
  "assets/Flower52.png",
  "assets/Lace1.png",
  "assets/Lace2.png",
  "assets/Lace3.png",
  "assets/Lace4.png",
  "assets/Lace5.png",
  "assets/Lace6.png",
  "assets/Lace7.png",
  "assets/Lace8.png",
  "assets/Lace9.png",
  "assets/Lace10.png",
  "assets/Lace11.png",
  "assets/Lace12.png",
  "assets/Lace13.png",
  "assets/Lace14.png",
  "assets/Lace15.png",
  "assets/Lace16.png",
  "assets/Dec1.png",
  "assets/Dec2.png",
  "assets/Dec3.png",
  "assets/Dec4.png",
  "assets/Dec5.png",
  "assets/Dec6.png",
  "assets/Dec7.png",
  "assets/Dec8.png",
  "assets/Dec9.png",
  "assets/Dec10.png",
  "assets/Dec11.png",
  "assets/Dec12.png",
  "assets/Dec13.png",
  "assets/Dec14.png",
  "assets/Dec15.png",
  "assets/Dec16.png",
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
    const itemsPerPage = 16;

    const pageIndex = Math.floor(index / itemsPerPage);
    const indexInPage = index % itemsPerPage;

    const col = indexInPage % 4;
    const row = Math.floor(indexInPage / 4);

    // flowers
    const flower = new Konva.Image({
      x: 30 + col * 130,
      y: 150 + row * 139,
      image: imageObj,
      width: 150,
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
    } else if (pageIndex === 1) {
      page2.add(flower);
    } else if (pageIndex === 2) {
      page3.add(flower);
    } else if (pageIndex === 3) {
      page4.add(flower);
    } else if (pageIndex == 4) {
      page5.add(flower);
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
// adding in a delete / remove feature for assets
window.addEventListener("keydown", function (e) {
  // only run function if something is selected
  if (!selected) return;

  // delete key function
  if (e.key === "Delete" || e.key === "Backspace") {
    // remove selected flower
    selected.destroy();

    // remove transformer selection
    tr.nodes([]);

    // reset tracker
    selected = null;

    // redraw the layer
    firstLayer.draw();
  }
});

// to enhance user experience, im adding pages into the tool to remove having to scroll down to retrive assets.

//  next arrow

const nextArrow = new Konva.Text({
  x: 500,
  y: stage.height() - 60,
  //   text: "⋆ ˚｡⋆ ",
  text: "next",
  fontSize: 20,
  fontFamily: "IM Fell English",
  fontStyle: "italic",
  fill: "#C9A9A6",
  cursor: "pointer",
});

firstLayer.add(nextArrow);
nextArrow.zIndex(9999);
firstLayer.draw();

// back arrow

const backArrow = new Konva.Text({
  x: 40,
  y: stage.height() - 60,
  text: "back",
  fontSize: 20,
  fontFamily: "IM Fell English",
  fill: "#C9A9A6",
  fontStyle: "italic",
  cursor: "pointer",
});

firstLayer.add(backArrow);
backArrow.zIndex(9999);

let currentPage = 0;
const pages = [page1, page2, page3, page4, page5];

// nextArrow.on("click", () => {
//   pages[currentPage].visible(false);

//   backArrow.on("click", () => {
//     pages[currentPage].visible(false);

//   currentPage = (currentPage + 1) % pages.length;

//   pages[currentPage].visible(true);

//   firstLayer.draw();
// });

// next page

nextArrow.on("click", () => {
  pages[currentPage].visible(false);

  currentPage = (currentPage + 1) % pages.length;

  pages[currentPage].visible(true);

  firstLayer.draw();
});

//   previous page

backArrow.on("click", () => {
  pages[currentPage].visible(false);

  currentPage = (currentPage - 1 + pages.length) % pages.length;

  pages[currentPage].visible(true);

  firstLayer.draw();
});

// adding a title to each page

// want to lean in heavy with the coquette theme / aesthetics on this one
const page1Title = new Konva.Text({
  x: 35,
  y: 50,
  text: "𐙚   flowers   ˚ ",
  fontSize: 36,
  fontFamily: "IM Fell English",
  fill: "#F9F6EE",
  fontStyle: "italic",
});
// side note i really love this font , the text is strong feature that ties the aesthetic in
page1.add(page1Title);

document.fonts.ready.then(() => {
  firstLayer.draw();
});

const page2Title = new Konva.Text({
  x: 35,
  y: 50,
  text: "𐙚   stems    ˚ ",
  fontSize: 36,
  fontFamily: "IM Fell English",
  fill: "#F9F6EE",
  fontStyle: "italic",
});

page2.add(page2Title);

const page3Title = new Konva.Text({
  x: 35,
  y: 50,
  text: "𐙚   wraps    ˚ ",
  fontSize: 36,
  fontFamily: "IM Fell English",
  fill: "#F9F6EE",
  fontStyle: "italic",
});

page3.add(page3Title);

const page4Title = new Konva.Text({
  x: 35,
  y: 50,
  text: "𐙚   bows    ˚ ",
  fontSize: 36,
  fontFamily: "IM Fell English",
  fill: "#F9F6EE",
  fontStyle: "italic",
});

page4.add(page4Title);

const page5Title = new Konva.Text({
  x: 35,
  y: 50,
  text: "𐙚   decorations    ˚ ",
  fontSize: 36,
  fontFamily: "IM Fell English",
  fill: "#F9F6EE",
  fontStyle: "italic",
});

page5.add(page5Title);

// adding in save image function
// add button

// const button = document.createElement('button');
// button.textContent = 'Save as High Quality Image';
// document.body.appendChild(button);
// button.addEventListener('click', () => {
//     // save stage as a high quality image
//     const dataURL = stage.toDataURL({
//       pixelRatio: 2 // double resolution
//     });

//     // create link to download
//     const link = document.createElement('a');
//     link.download = 'stage.png';
//     link.href = dataURL;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   });

// adding button with HTML and designing it in CSS
const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {
  const dataURL = stage.toDataURL({
    pixelRatio: 3,
  });

  const link = document.createElement("a");

  link.download = "my-bouquet.png";
  link.href = dataURL;

  link.click();
});
