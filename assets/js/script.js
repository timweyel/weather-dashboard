let citySearchHistory = [];

let searchCityFormEl = document.querySelector("#citySearchForm");
let searchColEl = document.querySelector("#search-col");

let searchButton = document.querySelector("#search-button");
let cityInputEl = document.querySelector("#city-search-input");
let searchHistoryEl = document.querySelector("#search-history");

let fiveDayForecastContainerEl = document.querySelector("#fiveDayForecastContainer");
let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");


let api_key = '437055076a04e82223227a4c0e154c80';

//fetch current weather for searched city
let getCityWeather = function() {
  event.preventDefault();
  const city = document.querySelector("#city-search-input").value;
  //console.log('city before fetch', city);
  
  let queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;  
  
  fetch(queryUrl)
  .then(function(response) {
    return response.json()
    .then(function(data) {
      console.log(data)

      //console.log('city after fetch', city);
      let searchCity = document.querySelector("#searchCity");
      searchCity.append(city);

      let todaysDateEl = document.querySelector("#todaysDate");
      todaysDateEl.textContent=moment(data.dt.value).format("MMM D, YYYY");
      currentWeatherContainerEl.append(todaysDateEl);

      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
      currentWeatherContainerEl.append(weatherIcon);



    });
  });

};


