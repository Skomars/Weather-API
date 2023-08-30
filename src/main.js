/* Weather API key - Change this to your own */
const API_KEY = '';

/* Location to get GPS coordinates from */
let selectedLocation;
const defaultLocation = 'Halmstad'; // Initially searchvalue at start, and if searchbar is empty at buttonclick.

/* Location and coordinate variables */
let locationName, latLocation, lonLocation;

// Init
init = () => {
  // Set default location at refresh of the page.
  selectedLocation = defaultLocation;
  document.querySelector('#searchField').value = '';

  // On pageload eventlistener.
  document.addEventListener('DOMContentLoaded', (event) => {
    getLocation();
  });

  // Button eventlistener.
  document.getElementById('Updatebutton').addEventListener('click', (event) => {
    getLocation();
  });

  // Clear searchfield from placeholder text when focused.
  document
    .getElementsByTagName('input')[0]
    .addEventListener('focusin', (event) => {
      document.getElementsByTagName('input')[0].placeholder = '';
    });

  // Sets searchfield placeholder text when focus is lost.
  document
    .getElementsByTagName('input')[0]
    .addEventListener('focusout', (event) => {
      document.getElementsByTagName('input')[0].placeholder = 'Location...';
    });
};
init();

// Main getWeather() function.
function getWeather() {
  console.log(`Get weather..`);

  // Create new request object.
  const weatherRequest = new XMLHttpRequest();
  weatherRequest.onreadystatechange = function () {
    // onreadystatechange is called every time readyState changes.
    // If readyState = "request finished and response is ready" and status = "OK", the response is taken care of..
    if (weatherRequest.readyState == 4 && weatherRequest.status == 200) {
      const response = JSON.parse(weatherRequest.responseText); // JSON string -> JS object.
      console.log(response);

      // Get temperatures and use Math.floor to get rid of decimals.
      const temp = Math.floor(response.main.temp);
      const tempMax = Math.floor(response.main.temp_max);
      const tempMin = Math.floor(response.main.temp_min);

      // Get weather description and format the text.
      // (The raw description text does not have the first letter in uppercase. This fixes that)
      const weatherDescr = response.weather[0].description;
      const weatherDescription =
        weatherDescr.charAt(0).toUpperCase() + weatherDescr.slice(1);

      // Get the weathericon data and set the iconUrl.
      const weatherIcon = response.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      // Get the full location. "locationName" is fetched from getLocation function that runs before the main function.
      // Reason for that is because the name in getLocation seems more accurate in testing.
      const location = `${locationName}, ${response.sys.country}`;

      // Get current local date and time from the Date object.
      // Fetched from getCurrentDate function.
      const date = new Date();
      const currentDate = getCurrentDate(date);

      // Get timestamp of the latest update
      // Fetched from getTime function.
      const timestamp = getTime(date);

      // Select body element
      const body = document.getElementsByTagName('body')[0];
      console.log(body.classList);

      // If length of the classes on body element equals 9, that means we already have a class assigned for the background image.
      // If so, we remove it so we later can add a new one.
      if (body.classList.length === 9) {
        console.log('Removing old weatherclass..');
        body.classList.remove(body.classList[8]);
      }

      // Adding a new class for background to body element. For this, getBackgroundImage function is used.
      // Weathericon data is passed, as it holds information about both the weather and the time of day (day or night).
      console.log('Adding new weatherclass..');
      body.classList.add(`${getBackgroundImage(weatherIcon)}`);
      console.log(body.classList);

      // Get the current content from template class and copy the node.
      const template = document.querySelector('.template').content;
      const templateCopy = document.importNode(template, true);

      // Assign new data to templateCopy.
      templateCopy.querySelector('.icon').src = iconUrl;
      templateCopy.querySelector(
        '.location'
      ).textContent = `The local weather at ${location}`;
      templateCopy.querySelector('.date').textContent = currentDate;
      templateCopy.querySelector('.currentTemp').textContent = `${temp}°C`;
      templateCopy.querySelector('.maxTemp').textContent = `H:${tempMax}`;
      templateCopy.querySelector('.minTemp').textContent = `L:${tempMin}`;
      templateCopy.querySelector('.weatherDescription').textContent =
        weatherDescription;
      templateCopy.querySelector(
        '.lastUpdate'
      ).textContent = `(Last update: ${timestamp})`;

      // Get the weather-container.
      const container = document.querySelector('.weather-container');

      // If already showing weather, first clear the container from old data.
      if (container.hasChildNodes()) {
        container.textContent = '';
      }
      // Update using new data.
      container.appendChild(templateCopy);
      console.log('Updated with new data!');
    }
    // Clear old searchtext.
    document.querySelector('#searchField').value = '';
  };

  // Specify a GET request. Includes latitude, longitude and API key.
  weatherRequest.open(
    'GET',
    `https://api.openweathermap.org/data/2.5/weather?lat=${latLocation}&lon=${lonLocation}&appid=${API_KEY}&units=metric`,
    true
  );

  // Send request.
  weatherRequest.send();
}
