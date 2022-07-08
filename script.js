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

let city = document.querySelector("#city-input");
let apiKey = "481bc9bf97ae403a7ee70a4848c33bb8";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";


function inputCity(event) {
  event.preventDefault();
  if (city.value) {
    let countryInput = prompt("Please enter the country name");
    axios.get(`${apiUrl}q=${city.value},${countryInput.value}&appid=${apiKey}&units=metric`).then(showCurrTemp);
  } else {
    alert(` Please enter a city`);
  }
}


function showCurrTemp(response) {
  console.log(response.data);
  let tempCur = document.querySelector("#current-temp");
  tempCur.innerHTML = `${Math.round(response.data.main.temp)} °C`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let country = document.querySelector("#current-country.main-small");
  country.innerHTML = response.data.sys.country;

  let currCondition = document.querySelector("#current-condition");
  currCondition.innerHTML = response.data.weather[0].main;

  let currentHumid = document.querySelector("#cur-humid");
  currentHumid.innerHTML = `humidity ${response.data.main.humidity}%`

  let currentWind = document.querySelector("#cur-wind");
  currentWind.innerHTML = `wind ${Math.round(response.data.wind.speed)} m/s`;
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



//function convertionF(event) {
//event.preventDefault();
//let currT = document.querySelector("#current-temp");
//let varT = 28;
//let tempF = Math.round(varT * 1.8 + 32);
//currT.innerHTML = `${tempF}°F`;
//}

//function convertionC(event) {
//event.preventDefault();
//let currT = document.querySelector("#current-temp");
//let varT = 82;
//let tempC = Math.round((varT - 32) / 1.8);
//currT.innerHTML = `${tempC}°F`;
//}

//let convertF = document.querySelector("#farenheit");
//convertF.addEventListener("click", convertionF);

//let convertC = document.querySelector("#celsius");
//convertC.addEventListener("click", convertionC);