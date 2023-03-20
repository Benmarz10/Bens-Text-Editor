const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", () => {
  event.prompt();
  butInstall.setAttribute("disabled", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("appinstalled", event);
  butInstall.style.visibility = "hidden";
});
