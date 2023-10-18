document.addEventListener("DOMContentLoaded", function() {
  var loader = document.getElementById("preloader");
    
  if (!loader) {
    console.error("Preloader element not found!");
    return;
  }

  window.addEventListener("load", function() {
    setTimeout(function() {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);  // remove after the fade-out transition

      console.log("Preloader has been removed from the DOM.");
    }, 1000); //1000 milliseconds -> 1 second

  });

});
