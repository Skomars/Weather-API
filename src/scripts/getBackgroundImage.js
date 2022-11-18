// Returns a string used for setting a backgroundclass in getWeather function in main.js.
getBackgroundImage = (weatherIcon) => {
  let weatherBackground;
  switch (weatherIcon) {
    case "01d":
      weatherBackground = "weatherBg_clear_day";
      break;

    case "01n":
      weatherBackground = "weatherBg_clear_night";
      break;

    case "02d":
    case "03d":
    case "04d":
      weatherBackground = "weatherBg_clouds_day";
      break;

    case "02n":
    case "03n":
    case "04n":
      weatherBackground = "weatherBg_clouds_night";
      break;

    case "09d":
    case "10d":
      weatherBackground = "weatherBg_rainy_day";
      break;

    case "09n":
    case "10n":
      weatherBackground = "weatherBg_rainy_night";
      break;

    case "11d":
    case "11n":
      weatherBackground = "weatherBg_thunderstorm"; // Night and day combined
      break;

    case "13d":
    case "13n":
      weatherBackground = "weatherBg_snow"; // Night and day combined
      break;

    case "50d":
    case "50n":
      weatherBackground = "weatherBg_mist"; // Night and day combined
      break;

    // No weathericon found
    // In theory we will never get to the default case. An unvalid location will be stopped in getLocation function.
    default:
      break;
  }

  return weatherBackground;
};
