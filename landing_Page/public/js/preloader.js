/**
 * Script for handling the preloader behavior on a webpage.
 *
 * This script listens for the DOMContentLoaded event and then sets up another event listener
 * for the window's load event. Once the page is fully loaded, it fades out the preloader element
 * and then removes it from the DOM. This provides a visual indication to the user that the page
 * is ready.
 *
 * @fileoverview Management of preloader fade-out and removal on page load.
 * @author [Connor Johnson]
 */

 document.addEventListener("DOMContentLoaded", function() {
  // Retrieves the preloader element
  var loader = document.getElementById("preloader");
    
  // Checks if the preloader element exists
  if (!loader) {
    console.error("Preloader element not found!");
    return;
  }

  // Listens for the window's load event
  window.addEventListener("load", function() {
    // Sets a timeout to allow for a fade-out effect
    setTimeout(function() {
      loader.style.opacity = '0'; // Fades out the preloader
      // Removes the preloader from the DOM after the fade-out transition
      setTimeout(() => loader.remove(), 500);

      console.log("Preloader has been removed from the DOM.");
    }, 1000); // Waits for 1 second before starting the fade-out
  });
});
