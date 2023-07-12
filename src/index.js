function formatDate(date) {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[currentDate.getDay()];

  let currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinute = currentDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let formattedDate = `${currentDay} ${currentHours}:${currentMinute}`;

  let time = document.querySelector("#date");
  time.innerHTML = `${formattedDate}`;
}

formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42"/>
      <div class = "weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> ${Math.round(
        (forecastDay.temp.max - 273.15) * 1.8 + 32
      )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          (forecastDay.temp.min - 273.15) * 1.8 + 32
        )}° </span>
          </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `2a2eaa51d996796495bf456e5b58adf4`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    `#humidity`
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/h`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;

  celciusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `981803b3c6c0474c87784aa6cb2be104`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  searchCity(city);
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("New York");
