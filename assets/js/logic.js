const APIKey = "47472c834c35b46a0a0e97f1c254a14f";
let city;
const searchButton = document.getElementById("searchButton")


city = "Richmond, US"

const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

async function getWeather() {
const fetched = await fetch(queryURL);
const data = await fetched.json();
console.log(data);
console.log(data['list']['0']['main']['temp']);
return data;
}

getWeather();

