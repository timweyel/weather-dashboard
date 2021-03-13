let citySearchHistory = [];

let searchCityFormEl = document.querySelector("#citySearch");
let searchColEl = document.querySelector("#search-col");
let cityInputEl = document.querySelector("#city-search-input");
let searchHistoryEl = document.querySelector("#search-history");
let currentWeatherEl = document.querySelector("#currentWeather");
let fiveDayForecastContainerEl = document.querySelector("#fiveDayForecastContainer");
let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");

let api_key = '437055076a04e82223227a4c0e154c80';

let cityWeatherSearch = function(event) {
  // get value from input element
  event.preventDefault();
  
  city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    // clear old content
    cityInputEl.value = "";
  }
}

$( "#search-button" ).click(function() {
  $( "#city-search-input" ).text( city );
});

//fetch current weather for searched city
let getCityWeather = function(city) {
  let queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;  
  fetch(queryUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      console.log(data)
      $("#searchCity").text(city);
    });
  });
};

