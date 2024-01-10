const newsletterSubmit = async (data) => {
  const msgDiv = {
    div: document.getElementById("_newsletter_form_msg"),
  };
  const formDiv = document.getElementById("_newsletter_form_div");

  const url = "/newsletter";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      msgDiv.div.classList.remove("hidden");
      formDiv.classList.add("hidden");
    })
    .catch((err) => {
      console.err(err);
      alert("Algo de errado ao gravar seu registro.");
    });
};

const form = document.getElementById("_newsletter_form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    await newsletterSubmit({ name, email });
  });
}
