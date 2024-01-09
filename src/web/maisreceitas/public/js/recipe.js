const photoGaleryChangePicture = (url) => {
  const element = document.getElementById("_recipe_photo_galery");
  if (element) {
    element.src = url;
  }
};

const ratingSubmit = async (data) => {
  const msgDiv = {
    div: document.getElementById("_rating_form_msg"),
    rate: document.getElementById("_rating_form_msg_rate"),
    name: document.getElementById("_rating_form_msg_name"),
    comment: document.getElementById("_rating_form_msg_comment"),
  };
  const formDiv = document.getElementById("_rating_form_div");

  const url = "#";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      msgDiv.div.classList.remove("hidden");
      msgDiv.rate.innerHTML = data.rate;
      msgDiv.name.innerHTML = data.name;
      msgDiv.comment.innerHTML = data.comment;

      formDiv.classList.add("hidden");
    })
    .catch((err) => {
      console.err(err);
      alert("Algo de errado ao gravar seu comentário.");
    });
  // return response.json();
};

const form = document.getElementById("_rating_form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const rate = document.querySelector('select[name="rate"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const comment = document.querySelector('textarea[name="comment"]').value;
    await ratingSubmit({ rate, name, comment });
  });
}
