const citySearchHistory = [];

// let searchInputEl = document.querySelector("#city-search-input");

let currentWeatherContainerEl = document.querySelector('#current-weather-container');
let currentWeatherDetailsEl = document.querySelector('#current-weather-details');
let cityDateIconEl = document.querySelector('#city-search-icon');

let searchInputFormEl = document.querySelector("#citySearchForm");
let searchColEl = document.querySelector("#search-col");

let searchButton = document.querySelector("#search-button");
let searchHistoryEl = document.querySelector("#search-history");

let fiveDayForecastHeader = document.querySelector("#five-day-forecast-cards");


//let fiveDayForecastCardsContainerEl = document.querySelector("#fiveDayForecastCardsContainer");
// fiveDayForecastContainerEl.appendChild(fiveDayForecastCardsContainerEl);


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
  cityDateIconEl = document.createElement("h2");
  cityDateIconEl.textContent = `${city}`;

  currentWeatherContainerEl.append(cityDateIconEl);


  let currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  cityDateIconEl.appendChild(currentDate);

  //create an image element
  let weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  cityDateIconEl.appendChild(weatherIcon);

  //create a span element to hold temperature data
  let temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  currentWeatherDetailsEl.appendChild(temperatureEl);
  temperatureEl.classList = "list-group-item";
  
  //create a span element to hold Humidity data
  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  currentWeatherDetailsEl.appendChild(humidityEl);
  humidityEl.classList = "list-group-item";

  //create a span element to hold Wind data
  let windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  currentWeatherDetailsEl.appendChild(windSpeedEl);
  windSpeedEl.classList = "list-group-item";

  let uvIndexEl = document.createElement("span");
  humidityEl.textContent = "UV Index goes here";
  currentWeatherDetailsEl.appendChild(uvIndexEl);
    
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
  let fiveDayForecastContainerEl = document.querySelector("#five-day-forecast-container");
    fiveDayForecastContainerEl.textContent = '';
  
  // let fiveDayForecastHeaderEl = document.createElement("div");
  // fiveDayForecastContainerEl.appendChild(fiveDayForecastHeaderEl);
  
  
    fiveDayForecastHeader.classList = "col-12 h2";
    fiveDayForecastHeader.textContent = "5-Day Forecast";
    fiveDayForecastContainerEl.appendChild(fiveDayForecastHeader);

  let fiveDayForecastCardGroup = document.createElement("div");
    fiveDayForecastCardGroup.classList = "card-group";
    fiveDayForecastContainerEl.appendChild(fiveDayForecastCardGroup);

  let fiveDayForecast = weather.list;
    for (let i=5; i<fiveDayForecast.length; i+=8) {
      let daily = fiveDayForecast[i];
      console.log(daily); 

      let fiveDayForecastCards = document.querySelector("#five-day-forecast-cards");
      fiveDayForecastCards = document.createElement("div");
      fiveDayForecastCards.classList = "card";
      fiveDayForecastCardGroup.appendChild(fiveDayForecastCards);      
      
      let fiveDayForecastDate = document.createElement("h4");
      fiveDayForecastDate.classList = "card-header";
      fiveDayForecastDate.textContent = moment.unix(daily.dt).format("MMM D, YYYY");

      fiveDayForecastCards.appendChild(fiveDayForecastDate);

      let fiveDayForecastIcon = document.createElement("img");
      fiveDayForecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`);  
      fiveDayForecastIcon.classList = "card-body text-center ";
      fiveDayForecastIcon.setAttribute("width", '100px');  
      fiveDayForecastCards.appendChild(fiveDayForecastIcon);
    
      let fiveDayForecastTemp = document.createElement("span");
      fiveDayForecastTemp.classList = "card-body text-center";
      fiveDayForecastTemp.textContent = daily.main.temp + " °F";
      fiveDayForecastCards.appendChild(fiveDayForecastTemp);
    
      let fiveDayForecastHumidity=document.createElement("span");
      fiveDayForecastHumidity.classList = "card-body text-center";
      fiveDayForecastHumidity.textContent = daily.main.humidity + "  %";
      fiveDayForecastCards.appendChild(fiveDayForecastHumidity);

      let fiveDayForecastUvIndex = document.createElement("span");
      fiveDayForecastUvIndex.classList = "card-body text-center";
      fiveDayForecastUvIndex.textContent = 'UV Index here';
      fiveDayForecastCards.appendChild(fiveDayForecastUvIndex);
    }
};
