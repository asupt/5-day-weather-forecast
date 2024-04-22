// localStorage.clear();

const APIKey = "47472c834c35b46a0a0e97f1c254a14f";
let city;
let weatherData = [];
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const mainWeatherCard = document.getElementById("weatherContent");
const fiveDayCast = document.getElementById("fiveDayForecast");
const recentSearches = document.getElementById("recentSearches");


if (localStorage.getItem("weatherData") != null) {
    weatherData = JSON.parse(localStorage.getItem("weatherData"));
};

createLastSearched();
var lSB = document.querySelectorAll(".lastSearchedButton");


console.log(lSB);

lSB.forEach(function(i) {
    i.addEventListener('click', async function(event) {
        getWeather(i.textContent);
        getWeatherForecast(i.textContent);
        return
    })
  });


console.log(weatherData);

// Get weather data with submit button click
searchButton.addEventListener('click', async function(event) {
    const cityValue = cityInput.value;
    getWeather(cityValue);
    getWeatherForecast(cityValue);

    // create new last-searched button for the queried city
    if (!weatherData.includes(cityValue)) {
        let newButton = document.createElement("button");
        newButton.textContent = cityValue;
        newButton.style.width = "180px";
        newButton.className = "lastSearchedButton";
        recentSearches.appendChild(newButton);
        lSB = document.querySelectorAll(".lastSearchedButton");
        // recreate function of new button
        lSB.forEach(function(i) {
            i.addEventListener('click', async function(event) {
                getWeather(i.textContent);
                getWeatherForecast(i.textContent);
                return
            })
          });
    }
    return
});


// Get today's weather based on input
async function getWeather(i) {
    city = i;
    console.log(city);
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    console.log(city);
    const fetched = await fetch(queryURL);
    const data = await fetched.json();
    console.log(data);

    let date = new Date(data['dt']*1000);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    console.log(month);
    console.log(day);
    console.log(year);

    date = ""+city+" ("+month+"/"+day+"/"+year+")"

    console.log(date);

    let weather = data['weather']['0']['main'];

    console.log(weather);

    let temp = "Temp: " + ((data['main']['temp'] - 273.15) * 9/5 + 32).toFixed(2) + "\u00B0F";

    console.log(temp);
    
    let windSpeed = "Wind: " + ((data['wind']['speed'])*2.23694).toFixed(2) + " MPH";

    console.log(windSpeed);

    let humidity = "Humidity: " + data['main']['humidity'] + "%";

    console.log(humidity);

    mainWeatherCard.children[0].textContent = date;
    mainWeatherCard.children[1].textContent = weather;
    mainWeatherCard.children[2].textContent = temp;
    mainWeatherCard.children[3].textContent = windSpeed;
    mainWeatherCard.children[4].textContent = humidity;

    if (weatherData.length == [0]) {
        weatherData.push(city);
    }

    else if (!weatherData.includes(city)) {
        weatherData.push(city);
    }
    console.log(weatherData);
    localStorage.setItem("weatherData", JSON.stringify(weatherData));

};

// Get weather forecast for 5 days after today based on input
async function getWeatherForecast(i) {
    city = i;

    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
    console.log(city);
    const fetched = await fetch(queryURL);
    const data = await fetched.json();
    console.log(data);
    
    for (let i = 0; i < 33; i+=8) {

        let rawDate = data['list'][i]['dt_txt'].split(" ");
        dateSlashes = rawDate[0].toString().replaceAll("-", "/");
        let dateSlashSplit = dateSlashes.split("/").reverse();
        let day = dateSlashSplit[0];
        let month = dateSlashSplit[1];

        dateSlashSplit[0] = month;
        dateSlashSplit[1] = day;

        let date = dateSlashSplit.join("/");

        console.log(date);

        let weather = data['list'][i]['weather']['0']['main'];

        console.log(weather);

        let temp = "Temp: " + ((data['list'][i]['main']['temp'] - 273.15) * 9/5 + 32).toFixed(2) + "\u00B0F";

        console.log(temp);
        
        let windSpeed = "Wind: " + ((data['list'][i]['wind']['speed'])*2.23694).toFixed(2) + " MPH";

        console.log(windSpeed);

        let humidity = "Humidity: " + data['list'][i]['main']['humidity'] + "%";

        console.log(humidity);

        fiveDayCast.children[i/8].children[0].textContent = date;
        fiveDayCast.children[i/8].children[1].textContent = weather;
        fiveDayCast.children[i/8].children[2].textContent = temp;
        fiveDayCast.children[i/8].children[3].textContent = windSpeed;
        fiveDayCast.children[i/8].children[4].textContent = humidity;
    }

};

//////////////////////////////////////////////////////////////////////////////




function createLastSearched() {

    recentSearches.innerHTML = "";

    console.log(weatherData);

    for (let i = 0; i < weatherData.length; i++) {
        let newButton = document.createElement("button");
        newButton.textContent = weatherData[i];
        newButton.style.width = "15vw";
        newButton.className = "lastSearchedButton";
        recentSearches.appendChild(newButton);
    }
};

