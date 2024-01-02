const photoGaleryChangePicture = (url) => {
  const element = document.getElementById("_recipe_photo_galery");
  if (element) {
    element.src = url;
  }
};
