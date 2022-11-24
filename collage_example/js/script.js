/*
 * This file is used for interaction with the canvas element and initializations
 */

/*******************************************************
 * Change canvas 1 background after image was selected *
 ******************************************************/
function setBackground() {
  var file = $("#singleUpload")[0].files[0];
  var canvas = document.getElementById("background");
  var context = canvas.getContext("2d");
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    var backgroundImage = new Image();
    backgroundImage.src = this.result;
    backgroundImage.onload = function () {
      context.drawImage(backgroundImage, 0, 0, 600, 600);      // Draw and stretch
      // image to fill canvas
    };
  }, false);
  reader.readAsDataURL(file);
}

/*************************************
 * Global variables, initialisations *
 ************************************/
$("#singleUpload").val("");                // Reset background selection on page refresh
$("#modelSelect").val("");                 // Reset model selection on page refresh

document.getElementById("background").style.visibility = "hidden";              // Hide canvas until model is selected

/**************************************
 * Export canvas and download as imag *
 *************************************/
var link = document.getElementById('btn-download');
link.addEventListener('click', function (e) {

  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");
  canvas.width = 605;
  canvas.height = 605;

  // We need to get all images droped on all canvases and combine them on above canvas
  $('#photo').children('canvas').each(function () {
    var image = this;

    context.beginPath();      // Simulate CSS padding around images by drawing white
    // rectangles behind images on export
    context.rect((image.offsetLeft - 480), (image.offsetTop - 76), image.width,
      image.height);
    context.fillStyle = "white";
    context.fill();

    context.drawImage(image, (image.offsetLeft - 480 + 5), (image.offsetTop - 76 + 5),
      (image.width - 10), (image.height - 10));    // Draw image
  });

  link.href = canvas.toDataURL();   // Save all combined images to one image
  link.download = "photo.png";      // Download the image
}, false);

/***************************************
 * Change model after drop-down select *
 **************************************/
function modelSelect() {

  var background = document.getElementById("background"); // Keep background canvas

  var photo = document.getElementById("photo");
  while (photo.firstChild) {                              // Remove all child canvases
    photo.removeChild(photo.firstChild);
  }
  photo.appendChild(background);                          // Attach background canvas back todo why?

  var selectedModel = document.getElementById("modelSelect").value;    // Get the selected
  // model value

  switch (selectedModel) {

    case "model1":
      // If model1 was selected, draw pattern using 3 new
      // canvas elements as layers on top of background canvas

      document.getElementById("background").style.visibility = "visible"; // Make
      // background canvas visible

      var layer1 = document.createElement('canvas'); // Create first square canvas
      // programmatically
      layer1.className = "layer";
      layer1.width = 200;                   // Set square canvas width
      layer1.height = 200;                  // Set square canvas height
      layer1.style.top = "130px";           // Position square canvas 130px from top
      layer1.style.left = "540px";          // Position square canvas 540px from left
      layer1.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer1); // Add first square canvas to photo element on page
      registerEvents(layer1); // Add event listeners that help drag & drop on canvas

      var layer2 = document.createElement('canvas');      // Same as above ... create
      // second square canvas.. etc
      layer2.className = "layer";
      layer2.width = 110;
      layer2.height = 110;
      layer2.style.top = "180px";
      layer2.style.left = "840px";
      layer2.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer2);
      registerEvents(layer2);

      var layer3 = document.createElement('canvas');
      layer3.className = "layer";
      layer3.width = 340;
      layer3.height = 230;
      layer3.style.top = "400px";
      layer3.style.left = "670px";
      layer3.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer3);
      registerEvents(layer3);

      break;

    case "model2":  // If model2 was selected, draw pattern using 2 new canvas elements
      // as layers on top of background canvas

      document.getElementById("background").style.visibility = "visible";

      var layer1 = document.createElement('canvas');
      layer1.className = "layer";
      layer1.width = 250;
      layer1.height = 250;
      layer1.style.top = "81px";
      layer1.style.left = "485px";
      layer1.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer1);
      registerEvents(layer1);

      var layer2 = document.createElement('canvas');
      layer2.className = "layer";
      layer2.width = 150;
      layer2.height = 600;
      layer2.style.top = "81px";
      layer2.style.left = "785px";
      layer2.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer2);
      registerEvents(layer2);

      break;

    case "model3":  // If model3 was selected, draw pattern using 2 new canvas elements
      // as layers on top of background canvas

      document.getElementById("background").style.visibility = "visible";

      var layer1 = document.createElement('canvas');
      layer1.className = "layer";
      layer1.width = 250;
      layer1.height = 250;
      layer1.style.top = "81px";
      layer1.style.left = "485px";
      layer1.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer1);
      registerEvents(layer1);

      var layer2 = document.createElement('canvas');
      layer2.className = "layer";
      layer2.width = 300;
      layer2.height = 600;
      layer2.style.top = "81px";
      layer2.style.left = "785px";
      layer2.style.visibility = "visible";

      var body = document.getElementById("photo");
      body.appendChild(layer2);
      registerEvents(layer2);

      break;

    default:
      document.getElementById("background").style.visibility = "hidden";  // Hide
      // canvas until model is selected
  }
}

/**********************************************************
 * Register drag & drop event listeners to canvas element *
 *********************************************************/
function registerEvents(canvas) {

  canvas.ondragenter = function () {
    canvas.style.border = "dashed 2px #555";  // Change the canvas borders when hovering
  };
  canvas.ondragleave = function () {
    canvas.style.border = "none";    // Reset canvas borders when hovering is not active
  };
  canvas.ondragover = function (e) {
    e.preventDefault();
  };
  canvas.ondrop = function (e) {
    e.preventDefault();
    var id = e.dataTransfer.getData("text");
    var dropImage = document.getElementById(id);
    canvas.style.border = "none";              // Reset canvas borders after image drop

    var context = canvas.getContext("2d");
    context.drawImage(dropImage, 0, 0, canvas.width, canvas.height);     // Draw and stretch image to fill canvas
  };
}
