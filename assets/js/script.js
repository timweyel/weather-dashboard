let citySearchHistory = [];

let api_key = '437055076a04e82223227a4c0e154c80';
let queryURL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

let cityInputEL = document.querySelector("#city-input");
let currentWeatherEL = document.querySelector("#currentWeather");
let forecastWeatherEL = document.querySelector("#forecastWeather");


//fetch current weather for searched city
let getCityWeather = function(city) {
  
  fetch(queryURL)
  .then(function(response) {
    response.json()
    .then(function(data) {
      displayCurrentWeather(data, city);
    });
  });
};

let displayCurrentWeather = function(weather, searchedCity) {

  //clear out any previous search result
  currentWeather.textContent = '';
  
  //date
  let currentDate = document.createElement("span");
  currentWeather.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") "; 
  cityInput.appendChild(currentDate);

  //temperature
  let temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " F";
  currentWeather.appendChild(temperatureEl);

  //humidity
  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  currentWeather.displayCurrentWeather(humidityEl);

  //wind speed
  let windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.main.speed + " MPH";
  currentWeather.displayCurrentWeather(windSpeedEl);

  //TODO: need to figure out uv index
  //uv index
}

let displayFiveDayForecast = function() {
  
}