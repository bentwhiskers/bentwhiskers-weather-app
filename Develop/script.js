// the user will enter a city name into the search area and hit search btn
// search btn will have click event that runs geocode function to get lon and lat of city name input
// geocode function will run currentWthr function and forecast function
// 
// 
var cityInputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("srchBtn");
var prevSearchEl = document.getElementById("prevSearch");
var currentCityEl = document.getElementById("currentCity");
var currentDateEl = document.getElementById("currentDate");
var listDataEl = document.getElementById("dataList");
var APIKey = "699bc616274eb884e2703cfde40df755";
var lat;
var lon;
var cityName = cityInputEl.textContent;

function getCurrentWthr(lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var listEl = document.createElement("ul");
                var temp = document.createElement("li");
                var wind = document.createElement("li");
                var humidity = document.createElement("li");
                temp.textContent = "Temp: " + data.main.temp + " F";
                wind.textContent = "Wind: " + data.wind.speed + " MPH";
                humidity.textContent = "Humidity: " + data.main.humidity;
                listDataEl.appendChild(listEl);
                listEl.appendChild(temp);
                listEl.appendChild(wind);
                listEl.appendChild(humidity);


            } 
        })

};

function getForecast(lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

function geoCode(cityName) {

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

    // getCurrentWthr();
    // getForecast();


};

searchBtn.addEventListener("click", geoCode);
