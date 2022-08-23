// unique API key and user input city as variables
var APIkey = "8c8e55781e1b60ae6ad3fafe04b05cc8";
var previousSearches = localStorage.getItem("previousSearches") || []

// defining variables
var button = document.getElementById("searchButton");
let city = document.getElementById("searchBar").value;

var date = document.getElementById("currentDate");
var cityName = document.getElementById("cityName");
var weather = document.getElementById("weather");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("uv");

// hit search button
button.addEventListener("click", search)

// grab user input for city name

for(i=previousSearches.length-1;i>previousSearches.length-5;i--){
  //make a for loop for your buttons here
}


function search (event){
    event.preventDefault();
    let city = document.getElementById("searchBar").value;
    console.log(event.target)
    // previousSearches.push(city)
  
    localStorage.setItem("previousSearches",previousSearches)
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  
    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        // get location to pass into onecall api
        // var lat = data['coord']['lat'];
        // var lon = date['coord']['lon'];
        
        // current weather data
        var city_name = data['name'];
        var city_weather = data['weather']['0']['description'];
        var temp_index = data['main']['temp'];
        var wind_index = data['wind']['speed'];
        var humidity_index = data['main']['humidity'];
        var uv_index = data['clouds']['all'];

        cityName.innerHTML = city_name;
        weather.innerHTML = city_weather;
        temp.innerHTML = temp_index;
        wind.innerHTML = wind_index;
        humidity.innerHTML = humidity_index;
        uv.innerHTML = uv_index;

        // future weather forecast
        

      });
}