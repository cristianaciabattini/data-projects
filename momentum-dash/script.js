// The name shown in the greeting. It starts empty and is loaded from
// chrome.storage.local, so the name is saved on this computer only
// and never written in the code (no personal data in the repository).
let userName = "";

// Shortcuts to the page elements we use.
const greetingEl = document.getElementById("greeting");
const nameBox = document.getElementById("name-box");
const nameInput = document.getElementById("name-input");

// Shows the current time (hours:minutes) in the #clock element.
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = hours + ":" + minutes;
}

// Chooses "Good morning / afternoon / evening" based on the hour.
function updateGreeting() {
  if (userName === "") {
    return; // no name yet: nothing to greet
  }

  const hour = new Date().getHours();
  let partOfDay;

  if (hour >= 5 && hour < 12) {
    partOfDay = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    partOfDay = "Good afternoon";
  } else {
    partOfDay = "Good evening";
  }

  greetingEl.textContent = partOfDay + ", " + userName + ".";
}

// Hides the input box and shows the greeting.
function showGreeting() {
  nameBox.hidden = true;
  greetingEl.hidden = false;
  updateGreeting();
}

// Hides the greeting and shows the input box (first time, or to change the name).
function showNameInput() {
  greetingEl.hidden = true;
  nameBox.hidden = false;
  nameInput.value = userName;
  nameInput.focus();
}

// When the user presses Enter in the input box, save the name.
nameInput.addEventListener("keydown", function (event) {
  if (event.key !== "Enter") {
    return;
  }

  const typedName = nameInput.value.trim(); // trim() removes extra spaces
  if (typedName === "") {
    return; // ignore an empty name
  }

  userName = typedName;
  chrome.storage.local.set({ userName: userName }); // save it on this computer
  showGreeting();
});

// Double-click the greeting to change the name.
greetingEl.addEventListener("dblclick", showNameInput);

// When the page opens: read the saved name (if any) from storage.
chrome.storage.local.get(["userName"], function (result) {
  if (result.userName) {
    userName = result.userName;
    showGreeting();
  } else {
    showNameInput();
  }
});

// Start the clock immediately, then refresh clock and greeting every second.
updateClock();
setInterval(function () {
  updateClock();
  updateGreeting();
}, 1000);
