function showWeatherApp(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherApp);
}
searchCity("Edinburgh");

function showLocation(coordinates) {
  let apiKey = "o36b6dafeb6ef56f34fa0t0eceebce4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}=${apiKey}&units=metric`;
  console.log(apiUrl);
}
