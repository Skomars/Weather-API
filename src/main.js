/* Weather API key (Set this to hidden before production)*/
const API_KEY = "ca2bb6c3e2d74b96394c9d49924e96c9";

/* Location to get GPS coordinates from */
let selectedLocation;
let defaultLocation = "halmstad";

/* Coordinate variables */
let latLocation, lonLocation;

// Init
init = () => {
  // Set default location at refresh of the page
  selectedLocation = defaultLocation;
  document.querySelector("#searchField").value = "";

  document.addEventListener("DOMContentLoaded", (event) => {
    getLocation();
  });
  document.getElementById("Updatebutton").addEventListener("click", (event) => {
    getLocation();
  });

  document
    .getElementsByTagName("input")[0]
    .addEventListener("focusin", (event) => {
      document.getElementsByTagName("input")[0].placeholder = "";
    });

  document
    .getElementsByTagName("input")[0]
    .addEventListener("focusout", (event) => {
      document.getElementsByTagName("input")[0].placeholder = "Location...";
    });
};
init();

// Get lat/lon coordinates from 'selectedLocation' variable
async function getLocation() {
  selectedLocation = document.querySelector("#searchField").value;

  console.log(selectedLocation);

  if (selectedLocation.length === 0) {
    selectedLocation = defaultLocation;
  }

  const locationRequest = new XMLHttpRequest();
  locationRequest.onreadystatechange = function () {
    try {
      if (locationRequest.readyState == 4 && locationRequest.status == 200) {
        latLocation = JSON.parse(locationRequest.responseText)[0].lat;
        lonLocation = JSON.parse(locationRequest.responseText)[0].lon;

        document.getElementById("errorMsg").innerText = "";

        // Run main getWeather function
        setTimeout(() => {
          getWeather();
        }, 10);
      }
    } catch (error) {
      console.log(`Error: No location was found \n ${error}`);
      document.getElementById("errorMsg").innerText =
        "The location you entered is not valid!";
    }
  };
  locationRequest.open(
    "GET",
    `https://api.openweathermap.org/geo/1.0/direct?q=${selectedLocation}&limit=1&appid=${API_KEY}`,
    true
  );

  locationRequest.send();
}

// Main function
function getWeather() {
  const weatherRequest = new XMLHttpRequest();
  weatherRequest.onreadystatechange = function () {
    if (weatherRequest.readyState == 4 && weatherRequest.status == 200) {
      const response = JSON.parse(weatherRequest.responseText); // JSON string -> JS object
      console.log(response);

      // Temperatures in celsius
      const temp = Math.floor(response.main.temp);
      const tempMax = Math.floor(response.main.temp_max);
      const tempMin = Math.floor(response.main.temp_min);

      // Get main weather data
      const weatherDescr = response.weather[0].description;

      // In the response, the 'description' value shows more information than the 'main' value.
      // But the first letter in the 'description' value is in lowercase.
      // This statement makes the description to have the first letter in uppercase
      const weatherDescription =
        weatherDescr.charAt(0).toUpperCase() + weatherDescr.slice(1);

      // Get the weathericon data and set the iconUrl
      const weatherIcon = response.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      // Get full location
      const location = response.name + ", " + response.sys.country;

      // Fetch local date and time from the Date object
      const date = new Date();

      // Get current date
      const currentDate = getCurrentDate(date);

      // Get timestamp of the latest update
      const timestamp = getTime(date);

      // Remove old background image and add a new one to body
      const body = document.getElementsByTagName("body")[0];
      console.log(body.classList);
      console.log(body.classList.length);

      if (body.classList.length === 9) {
        console.log("Removing old weatherclass..");
        body.classList.remove(body.classList[8]);
      }

      console.log("Adding new weatherclass..");
      body.classList.add(`${getBackgroundImage(weatherIcon)}`);
      console.log(body.classList);
      console.log(body.classList.length);

      const template = document.querySelector(".template").content;
      const templateCopy = document.importNode(template, true);

      // Assign new data to template
      templateCopy.querySelector(".icon").src = iconUrl;
      templateCopy.querySelector(
        ".location"
      ).textContent = `The local weather at ${location}`;
      templateCopy.querySelector(".date").textContent = currentDate;
      templateCopy.querySelector(".currentTemp").textContent = `${temp}°C`;
      templateCopy.querySelector(".maxTemp").textContent = `H:${tempMax}`;
      templateCopy.querySelector(".minTemp").textContent = `L:${tempMin}`;
      templateCopy.querySelector(".weatherDescription").textContent =
        weatherDescription;
      templateCopy.querySelector(
        ".lastUpdate"
      ).textContent = `(Last update: ${timestamp})`;

      const container = document.querySelector(".weather-container");

      // If already showing weather, first clear the container from old data
      if (container.hasChildNodes()) {
        console.log("Remove old data..");
        container.textContent = "";
      }
      // Append and update data
      container.appendChild(templateCopy);
      console.log("Updated with new data!");
    }
    // Clearing searchfield
    document.querySelector("#searchField").value = "";
  };

  weatherRequest.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latLocation}&lon=${lonLocation}&appid=${API_KEY}&units=metric`,
    true
  );
  weatherRequest.send();
}
