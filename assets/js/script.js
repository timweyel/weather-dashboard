const citySearchHistory = [];

// let searchInputEl = document.querySelector("#city-search-input");

let currentWeatherContainerEl = document.querySelector('#current-weather-container');

let searchInputFormEl = document.querySelector("#citySearchForm");
let searchColEl = document.querySelector("#search-col");

let searchButton = document.querySelector("#search-button");
let searchHistoryEl = document.querySelector("#search-history");

let fiveDayForecastContainerEl = document.querySelector("#fiveDayForecastContainer");
let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");


const api_key = '437055076a04e82223227a4c0e154c80';

//fetch current weather for searched city
const getCityWeather = function() {
  event.preventDefault();
  const city = document.querySelector("#city-search-input").value;
  
  const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;  
  
  fetch(queryUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      console.log(data);
      displayCurrentWeather(data, city);
    });
  });
  //console.log(city);
};

const displayCurrentWeather = function(weather, city) {
// console.log(city);
  currentWeatherContainerEl.textContent = '';
  currentWeatherContainerEl.append(city);

  // let searchInput = document.querySelector("#searchInput");
  // searchInput.appendChild(city);

  let currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  currentWeatherContainerEl.appendChild(currentDate);

  //create an image element
  let weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  currentWeatherContainerEl.appendChild(weatherIcon);

  //create a span element to hold temperature data
  let temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  currentWeatherContainerEl.appendChild(temperatureEl);
  temperatureEl.classList = "list-group-item";
  
  //create a span element to hold Humidity data
  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  currentWeatherContainerEl.appendChild(humidityEl);
  humidityEl.classList = "list-group-item";

  //create a span element to hold Wind data
  let windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  currentWeatherContainerEl.appendChild(windSpeedEl);
  windSpeedEl.classList = "list-group-item";
    
  getFiveDayForecast(city);
}

const getFiveDayForecast = function(city){
  const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${api_key}`;

  fetch(queryUrl)
  .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      displayFiveDayForecast(data);
      });
  });
};

const displayFiveDayForecast = function(weather) {

  //fiveDayForecastContainerEl.textContent = '';
  let fiveDayForecastHeader = document.createElement("h1");
  fiveDayForecastHeader.textContent = "5-Day Forecast";
  fiveDayForecastContainerEl.appendChild(fiveDayForecastHeader);
  
  let fiveDayForecast = weather.list;
    for (let i=5; i<fiveDayForecast.length; i+=8) {
      let daily = fiveDayForecast[i];
      console.log(daily); 
    

  let fiveDayForecastCards = document.createElement("div");
  fiveDayForecastCards.classList = "card";
  fiveDayForecastContainerEl.appendChild(fiveDayForecastCards);

  let fiveDayForecastDate = document.createElement("h4");
  fiveDayForecastDate.textContent = moment.unix(daily.dt).format("MMM D, YYYY");
  fiveDayForecastDate.classList = "card-header";
  fiveDayForecastCards.appendChild(fiveDayForecastDate);

  let fiveDayForecastIcon = document.createElement("img");
  fiveDayForecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`);  
  fiveDayForecastIcon.classList = "card-body text-center";
  fiveDayForecastCards.appendChild(fiveDayForecastIcon);

  let fiveDayForecastTemp = document.createElement("span");
  fiveDayForecastTemp.classList = "card-body text-center";
  fiveDayForecastTemp.textContent = daily.main.temp + " °F";
  fiveDayForecastCards.appendChild(fiveDayForecastTemp);


}
};
