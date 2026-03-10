const form = document.querySelector("form");
const searchField = document.querySelector(".searchField");
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather-icon img");
const weatherField = document.querySelector(".weather_condition span");

const feelsLikeField = document.querySelector("#feels-like-val");
const humidityField = document.querySelector("#humidity-val");
const windField = document.querySelector("#wind-val");
const visibilityField = document.querySelector("#visibility-val");
const uvField = document.querySelector("#uv-val");
const pressureField = document.querySelector("#pressure-val");






let target = "London";

form.addEventListener("submit", search);

function search(e){
    e.preventDefault();
    target = searchField.value;
    console.log(target);
    fetchData(target);

}

async function fetchData(target){
    try{
        let endPoint = `https://api.weatherapi.com/v1/current.json?key=592da823e4fb49abb8274557260903&q=${target}&aqi=no`;
        let response = await fetch(endPoint);
        let data = await response.json();

        console.log(response);
        console.log(data);

        let currTemp = data.current.temp_c;
        let cityName = data.location.name;
        let localTime = data.location.localtime;
        let condition = data.current.condition.text;
        let conditionIcon = data.current.condition.icon;
        let feelsLike = data.current.feelslike_c;
        let humidity = data.current.humidity;
        let wind= data.current.wind_kph;
        let visibility = data.current.vis_km;
        let uv = data.current.uv;
        let pressure = data.current.pressure_mb;
        console.log(currTemp, cityName, localTime, condition, conditionIcon, feelsLike, humidity, wind, visibility, uv, pressure);
        updateWeather(currTemp, cityName, localTime, condition, conditionIcon, feelsLike, humidity, wind, visibility, uv, pressure);
    }
    catch(error){
        console.log(error);
    }


}


function updateWeather(currTemp, cityName, localTime, condition, conditionIcon, feelsLike, humidity, wind, visibility, uv, pressure){

    temperatureField.innerText = currTemp + "°";
    cityField.innerText = cityName;
    dateField.innerText = localTime;
    weatherField.innerText = condition;
    emojiField.src = conditionIcon;
    feelsLikeField.innerText = feelsLike + "°";
    humidityField.innerText = humidity + "%";
    windField.innerText = wind + " km/h";
    visibilityField.innerText = visibility + " km";
    uvField.innerText = uv;
    pressureField.innerText = pressure + " hPa";

    searchField.value = " ";


}

fetchData(target);