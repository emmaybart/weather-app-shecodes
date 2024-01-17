function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionELement = document.querySelector("#current-condition");
  let date = new Date();
  let timeElement = document.querySelector("#current-time");
  let amPm = date.toLocaleTimeString([], { timeStyle: "short" });
  let dayElement = document.querySelector("#current-day");
  let icon = document.querySelector("#current-weather-icon");
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionELement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = amPm;
  dayElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} mph`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  return day;
}

function searchCity(city) {
  let apiKey = "443o50f2b2b7f52caatbcb5a0d99f0f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchInput);

searchCity("Southampton");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  forecastDay.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img src="images/broken-clouds-day.png" alt="" width="42">
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18</span> 
                  <span class="weather-forecast-temperature-min">12</span>
                </div>
              </div>
              `;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
