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


// for(i=previousSearches.length-1;i>previousSearches.length-5;i--){
//   //target the div where the buttons are stored. and then dynamically add html for buttons
//   document.getElementsByClassName("cities").innerHTML+=`<button class="cities-searched">${previousSearches[i]}</button>`;
  
//   button.addEventlistener("click",search)
//     if (button.hasAttribute("class", "cities-searched")) {
//       search();
//     }
// };


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
        temp.innerHTML = Number(1.8*(temp_index-273)+32).toFixed(1) + "°F";
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
            for (let i = 0; i < 5; i++) {
              let index = i + 1;
              // var dayJS = dayjs();
              // var today = today.add(index, "d").format("MM/DD/YY");
          
              var icon_1 = results.daily[index].weather[0].icon;
              console.log(icon_1)
              var date_1 = results['daily'][index]['dt'];
              var high_1 = results['daily'][index]['temp']['max'];
              var low_1 = results['daily'][index]['temp']['min'];
              var wind_1 = results['daily'][index]['wind_speed'];
              var humidity_1 = results['daily'][index]['humidity'];
          
              document.getElementById(`day${index}-icon`).src = `https://openweathermap.org/img/w/${icon_1}.png`;
              
              document.getElementById(`day${index}-date`).innerHTML = date_1;
              document.getElementById(`day${index}-temphigh`).innerHTML = Math.floor(high_1);
              document.getElementById(`day${index}-templow`).innerHTML = Math.floor(low_1);
            
              document.getElementById(`day${index}-wind`).innerHTML = Math.floor(wind_1);
              document.getElementById(`day${index}-humidity`).innerHTML = humidity_1;
            }

              document.getElementById("day1-icon").src = icon_1;
              document.getElementById("day1-date").innerHTML = date_1;
              // document.getElementById("day1-temphigh").innerHTML = "High Temp: " + high_1 + "°K";
              // document.getElementById("day1-templow").innerHTML = "Low Temp: " + low_1 + "°K";
              // document.getElementById("day1-wind").innerHTML = "Wind Speed: " + wind_1;
              // document.getElementById("day1-humidity").innerHTML = "Humidity: " + humidity_1;
        })
      });
}

// Default displayed weather is Seattle
function init(){
  search("Seattle");
};


// incorperate date into display
// incorperate icon
// five day forecast
// previous search history
// temp k to f