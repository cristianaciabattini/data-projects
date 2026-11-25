// Weather from Open-Meteo (free, no API key needed).
// Shows an icon, the temperature and the place in the top-right corner.

const LISBON = { name: "Lisbon", latitude: 38.72, longitude: -9.14 };

// Turns the Open-Meteo weather code into an emoji icon.
function weatherIcon(code) {
  if (code === 0) return "☀️";                 // clear sky
  if (code === 1 || code === 2) return "🌤️";   // mainly clear, partly cloudy
  if (code === 3) return "☁️";                 // overcast
  if (code === 45 || code === 48) return "🌫️"; // fog
  if (code >= 51 && code <= 57) return "🌦️";   // drizzle
  if (code >= 61 && code <= 67) return "🌧️";   // rain
  if (code >= 71 && code <= 77) return "❄️";   // snow
  if (code >= 80 && code <= 82) return "🌦️";   // rain showers
  if (code >= 85 && code <= 86) return "🌨️";   // snow showers
  if (code >= 95) return "⛈️";                 // thunderstorm
  return "🌡️";                                 // anything else
}

// Asks Open-Meteo for the current weather at a place and shows it.
function showWeather(place) {
  const url = "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + place.latitude +
    "&longitude=" + place.longitude +
    "&current=temperature_2m,weather_code" +
    "&timezone=auto";

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Weather request failed");

      }
      return response.json(); // turn the answer into a JavaScript object
    })
    .then(function (data) {
      document.getElementById("weather-icon").textContent = weatherIcon(data.current.weather_code);
      document.getElementById("weather-temp").textContent = Math.round(data.current.temperature_2m) + "°C";
      document.getElementById("weather-place").textContent = place.name;
      document.getElementById("weather").hidden = false;
    })
    .catch(function () {
      // No internet or service unavailable: keep the weather hidden.
      document.getElementById("weather").hidden = true;
    });
}

// Decides which place to use and loads its weather.
function loadWeather() {
  showWeather(LISBON);
}

// Load now, then refresh every 30 minutes.
loadWeather();
setInterval(loadWeather, 30 * 60 * 1000);
