let citySearchHistory = [];

let searchColEl = document.querySelector("#search-col");
let cityInputEl = document.querySelector("#city-search-input");
let searchHistoryEl = document.querySelector("#search-history");
let currentWeatherEl = document.querySelector("#currentWeather");
let fiveDayForecastContainerEl = document.querySelector("#fiveDayForecastContainer");
let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");

let api_key = '437055076a04e82223227a4c0e154c80';
let city = 'san francisco';
let queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

let cityWeatherSearch = function(event) {
  //event.preventDefault();
  let city = event.target.getAttribute("city-search-input");
  if (city) {
    getCityWeather(city);
    citySearchHistory.unshift({city});
    cityInputEl.value = "";
  }
}

//fetch current weather for searched city
let getCityWeather = function(city) {
  
  fetch(queryUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      console.log(data)
      //displayCurrentWeather(data, city);
    });
  });
};



