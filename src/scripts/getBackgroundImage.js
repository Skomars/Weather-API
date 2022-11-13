// Returns a string used for setting a backgroundclass in main function
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
      weatherBackground = "weatherBg_snow_day";
      break;

    case "13n":
      weatherBackground = "weatherBg_snow_night";
      break;

    case "50d":
    case "50n":
      weatherBackground = "weatherBg_mist"; // Night and day combined
      break;

    default: // No location found
      weatherBackground = "weatherBg_not_found";
      break;
  }

  return weatherBackground;
};
