let now = new Date();
console.log();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
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

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let day = days[now.getDay()];
let month = months[now.getMonth()];

let currentDay = document.querySelector("#date");
currentDay.innerHTML = `${day}, ${month} ${hours}:${minutes} `;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showPreditions(response) {
  let forecast = response.data.daily;
  let preditions = document.querySelector("#forecast-preditions");

  let preditionsHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 2) {
      preditionsHTML =
        preditionsHTML +
        `
                <div class="col-3">
                    <div class="weather-preditions-date">${formatDay(
                      forecastDay.time
                    )}</div>
                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png" alt="" width="36"/>
                    <div class="weather-preditions-temperature">
                    <span class="preditions-temperature-max">${Math.round(
                      forecastDay.temperature.maximum
                    )}°</span>
                    <span class="preditions-temperature-min">${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                    </div>
                </div>
            `;
    }
  });
  preditionsHTML = preditionsHTML + `</div>`;
  preditions.innerHTML = preditionsHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityLocation = document.querySelector("#city-input");
  searchCity(cityLocation.value);
}

function showWeatherApp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
  showLocation(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherApp);
}

function showLocation(coordinates) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showPreditions);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Edinburgh");
