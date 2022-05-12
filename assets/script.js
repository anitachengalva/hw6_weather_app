// unique API key and user input city as variables
var APIkey = "8c8e55781e1b60ae6ad3fafe04b05cc8";
var city;

// insert variables into API query URL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

// store user input city variable


// fetch API
let response = fetch(queryURL)

fetch(queryURL)
  .then(response => response.json())
  .then(data => console.log(data));
  
function weather(data) {
    console.log(data);

    var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var temp = data.main.temp;
    var weather = data.weather[0].main;

    // icon displays current weather conditions 
    $(".icon").attr('src', icon);

    // prints weather data
    $(".weather").append(weather);
    $(".temp").append(temp);
    $(".wind").append(wind);
    $(".humidity").append(humidity);
    $(".uv").append(uv);
}