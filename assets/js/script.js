// $(document).ready(function(event) {

let citySearchHistory = [];

let searchInputEl = document.querySelector("#city-search-input");

let currentWeatherContainerEl = document.querySelector('#current-weather-container');

let searchInputFormEl = document.querySelector("#citySearchForm");
let searchColEl = document.querySelector("#search-col");

let searchButton = document.querySelector("#search-button");
let searchHistoryEl = document.querySelector("#search-history");

let fiveDayForecastContainerEl = document.querySelector("#fiveDayForecastContainer");
let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");


let api_key = '437055076a04e82223227a4c0e154c80';

//fetch current weather for searched city
let getCityWeather = function() {
  event.preventDefault();
  const city = document.querySelector("#city-search-input").value;
  //console.log('city before fetch', city);
  
  let queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;  
  
  fetch(queryUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      console.log(data);
      displayWeather(data, city);
      
    });

  });
  //console.log(city);
};

let displayWeather = function(weather, city) {
// console.log(city);
  currentWeatherContainerEl.textContent = '';
  currentWeatherContainerEl.append(city);

  // let searchInput = document.querySelector("#searchInput");
  // searchInput.appendChild(city);

  var currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  currentWeatherContainerEl.appendChild(currentDate);

  //create an image element
  var weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  currentWeatherContainerEl.appendChild(weatherIcon);

  //create a span element to hold temperature data
  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  currentWeatherContainerEl.appendChild(temperatureEl);
  temperatureEl.classList = "list-group-item";
  
  //create a span element to hold Humidity data
  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  currentWeatherContainerEl.appendChild(humidityEl);
  humidityEl.classList = "list-group-item";

  //create a span element to hold Wind data
  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  currentWeatherContainerEl.appendChild(windSpeedEl);
  windSpeedEl.classList = "list-group-item";
    
  getFiveDayForecast(city);
}

// });

let getFiveDayForecast = function(city){
  let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${api_key}`;

  fetch(queryUrl)
  .then(function(response){
      response.json().
      then(function(data){
        console.log(data)

      });
  });
};


