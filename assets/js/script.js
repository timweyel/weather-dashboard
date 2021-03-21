const citySearchHistory = [];

let currentWeatherContainerEl = document.querySelector('#current-weather-container');
let currentWeatherDetailsEl = document.querySelector('#current-weather-details');

let searchInputFormEl = document.querySelector("#citySearchForm");
    searchInputFormEl.classList = "w-100";
let citySearchInputEl = document.querySelector("#city-search-input");

let searchColEl = document.querySelector('#search-col');
    searchColEl.style.backgroundColor = "#e0e0e0";

let searchHistoryEl = document.querySelector("#search-history");
    
let searchHistoryButtonsEl = document.querySelector("#past-search-buttons");

let fiveDayForecastHeader = document.querySelector("#five-day-forecast-cards");

const api_key = '437055076a04e82223227a4c0e154c80';



let searchCityWeather = function(event){
  event.preventDefault();
  let city = document.getElementById('city-search-input').value.trim();

  if(city){
      getCityWeather(city);
      getFiveDayForecast(city);
      citySearchHistory.unshift({city});
      console.log(citySearchHistory);
      citySearchInputEl.value = "";
  } else{
      alert("Please enter a City");
      return;
  }
  saveSearch();
  searchHistory(city);
}

// let checkHttps = function () {
//   if (location.protocol === 'http:') {
//     const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;
//     console.log(queryUrl);
//   } else {
//     const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;
//     console.log(queryUrl);
//   }
//   return queryUrl;
// }

// checkHttps();


//fetch current weather for searched city
const getCityWeather = function(city) {
  event.preventDefault();

 const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;  
  
  fetch(queryUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      displayCurrentWeather(data, city);
    });
  });

};

const saveSearch = function() {
  localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory));
};

const displayCurrentWeather = function(weather, city) {

  currentWeatherContainerEl.innerHTML = '';
  currentWeatherDetailsEl.innerHTML = '';

  //create searched city header
  let cityDateIconEl = document.createElement("h2");
  cityDateIconEl.textContent = `${city}`;
  currentWeatherContainerEl.append(cityDateIconEl);

  //create date element
  let currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY HH:MM:SS") + ") ";
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

  let latitude = weather.coord.lat;
  let longitude = weather.coord.lon;

  getUvIndex(latitude,longitude)
    
  getFiveDayForecast(city);
}

const getUvIndex = function(latitude, longitude) {
  // event.preventDefault();
  const queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

  fetch(queryUrl)
  .then(function(response){
      response.json()
      .then(function(data){
         displayUvIndex(data)
      });
  });
}

const displayUvIndex = function(index) {
  let uvIndexEl = document.createElement("span");
  uvIndexEl.textContent = "UV Index: ";
  uvIndexEl.classList = "list-group-item";
  currentWeatherDetailsEl.appendChild(uvIndexEl);

  uvIndexShading = document.createElement("span");
  uvIndexShading.textContent = index.value;

  if (index.value <= 2.9) {
    uvIndexShading.classList = "favorable";    
  } else if (index.value >= 3 && index.value <= 7.9) {
    uvIndexShading.classList = "moderate";
  } else if (index.value >= 8) {
    uvIndexShading.classList = "severe";
  }

  uvIndexEl.appendChild(uvIndexShading);

}

const getFiveDayForecast = function(city){  
  // event.preventDefault();
  const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${api_key}`;

  fetch(queryUrl)
  .then(function(response){
      response.json()
      .then(function(data){
      displayFiveDayForecast(data);
      });
  });
};

const displayFiveDayForecast = function(weather) {
  let fiveDayForecastContainerEl = document.querySelector("#five-day-forecast-container");
    fiveDayForecastContainerEl.textContent = '';
  
    fiveDayForecastHeader.classList = "col-12 h2";
    fiveDayForecastHeader.textContent = "5-Day Forecast";
    fiveDayForecastContainerEl.appendChild(fiveDayForecastHeader);

  let fiveDayForecastCardGroup = document.createElement("div");
    fiveDayForecastCardGroup.classList = "card-group";
    fiveDayForecastContainerEl.appendChild(fiveDayForecastCardGroup);

  let fiveDayForecast = weather.list;
    for (let i=7; i<fiveDayForecast.length; i+=8) {
      let daily = fiveDayForecast[i];

      let fiveDayForecastCards = document.querySelector("#five-day-forecast-cards");
      fiveDayForecastCards = document.createElement("div");
      fiveDayForecastCards.classList = "card card-width text-center bg-secondary text-white";
      fiveDayForecastCardGroup.appendChild(fiveDayForecastCards);      
      
      let fiveDayForecastDate = document.createElement("h4");
      fiveDayForecastDate.classList = "card-header text-white bg-secondary";
      fiveDayForecastDate.textContent = moment.unix(daily.dt).format("MMM D, YYYY HH:MM:SS");
      fiveDayForecastCards.appendChild(fiveDayForecastDate);

      let fiveDayForecastIcon = document.createElement("img");
      fiveDayForecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`);  
      fiveDayForecastIcon.classList = "card-body";
      fiveDayForecastIcon.setAttribute("width", '100px');  
      fiveDayForecastCards.appendChild(fiveDayForecastIcon);
    
      let fiveDayForecastTemp = document.createElement("span");
      fiveDayForecastTemp.classList = "card-body";
      fiveDayForecastTemp.textContent = daily.main.temp + " °F";
      fiveDayForecastCards.appendChild(fiveDayForecastTemp);
    
      let fiveDayForecastHumidity=document.createElement("span");
      fiveDayForecastHumidity.classList = "card-body";
      fiveDayForecastHumidity.textContent = daily.main.humidity + "  %";
      fiveDayForecastCards.appendChild(fiveDayForecastHumidity);

    }
  
}

const searchHistory = function(historicSearch) {

  searchHistoryButtons = document.createElement("button");
  searchHistoryButtons.textContent = historicSearch;
  searchHistoryButtons.classList = "w-100 rounded bg-secondary text-white p-2 mt-2";
  searchHistoryButtons.setAttribute('city-searched', historicSearch);
  searchHistoryButtons.setAttribute('type', 'click');
  searchHistoryEl.prepend(searchHistoryButtons);
};

const searchHistoryLookup = function(e) {
  let citySearched = e.target.getAttribute('city-searched');
  if (citySearched) {
    getCityWeather(citySearched);
    getFiveDayForecast(citySearched);
  }
}

const removeEl = (element) => {
	element.innerHTML = '';
};

searchInputFormEl.addEventListener('submit', searchCityWeather);
searchHistoryEl.addEventListener('click', searchHistoryLookup);
