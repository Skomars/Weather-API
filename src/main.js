// GPS coordinates
let latLocation = null;
let lonLocation = null;

// Init
init = () => {
  document.addEventListener("DOMContentLoaded", (event) => {
    getLocation();
  });
  document.getElementById("Updatebutton").addEventListener("click", (event) => {
    getLocation();
  });
};
init();

// getLocation() - Get GPS location
function getLocation() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      latLocation = JSON.parse(req.responseText)[0].lat;
      lonLocation = JSON.parse(req.responseText)[0].lon;
      setTimeout(getWeather, 100);
    }
  };
  req.open(
    "GET",
    `https://api.openweathermap.org/geo/1.0/direct?q=Halmstad&limit=1&appid=ca2bb6c3e2d74b96394c9d49924e96c9`,
    true
  );
  req.send();
}

// getWeather() - Get weatherdata
function getWeather() {
  const req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      // Convert from JSON string to a javascript object
      const resp = JSON.parse(req.responseText);

      // Temperatures in celsius
      const temp = Math.floor(resp.main.temp);
      const tempMax = Math.floor(resp.main.temp_max);
      const tempMin = Math.floor(resp.main.temp_min);

      // Get main weather data
      const weatherDescr = resp.weather[0].description;
      const weatherDescription =
        weatherDescr.charAt(0).toUpperCase() + weatherDescr.slice(1);
      const weatherIcon = String(resp.weather[0].icon);
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      // Get full location
      const location = resp.name + ", " + resp.sys.country;

      // Fetching local date and time from the Date object
      // Used for the time of update
      const date = new Date();
      const weekday = date.getDay();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const dateToday = date.getDate();
      const month = date.getMonth();

      // Formatting of minutevalues between 0-9
      let minutesFormatted;
      if (minutes == 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
        minutesFormatted = String(minutes).padStart(2, "0");
      } else {
        minutesFormatted = String(minutes);
      }

      // Formatting of hourvalues between 0-9
      let hoursFormatted;
      if (hours == 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
        hoursFormatted = String(hours).padStart(2, "0");
      } else {
        hoursFormatted = String(hours);
      }

      // Get day of the week
      const weekDays = [
        "Sunday",
        "Monday",
        "Thuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // Get month
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Applying a background class depending of the weathericon data.
      // The weathericon holds the day/night information.
      let weatherBackground;
      switch (weatherIcon) {
        case "01d":
          weatherBackground = "clear_day";
          break;

        case "01n":
          weatherBackground = "clear_night";
          break;

        case "02d":
        case "03d":
        case "04d":
          weatherBackground = "clouds_day";
          break;

        case "02n":
        case "03n":
        case "04n":
          weatherBackground = "clouds_night";
          break;

        case "09d":
        case "10d":
          weatherBackground = "rainy_day";
          break;

        case "09n":
        case "10n":
          weatherBackground = "rainy_night";
          break;

        case "11d":
        case "11n":
          weatherBackground = "thunderstorm"; // Night and day
          break;

        case "13d":
          weatherBackground = "snow_day";
          break;

        case "13n":
          weatherBackground = "snow_night";
          break;

        case "50d":
        case "50n":
          weatherBackground = "mist"; // Night and day
          break;
      }

      // Apply weatherclass
      document
        .getElementsByTagName("body")[0]
        .classList.add(`${weatherBackground}`);

      // Display the current date
      const dayFormatted = weekDays[weekday];
      const monthFormatted = months[month];
      const dateStamp = dayFormatted + ", " + dateToday + " " + monthFormatted;

      const template = document.querySelector(".template").content;
      const templateCopy = document.importNode(template, true);

      // Assign new data to template
      templateCopy.querySelector(".icon").src = iconUrl;
      templateCopy.querySelector(
        ".location"
      ).textContent = `The local weather at ${location}`;
      templateCopy.querySelector(".date").textContent = dateStamp;
      templateCopy.querySelector(".currentTemp").textContent = `${temp}°C`;
      templateCopy.querySelector(".maxTemp").textContent = `H:${tempMax}`;
      templateCopy.querySelector(".minTemp").textContent = `L:${tempMin}`;
      templateCopy.querySelector(".weatherDescription").textContent =
        weatherDescription;
      templateCopy.querySelector(
        ".lastUpdate"
      ).textContent = `(Updated: ${hoursFormatted}:${minutesFormatted})`;

      // Uppdate using template data
      const container = document.querySelector(".weather-container");
      if (container.hasChildNodes()) {
        container.textContent = "";
        console.log("Updating weather..");
      }

      container.appendChild(templateCopy);
    }
  };

  req.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latLocation}&lon=${lonLocation}&appid=ca2bb6c3e2d74b96394c9d49924e96c9&units=metric`,
    true
  );
  req.send();
}
