var i,
  checkboxes = document.getElementsByClassName("vinkje");

for (var i = 0; i < checkboxes.length; i++) {
  (index => {
    checkboxes[index].addEventListener("click", save);
  })(i);
}
function save() {
  for (i = 0; i < checkboxes.length; i++) {
    localStorage.setItem(checkboxes[i].value, checkboxes[i].checked);
  }
}

//for loading
for (i = 0; i < checkboxes.length; i++) {
  checkboxes[i].checked =
    localStorage.getItem(checkboxes[i].value) === "true" ? true : false;
}


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("../sw.js").then(
      function(registration) {
        // Registration was successful
        registration.update();
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
