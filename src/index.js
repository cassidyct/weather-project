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
  )} km/h`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = `981803b3c6c0474c87784aa6cb2be104`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `981803b3c6c0474c87784aa6cb2be104`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");