//Make suure sw are supported
if('serviceWorker'in navigator)
{
    window.addEventListener('load',() =>{
        navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('Service worker available'))
        .catch(err => console.log(`Service :${err}`) )
    })
    console.log('servise worker supported');
}
//SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temprature-description p");
const locationElement = document.querySelector(".location p");
const button =  document.querySelector(".button");
const inputvalue = document.querySelector(".inputValue");
//App data
const weather = { };

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;
//API KEY
const key = "e473b0e2b1d68899e4785fd5428ef42b";


button.addEventListener('click',function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid=e473b0e2b1d68899e4785fd5428ef42b')
  
  .then(response => response.json())
  .then(data =>{
    
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;

        localStorage.setItem("temperature",weather.temperature.value);
        localStorage.setItem("description",weather.description);
        localStorage.setItem("iconId",weather.iconId);
        localStorage.setItem("city",weather.city);
        localStorage.setItem("country",weather.country);
    })
    .then(function(){
        displayWeather();
    })
  .catch(err => alert("Wrong city name"))  
  })
  
//Display Weather TO UI
function displayWeather(){
   /* iconElement.innerHTML = `<img src="Icons/${weather.iconId}.png/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;*/

    
    iconElement.innerHTML = `<img src="Icons/${localStorage.getItem("iconId")}.png/>`;
    tempElement.innerHTML = `${localStorage.getItem("temperature")}°<span>C</span>`;
    descElement.innerHTML =localStorage.getItem("description");
    locationElement.innerHTML = `${localStorage.getItem("city")},${localStorage.getItem("country")}`;

}

//C to F conversion
function celsiusToFahrenheit(temprature){
    return (temprature * 9/5) + 32;
}

//When the user clicks on the temperature element
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML =`${fahrenheit} ° <span>F</span>`;
        weather.temperature.unit ="fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
        weather.temperature.unit ="celsius";
    }
});























