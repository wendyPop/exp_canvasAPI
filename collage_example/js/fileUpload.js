/*
 * This file is used for drag & drop file upload and image preview
 */

/************************************************************
 * Add the JavaScript support for drag & drop/browse upload *
 ***********************************************************/
function makeDroppable(element, callback) {
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('multiple', true);
  input.style.display = 'none';
  input.addEventListener('change', function (e) {
    triggerCallback(e, callback);
  });
  element.appendChild(input);

  element.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.add('dragover');
  });

  element.addEventListener('dragleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
  });

  element.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
    triggerCallback(e, callback);
  });

  element.addEventListener('click', function () {
    input.value = null;
    input.click();
  });
}

function triggerCallback(e, callback) {
  if (!callback || typeof callback !== 'function') {
    return;
  }
  var files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  callback.call(null, files);
}

/*************************************************************************
 * After drag & drop upload, create image elements and add image preview *
 * Make images draggable to canvas and register mouse & drag events      *
 ************************************************************************/
makeDroppable(document.querySelector('#dropZone'), function (files) {
  var output = document.querySelector('#images_preview');
  output.innerHTML = '';

  for (var i = 0; i < files.length; i++) {
    if (files[i].type.indexOf('image/') === 0) {

      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var image = new Image();
        image.id = Math.random().toString(36).substr(2, 9);    // Generate image ID
        image.height = 80;
        image.width = 80;
        image.src = this.result;

        image.ondragstart = function (e) {  // Register drag event
          e.dataTransfer.setData("text", e.target.id);
        };

        output.appendChild(image);      // Add image preview to page

      }, false);
      reader.readAsDataURL(files[i]);
    }
  }
});
