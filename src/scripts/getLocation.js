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
        locationName = JSON.parse(locationRequest.responseText)[0].name;
        latLocation = JSON.parse(locationRequest.responseText)[0].lat;
        lonLocation = JSON.parse(locationRequest.responseText)[0].lon;

        console.log(JSON.parse(locationRequest.responseText));
        document.getElementById("errorMsg").innerText = "";

        // Run main getWeather function with a small delay
        setTimeout(() => {
          getWeather();
        }, 0);
      }
    } catch (error) {
      // Display error message in console and front-end
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
