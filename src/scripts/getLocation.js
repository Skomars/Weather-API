// Get lat/lon coordinates from 'selectedLocation' variable.
function getLocation() {
  // User input for location
  selectedLocation = document.querySelector("#searchField").value;
  console.log(`Selected location: ${selectedLocation}`);
  console.log(`Get location..`);

  // If location isnt selected, set to default location.
  if (selectedLocation.length === 0) {
    selectedLocation = defaultLocation;
  }
  // Create new request object.
  const locationRequest = new XMLHttpRequest();
  locationRequest.onreadystatechange = function () {
    // onreadystatechange is called every time readyState changes.
    try {
      if (locationRequest.readyState == 4 && locationRequest.status == 200) {
        // If readyState = "request finished and response is ready" and status = "OK", the response is taken care of..
        locationName = JSON.parse(locationRequest.responseText)[0].name;
        latLocation = JSON.parse(locationRequest.responseText)[0].lat;
        lonLocation = JSON.parse(locationRequest.responseText)[0].lon;

        console.log(JSON.parse(locationRequest.responseText));
        // No errormessage is needed.
        document.getElementById("errorMsg").innerText = "";

        // Run getWeather function in main.js
        getWeather();
      }
    } catch (error) {
      // Display error message if no location is found for users input.
      console.log(`Error: No location was found \n ${error}`);
      document.getElementById("errorMsg").innerText =
        "The location you entered is not valid!";

      // Clear old searchtext.
      document.querySelector("#searchField").value = "";
    }
  };
  // Specify a GET request. Includes location and API key.
  locationRequest.open(
    "GET",
    `https://api.openweathermap.org/geo/1.0/direct?q=${selectedLocation}&limit=1&appid=${API_KEY}`,
    true
  );
  // Send request.
  locationRequest.send();
}
