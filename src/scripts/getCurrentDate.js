// Returns a formatted string showing the current date
getCurrentDate = (dateObject) => {
  const weekday = dateObject.getDay();
  const dateToday = dateObject.getDate();
  const month = dateObject.getMonth();

  const weekDays = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const weekdayFormatted = weekDays[weekday];
  const monthFormatted = months[month];

  return `${weekdayFormatted}, ${dateToday} ${monthFormatted}`;
};
