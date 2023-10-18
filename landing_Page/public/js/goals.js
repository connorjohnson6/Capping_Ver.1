// JavaScript logic for handling goal setting and progress tracking
const goalForm = document.getElementById("carbon-goal-form");
const currentEmissionsDisplay = document.getElementById("current-emissions");
const goalDisplay = document.getElementById("goal");
const progressBar = document.getElementById("progress-bar");
const progressPercentage = document.getElementById("progress-percentage");

goalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const carbonGoal = parseFloat(document.getElementById("carbon-goal").value);
    const currentEmissions = /* You can fetch the user's current emissions from a database or other source */ 0;

    goalDisplay.textContent = carbonGoal.toFixed(2);
    currentEmissionsDisplay.textContent = currentEmissions.toFixed(2);

    if (carbonGoal > 0) {
        const progress = ((currentEmissions / carbonGoal) * 100).toFixed(2);
        progressPercentage.textContent = `${progress}%`;
        progressBar.style.transform = `rotate(${360 - (progress * 3.6)}deg)`;
    } else {
        progressPercentage.textContent = "Goal not set";
        progressBar.style.transform = "rotate(0deg)";
    }
});
