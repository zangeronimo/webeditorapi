const _handleSort = (field, desc = false) => {
  let init = "?";
  let currentOrderBy = "";
  let newDesc = desc;
  const searchParams = new URLSearchParams(window.location.search);

  for (const entry of searchParams) {
    if (entry[0] === "orderBy") currentOrderBy = entry[1];
    if (entry[0] === "desc") newDesc = entry[1] === "true" ? false : true;
    if (entry[0] !== "orderBy" && entry[0] !== "desc")
      init === "?"
        ? (init = `?${entry[0]}=${entry[1]}`)
        : (init += `&${entry[0]}=${entry[1]}`);
  }

  init = init !== "?" ? `${init}&` : init;
  document.location.href = `${init}orderBy=${field}&desc=${
    currentOrderBy === field ? newDesc : desc
  }`;
};

const _userHasPermissionAsync = async (role) => {
  return fetch("/has-permission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json.hasPermission;
    });
};

const _showButtonsWithPermission = (role, name) => {
  _userHasPermissionAsync(role).then((res) => {
    const elements = document.getElementsByName(name);
    elements.forEach((element) => {
      element.disabled = !res;
    });
  });
};
