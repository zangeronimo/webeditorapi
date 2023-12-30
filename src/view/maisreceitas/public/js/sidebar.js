const showSubMenu = (id) => {
  const element = document.getElementById(id);

  if (element) {
    if (element.classList.contains("show_submenu")) {
      element.classList.remove("show_submenu");
    } else {
      element.classList.add("show_submenu");
    }
  }
};

const showSideBar = () => {
  const element = document.getElementById("_maisreceitas_sidebar");

  if (element) {
    if (element.classList.contains("show_sidebar")) {
      element.classList.remove("show_sidebar");
    } else {
      element.classList.add("show_sidebar");
    }
  }
};
