// Week 4. Current data and time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = [
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
  "Nowember",
  "December",
];

let now = new Date(); // нова змінна формату дати

let currentDate = document.querySelector("#current-date"); //шукаємо, де її розмістити
//console.log(currentDate);
let currentDay = days[now.getDay()];
let currentMonth = month[now.getMonth()];
let currentDat = now.getDate();
let currentHours = now.getHours();
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = "0" + currentMin;
}
currentDate.innerHTML = `${currentDay}, ${currentMonth}, ${currentDat}, 
${currentHours}:${currentMin}  `;

//Week 5. Current location and temperature here
//температура по локацїї
function showTemperatureLocation(response) {
  //функція виводить температуру по поточній локації (координати чи назва міста)
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiKey = "92dec7e2931d37f76f7ea0cca649963a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureLocation);
}

function currentLocationTemperature(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// пошук по натисканню кнопки Current Location
let buttonCurrentLocation = document.querySelector("#currentLocationButton");
buttonCurrentLocation.addEventListener("click", currentLocationTemperature);

// пошук по натисканню кнопки Search
function city(position) {
  let cityName = document.querySelector("#cityname-input");
  let city = cityName.value;
  console.log(`${city}`);
  let apiKey = "92dec7e2931d37f76f7ea0cca649963a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureLocation);
}

function stopClear(event) {
  event.preventDefault(); //вже не перезавантажується сторінка
  navigator.geolocation.getCurrentPosition(city);
}

let buttonSearch = document.querySelector("#search-form");
console.log(`${buttonSearch}`); //шукаємо форму
buttonSearch.addEventListener("submit", stopClear); // шукаємо сабміт форми

/*axios
  .get(`${apiUrl}&appid=${apiKey}&units=metric`)
  .then(showTemperatureLocation);*/
