// unique API key and user input city as variables
var APIkey = "8c8e55781e1b60ae6ad3fafe04b05cc8";
var previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || []

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


for(i=previousSearches.length-1;i>previousSearches.length-5;i--){
  //target the div where the buttons are stored. and then dynamically add html for buttons
  document.getElementsByClassName("cities").innerHTML+=`<button class="cities-searched">${previousSearches[i]}</button>`;
  
  button.addEventlistener("click",search)
    if (button.hasAttribute("class", "cities-searched")) {
      search();
    }
};


// grab user input for city name
function search (event){
    event.preventDefault();
    let city = document.getElementById("searchBar").value || event.target.innerText;
    console.log(event.target)
    previousSearches.push(city)
  
    localStorage.setItem("previousSearches",JSON.stringify(previousSearches));
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  
    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        // get location to pass into onecall api
        var lat = data['coord']['lat'];
        var lon = data['coord']['lon'];
        
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
        var queryURL2 = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=currently,minutely,hourly,alerts&appid=" + APIkey;

        fetch(queryURL2).then(async function(response){
        let results = await response.json()
        console.log(results)
        return results;
        }).then(function(results){

          // gets icon for current weather
          document.querySelector(".icon").src="http://openweathermap.org/img/w/" + results.current.weather[0].icon + ".png"

          // date stamp
          // uv index

          // five day forecast
              // DAY 1
              var icon_1 = data['daily']['0']['weather']['0']['icon'];
              var date_1 = data['daily']['0']['dt'];
              var high_1 = data['daily']['0']['temp']['max'];
              var low_1 = data['daily']['0']['temp']['min'];
              var wind_1 = data['daily']['0']['wind_speed'];
              var humidity_1 = data['daily']['0']['humidity'];

              document.getElementById("day1-icon").innerHTML = icon_1;
              document.getElementById("day1-date").innerHTML = date_1;
              document.getElementById("day1-temphigh").innerHTML = high_1;
              document.getElementById("day1-templow").innerHTML = low_1;
              document.getElementById("day1-wind").innerHTML = wind_1;
              document.getElementById("day1-humidity").innerHTML = humidity_1;
        })
      });
}


// incorperate date into display
// incorperate icon
// five day forecast
// previous search history
// temp k to f