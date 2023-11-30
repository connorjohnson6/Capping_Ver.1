/**
 * Script for handling goal setting and progress tracking for carbon emissions.
 *
 * This script attaches an event listener to a form for setting a carbon goal. It prevents the
 * default form submission behavior and calculates the user's progress towards their carbon
 * emission goal. This progress is then displayed both textually and visually with a progress bar.
 *
 * The current emissions value is to be fetched from a database or another source; it is set to 0
 * by default in this script.
 *
 * @fileoverview Logic for carbon goal setting and progress tracking display.
 * @author [Matthew O'Malley]
 */

// Element references for goal setting and progress display
const goalForm = document.getElementById("carbon-goal-form");
const currentEmissionsDisplay = document.getElementById("current-emissions");
const goalDisplay = document.getElementById("goal");
const progressBar = document.getElementById("progress-bar");
const progressPercentage = document.getElementById("progress-percentage");

// Event listener for the goal form submission
goalForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents default form submission behavior

    // Retrieves the carbon goal value from the form input
    const carbonGoal = parseFloat(document.getElementById("carbon-goal").value);
    // Placeholder for current emissions value, to be replaced with actual data retrieval
    const currentEmissions = /* Fetch current emissions from a database or other source */ 0;

    // Updates the display elements with the goal and current emissions
    goalDisplay.textContent = carbonGoal.toFixed(2);
    currentEmissionsDisplay.textContent = currentEmissions.toFixed(2);

    // Calculates and displays progress towards the goal
    if (carbonGoal > 0) {
        const progress = ((currentEmissions / carbonGoal) * 100).toFixed(2);
        progressPercentage.textContent = `${progress}%`;
        // Updates the progress bar's appearance based on the progress
        progressBar.style.transform = `rotate(${360 - (progress * 3.6)}deg)`;
    } else {
        // Handles cases where the goal is not set or invalid
        progressPercentage.textContent = "Goal not set";
        progressBar.style.transform = "rotate(0deg)";
    }
});
