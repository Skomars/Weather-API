// Returns a formatted timestamp for the last update
getTime = (dateObject) => {
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  let minutesFormatted;
  let hoursFormatted;

  // Formatting of minutevalues between 0 -> 9
  if (minutes == 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
    minutesFormatted = String(minutes).padStart(2, "0");
  } else {
    minutesFormatted = String(minutes);
  }

  // Formatting of hourvalues between 0 -> 9
  if (hours == 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
    hoursFormatted = String(hours).padStart(2, "0");
  } else {
    hoursFormatted = String(hours);
  }

  return `${hoursFormatted}:${minutesFormatted}`;
};
