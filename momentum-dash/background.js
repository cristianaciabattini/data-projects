// Background photo: my own photos of Lisbon, stored in the "images" folder.
// The photo changes every hour, cycling through the list.
const photos = [
  "images/lisbon-1.jpg",
  "images/lisbon-2.jpg",
  "images/lisbon-3.jpg",
  "images/lisbon-4.jpg",
  "images/lisbon-5.jpg",
  "images/lisbon-6.jpg"
];

let currentPhoto = "";

// Chooses the photo for the current hour and shows it as the page background.
function updateBackground() {
  const hour = new Date().getHours();      // 0 to 23
  const index = hour % photos.length;      // remainder of the division: 0 to 5
  const photo = photos[index];

  if (photo === currentPhoto) {
    return; // same hour, same photo: nothing to change
  }
  currentPhoto = photo;

  // A transparent dark layer on top of the photo, so the white text stays readable.
  document.body.style.backgroundImage =
    "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('" + photo + "')";
}

// Show the right photo immediately, then check once a minute
// (so the photo also changes if the tab stays open across an hour).
updateBackground();

setInterval(updateBackground, 60 * 1000);