const photoGaleryChangePicture = (url) => {
  const element = document.getElementById("_recipe_photo_galery");
  if (element) {
    element.src = url;
  }
};

const ratingSubmit = () => {
  alert("Comentário enviado para avaliação.");
};
