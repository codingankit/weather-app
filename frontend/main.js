// Dynamically import the CSS file
import("./style.css");

//Selecting Elememts
const searchBtn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const cityTemp = document.querySelector("#cityTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDescription = document.querySelector("#weatherDescription");
const weatherHumidity = document.querySelector("#humidity");
const weatherWindSpeed = document.querySelector("#windSpeed");
const errText = document.querySelector("#errText");
const errDiv = document.querySelector("#errDiv");
const initialTextDiv = document.querySelector("#initialTextDiv");
const mainContent = document.querySelector("#mainContent");
const loaderDiv = document.querySelector("#loaderDiv");

// API URL
const API_URL = process.env.API_URL;

// Function to fetch weather data
const fetchWeather = async city => {
    const apiForFetchWeather = `${API_URL}/api/weather`;
    const fetchedWeatherRaw = await fetch(apiForFetchWeather, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ city })
    });
    const fetchedWeather = await fetchedWeatherRaw.json();
    return fetchedWeather;
};

// Function to set weather data on the page
const setWeather = ({
    city,
    temp,
    iconClass,
    description,
    humidity,
    windSpeed
}) => {
    cityName.innerText = city;
    cityTemp.innerText = temp;
    weatherIcon.className = iconClass;
    weatherDescription.innerText = description;
    weatherHumidity.innerText = humidity;
    weatherWindSpeed.innerText = windSpeed;
    initialTextDiv.style.display = "none";
    errDiv.style.display = "none";
    loaderDiv.style.display = "none";
    mainContent.style.display = "block";
};

// Function to handle when no city is found
const noCityFound = () => {
    errText.innerText = "No City Found";
    initialTextDiv.style.display = "none";
    mainContent.style.display = "none";
    loaderDiv.style.display = "none";
    errDiv.style.display = "block";
};

// Function to evaluate the icon class based on weather icon info
const evalulateIconClass = iconInfoArr => {
    const iconId = iconInfoArr.id;
    const dayOrNight = iconInfoArr.icon.slice(-1);
    if (dayOrNight == "n") return `wi wi-owm-night-${iconId}`;
    return `wi wi-owm-day-${iconId}`;
};

// Function to evaluate weather based on user input
const evaluateWeather = () => {
    mainContent.style.display = "none";
    initialTextDiv.style.display = "none";
    errDiv.style.display = "none";
    loaderDiv.style.display = "flex";
    const searchBoxValue = searchBox.value;
    if (searchBoxValue == null || searchBoxValue == "") {
        loaderDiv.style.display = "none";
        errDiv.style.display = "block";
        errText.innerText = "Please Enter City Name";
    }
    const weatherInfoProm = fetchWeather(searchBoxValue);
    weatherInfoProm.then(weatherInfo => {
        if (weatherInfo == 0) noCityFound();
        const city = weatherInfo.name;
        const temp = `${weatherInfo.main.temp} °C`;
        const iconClass = evalulateIconClass(weatherInfo.weather[0]);
        const description = weatherInfo.weather[0].description;
        const humidity = `${weatherInfo.main.humidity}%`;
        const windSpeed = `${weatherInfo.wind.speed} m/s`;
        setWeather({ city, temp, iconClass, description, humidity, windSpeed });
    });
};

// Event listener for search button click
searchBtn.addEventListener("click", e => {
    e.preventDefault();
    evaluateWeather();
});

// Event listener for search box search event
searchBox.addEventListener("search", e => {
    e.preventDefault();
    evaluateWeather();
});
