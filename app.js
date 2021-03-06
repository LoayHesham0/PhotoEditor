
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");

  const originalBrightestDarkForm = document.getElementById("originalBrightestDarkForm");
  const originalDarkestBrightForm = document.getElementById("originalDarkestBrightForm");
  const transformedBrightestDarkForm = document.getElementById("transformedBrightestDarkForm");
  const transformedDarkestBrightForm = document.getElementById("transformedDarkestBrightForm");
  
  const originalBrightestDarkFormat = document.getElementById("originalBrightestDarkFormat");
  const originalDarkestBrightFormat = document.getElementById("originalDarkestBrightFormat");
  const transformedBrightestDarkFormat = document.getElementById("transformedBrightestDarkFormat");
  const transformedDarkestBrightFormat = document.getElementById("transformedDarkestBrightFormat");

  const inverseForm = document.getElementById("inverseForm");
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";

  } else if (transformType == "Decrease Brightness") {
    //write your code here
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";

  } else if (transformType == "Increase Contrast") {
    //Write your code here
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";

  } else if (transformType == "Decrease Contrast"){
    //Write your code here
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("inverseInputs").style.display = "none";
  }else{
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "initial";
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    increaseBrightness(Number(ib))
  });

  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var db = document.getElementById("db").value
    decreaseBrightness(Number(db))
  });
  transformedDarkestBrightForm.addEventListener("submit", (e) => {
     e.preventDefault()
     var originalBrightestDark = document.getElementById("OBD").value
     var originalDarkestBright = document.getElementById("ODB").value
     var transformedBrightestDark = document.getElementById("TBD").value
     var transformedDarkestBright = document.getElementById("TDB").value
     contrast(Number(originalBrightestDark),Number(originalDarkestBright),Number(transformedBrightestDark),Number(transformedDarkestBright));
   });
   transformedDarkestBrightFormat.addEventListener("submit", (e) => {
     e.preventDefault()
     var originalBrightestDark = document.getElementById("OBDFORMAT").value
     var originalDarkestBright = document.getElementById("ODBFORMAT").value
     var transformedBrightestDark = document.getElementById("TBDFORMAT").value
     var transformedDarkestBright = document.getElementById("TDBFORMAT").value
     contrast(Number(originalBrightestDark),Number(originalDarkestBright),Number(transformedBrightestDark),Number(transformedDarkestBright));
   });
   inverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    inverse();  
  });

  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
  function decreaseBrightness(db) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] - db;
      if (val < 0) {
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);
  }

  function contrast(originalBrightestDark,originalDarkestBright,transformedBrightestDark,transformedDarkestBright){
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');
    var transformedImage = [];
    var val;

    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i];
      if (val < originalBrightestDark) {
        val = getslope(0,0,originalBrightestDark,transformedBrightestDark,val);
      }
      else if (val == originalBrightestDark){
        val = transformedBrightestDark;
      }
      else if (val > originalBrightestDark && val < originalDarkestBright) {
        val = getslope(originalBrightestDark,transformedBrightestDark,originalDarkestBright,transformedDarkestBright,val);
      }
      else if (val == originalDarkestBright){
        val = transformedDarkestBright;
      }
      else if(val > originalDarkestBright){
        val = getslope(255,255,originalDarkestBright,transformedDarkestBright,val);
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx);
  }
  
  function getslope(x1,y1,x2,y2,input){
    var slope = (y2-y1)/(x2-x1);
    var intercept = y2 - slope * x2;
    return (slope*input) + intercept
  }

function inverse(){
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i];
      val = 255 - val;
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx);
  }

  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  