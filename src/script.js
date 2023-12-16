//display date and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
//search bar
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  if (searchInput.value) {
    cityElement.innerHTML = `${searchInput.value}`;
  } else {
    cityElement.innerHTML = null;
    alert("Please search for a city!🗺");
  }
  let apiKey = "443o50f2b2b7f52caatbcb5a0d99f0f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", search);
// current temperature

function displayTemp(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;
}
