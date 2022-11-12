// Returns a string used for setting a backgroundclass in main function
getBackgroundImage = (weatherIcon) => {
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
      weatherBackground = "thunderstorm"; // Night and day combined
      break;

    case "13d":
      weatherBackground = "snow_day";
      break;

    case "13n":
      weatherBackground = "snow_night";
      break;

    case "50d":
    case "50n":
      weatherBackground = "mist"; // Night and day combined
      break;
  }

  return weatherBackground;
};
