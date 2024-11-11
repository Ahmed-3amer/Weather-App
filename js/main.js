let weatherApp = document.querySelector(".weather-app");
let temp = document.querySelector(".temp");
let city = document.querySelector(".name");
let icon = document.querySelector(".icon");
let condition = document.querySelector(".condition");
let cloudOutput = document.querySelector(".cloud");
let humidityOutput = document.querySelector(".humidity");
let windOutput = document.querySelector(".wind");
let cities = document.querySelectorAll(".city");
let clearWeather = document.querySelector(".clear-weather");
let cloudyWeather = document.querySelector(".cloudy-weather");
let drizzleWeather = document.querySelector(".drizzle-weather");
let rainWeather = document.querySelector(".rain-weather");
let mistWeather = document.querySelector(".mist-weather");
let snowWeather = document.querySelector(".snow-weather");
let thunderWeather = document.querySelector(".thunder-weather");

// Search
let locationBar = document.getElementById("locationBar");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let errorMessage = document.getElementById("errorMessage");
let emptyInputMessage = document.getElementById("emptyInputMessage");

// API
let apiKey = "561f5a685f37bca264f47ffe5ca68cd3";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Weather Functions

// get weather data
async function getWeatherData(cityName) {
  let response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
  let data = await response.json();

  if (data.cod === "404") {
    showErrorMessage(data.message);
    weatherApp.style.opacity = "1";
  } else {
    displayWeather(data);
    showIcons(data);
    weatherApp.style.opacity = "1";
  }
}

// Display data
function displayWeather(data) {
  temp.innerHTML = Math.round(data.main.temp) + "&#176";
  city.innerHTML = data.name;
  condition.innerHTML = data.weather[0].main;
  cloudOutput.innerHTML = data.clouds.all + "%";
  humidityOutput.innerHTML = data.main.humidity + "%";
  windOutput.innerHTML = data.wind.speed + "km/h";
}

// Show weather icons based on conditions
function showIcons(data) {
  const weatherIcons = [
    clearWeather,
    cloudyWeather,
    rainWeather,
    drizzleWeather,
    thunderWeather,
    snowWeather,
    mistWeather,
  ];

  weatherIcons.forEach((icon) => icon.classList.remove("active-icon"));

  if (data.weather[0].main === "Clear") {
    clearWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/clear.jpg)";
    searchBtn.style.backgroundColor = "#BEBEC0";
  } else if (data.weather[0].main === "Clouds") {
    cloudyWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/cloudy.jpg)";
    searchBtn.style.backgroundColor = "#fa6d1b";
  } else if (data.weather[0].main === "Rain") {
    rainWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/rain.jpg)";
    searchBtn.style.backgroundColor = "#151E22";
  } else if (data.weather[0].main === "Drizzle") {
    drizzleWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/drizzle.jpg)";
    searchBtn.style.backgroundColor = "#395652";
  } else if (data.weather[0].main === "Thunderstorm") {
    thunderWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/thunderstorm.jpg)";
    searchBtn.style.backgroundColor = "#1C3143";
  } else if (data.weather[0].main === "Snow") {
    snowWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/snow.jpg)";
    searchBtn.style.backgroundColor = "#59535F";
  } else if (
    data.weather[0].main === "Mist" ||
    data.weather[0].main === "Fog"
  ) {
    mistWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/fog.jpg)";
    searchBtn.style.backgroundColor = "#2A4B43";
  } else if (data.weather[0].main === "Sand") {
    mistWeather.classList.add("active-icon");
    weatherApp.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(images/backgrounds/sand.jpg)";
    searchBtn.style.backgroundColor = "#9F6135";
  }
}

// Show error message
function showErrorMessage(message) {
  errorMessage.innerHTML = message;
  errorMessage.classList.replace("d-none", "d-block");
  setTimeout(() => {
    errorMessage.classList.replace("d-block", "d-none");
  }, 3000);
}

getWeatherData("Cairo");

// Event listeners for city buttons and search
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    let cityInput = e.target.innerText;
    weatherApp.style.opacity = "0";
    getWeatherData(cityInput);
  });
});

searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    emptyInputMessage.classList.replace("d-none", "d-block");
    setTimeout(() => {
      emptyInputMessage.classList.replace("d-block", "d-none");
    }, 3000);
  } else {
    getWeatherData(searchInput.value);
    searchInput.value = "";
    weatherApp.style.opacity = "0";
    emptyInputMessage.classList.replace("d-block", "d-none");
  }
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (searchInput.value == "") {
      emptyInputMessage.classList.replace("d-none", "d-block");
      setTimeout(() => {
        emptyInputMessage.classList.replace("d-block", "d-none");
      }, 3000);
    } else {
      getWeatherData(searchInput.value);
      searchInput.value = "";
      weatherApp.style.opacity = "0";
      emptyInputMessage.classList.replace("d-block", "d-none");
    }
  }
});
