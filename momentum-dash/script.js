// The name shown in the greeting.
// Placeholder for now: in a later step the extension will ask for the name
// and save it in chrome.storage, so no personal data ends up in the repository.
const userName = "friend";

// Shows the current time (hours:minutes) in the #clock element.
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = hours + ":" + minutes;
}

// Chooses "Good morning / afternoon / evening" based on the hour.
function updateGreeting() {
  const hour = new Date().getHours();
  let partOfDay;

  if (hour >= 5 && hour < 12) {
    partOfDay = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    partOfDay = "Good afternoon";
  } else {
    partOfDay = "Good evening";
  }

  document.getElementById("greeting").textContent = partOfDay + ", " + userName + ".";
}

// Run once immediately, so the page is never empty...
updateClock();
updateGreeting();

// ...then refresh every second, so the clock and greeting stay up to date.
setInterval(function () {
  updateClock();
  updateGreeting();
}, 1000);
