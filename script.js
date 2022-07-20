let now = new Date();
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let hour = addZero(now.getHours());
let minute = addZero(now.getMinutes());
let day = now.getDay();
let date = addZero(now.getDate());
let year = now.getFullYear();
let month = now.getMonth();
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
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];
month = months[now.getMonth()];

let currentData = document.querySelector("#current-data");
currentData.innerHTML = `${date} ${month} ${year}`;

let currentTime = document.querySelector("#current-day-time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

let cityDefault = "Kyiv";
let apiKey = "481bc9bf97ae403a7ee70a4848c33bb8";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
axios.get(`${apiUrl}q=${cityDefault}&appid=${apiKey}&units=metric`).then(showCurrTemp);

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  if (city.value) {
    axios.get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=metric`).then(showCurrTemp);
  } else {
    alert(` Please enter a city`);
  }
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", inputCity);

function handlePosition(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert = "Please share your Geolocation";
  }
}
function showPosition(position) {
  let latCur = position.coords.latitude;
  console.log(latCur);
  let longCur = position.coords.longitude;
  console.log(longCur);
  axios
    .get(`${apiUrl}lat=${latCur}&lon=${longCur}&appid=${apiKey}&units=metric`)
    .then(showCurrTemp);
}

let currentLocation = document.querySelector("button.btn-current");
currentLocation.addEventListener("click", handlePosition);

function showCurrTemp(response) {
  let tempCur = document.querySelector(".current-temp");
  tempCur.innerHTML = `🌡️ ${Math.round(response.data.main.temp)}°<br /><span class="realFeel">feels like ${Math.round(response.data.main.feels_like)}°</span>`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let country = document.querySelector("#current-country.main-small");
  country.innerHTML = response.data.sys.country;

  let iconElement = document.querySelector("#icon");
  let mark = response.data.weather[0].icon
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${mark}@2x.png`);

  let currCondition = document.querySelector("#current-condition");
  currCondition.innerHTML = response.data.weather[0].description;

  let currentHumid = document.querySelector("#cur-humid");
  currentHumid.innerHTML = `humidity ${response.data.main.humidity}%`

  let currentWind = document.querySelector("#cur-wind");
  currentWind.innerHTML = `wind ${Math.round(response.data.wind.speed)} m/s`;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiUrlF = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrlF).then(showForecastTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dateDay = date.getDate();
  let month = (date.getMonth() + 1);
  if (dateDay < 10) {
    dateDay = `0${dateDay}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${dateDay}.${month}<br /><span class="forecast-day">${days[day]}</span>`;
}

function showForecastTemp(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 & index < 6) {
      forecastHTML = forecastHTML +
        `<div class="column">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="">
            <div class="weather-forecast-temperature">
              <span class="weather-temperature-forecast-min">${Math.round(forecastDay.temp.min)}°</span> 
              <span class="weather-temperature-forecast-max">${Math.round(forecastDay.temp.max)}°</span>
            </div>
         </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getFarenheit(event) {
  event.preventDefault();
  classListFarenheihActive();
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let city = document.querySelector("#city-input");
  if (city.value) {
    axios.get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=imperial`).then(showCurrTempF);
  } else {
    axios.get(`${apiUrl}q=${cityDefault}&appid=${apiKey}&units=imperial`).then(showCurrTempF);
  }
}

let convertF = document.querySelector("#farenheit");
convertF.addEventListener("click", getFarenheit);

function showCurrTempF(response) {
  let tempCur = document.querySelector(".current-temp");
  tempCur.innerHTML = `🌡️ ${Math.round(response.data.main.temp)}°<br /><span class="realFeel">feels like ${Math.round(response.data.main.feels_like)}°</span>`;

  let currentWind = document.querySelector("#cur-wind");
  currentWind.innerHTML = `wind ${Math.round(response.data.wind.speed)} mi/h`;
  getForecastF(response.data.coord);
}

function getForecastF(coordinates) {
  let apiUrlF = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
  axios.get(apiUrlF).then(showForecastTemp);
}

function classListCelsiusActive() {
  convertF.classList.remove("active");
  convertF.classList.add("passive");
  convertC.classList.remove("passive");
  convertC.classList.add("active");
}

function classListFarenheihActive() {
  convertC.classList.remove("active");
  convertC.classList.add("passive");
  convertF.classList.remove("passive");
  convertF.classList.add("active");
}

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", getCelsius);

function getCelsius(event) {
  event.preventDefault();
  classListCelsiusActive();
  let city = document.querySelector("#city-input");
  if (city.value) {
    axios.get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=metric`).then(showCurrTemp);
  } else {
    axios.get(`${apiUrl}q=${cityDefault}&appid=${apiKey}&units=metric`).then(showCurrTemp);
  }
}

let listCities = document.querySelectorAll('li');
let cityinputList = document.querySelector('#city-input');
listCities.forEach(function (listCity) {
  listCity.addEventListener("click", (event) => {
    let displayCity = event.target.textContent;
    cityinputList.setAttribute("value", `${displayCity}`);
    classListCelsiusActive();
    axios.get(`${apiUrl}q=${cityinputList.value}&appid=${apiKey}&units=metric`).then(showCurrTemp);
  });
});