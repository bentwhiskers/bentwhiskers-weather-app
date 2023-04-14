
var cityInputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("srchBtn");
var prevSearchEl = document.getElementById("prevSearch");
var currentCityEl = document.getElementById("currentCity");
var currentDateEl = document.getElementById("currentDate");
var listDataEl = document.getElementById("dataList");
var APIKey = "699bc616274eb884e2703cfde40df755";
var lat;
var lon;

function getCurrentWthr(lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

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
                currentCityEl.textContent = cityInputEl.value;

        })

};

function getForecast(lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.list.length; i += 8) {
                console.log(data.list[i])
                var forecastDiv = document.createElement("div");
                var forecastEl = document.createElement("div");
                var forecastList = document.createElement("ul");
                var forecastTemp = document.createElement("li");
                var forecastWind = document.createElement("li");
                var forecastHumid = document.createElement("li");
                var futureForecastEl = document.getElementById("futureForecast");
                forecastTemp.textContent = "Temp: " + data.list[i].main.temp + " F";
                forecastWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                forecastHumid.textContent = "Humidity: " + data.list[i].main.humidity; 
                futureForecastEl.appendChild(forecastDiv);
                forecastDiv.appendChild(forecastEl);
                forecastEl.appendChild(forecastList);
                forecastList.appendChild(forecastTemp);
                forecastList.appendChild(forecastWind);
                forecastList.appendChild(forecastHumid);
                forecastDiv.setAttribute("class", "col");
                forecastDiv.setAttribute("class", "border");
                forecastDiv.setAttribute("class", "border-info");
                forecastDiv.setAttribute("class", "rounded");
                forecastDiv.setAttribute("class", "bg-info");
                forecastDiv.setAttribute("class", "bg-opacity-10");
            };
        })
};

function geoCode(cityName) {

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInputEl.value + "&limit=1&appid=" + APIKey + "&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            getCurrentWthr(data[0].lat, data[0].lon);
            getForecast(data[0].lat, data[0].lon);
        });

};

searchBtn.addEventListener("click", geoCode);
