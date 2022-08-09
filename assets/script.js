// unique API key and user input city as variables
var APIkey = "8c8e55781e1b60ae6ad3fafe04b05cc8";
var previousSearches = localStorage.getItem("previousSearches") || []

// insert variables into API query URL


// hit search button
document.getElementById("searchButton").addEventListener("click",search)
// grab user input for city name

for(i=previousSearches.length-1;i>previousSearches.length-5;i--){
  //make a for loop for your buttons here
}


function search (event){
    event.preventDefault();
    let city = document.getElementById("searchBar").value;
    console.log(event.target)
    previousSearches.push(city)
  
    localStorage.setItem("previousSearches",previousSearches)
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  
    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        //second fetch using the coordinates from data.coord.lat
        //this is where you'll manipulate the DOM
      });
}

















// store user input city variable
// document.getElementsByClassName(searchbar)[0]

// // fetch API
// let response = fetch(queryURL)


  
// function weather(data) {
//     console.log(data);

//     var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
//     var temp = data.main.temp;
//     var weather = data.weather[0].main;

//     // icon displays current weather conditions 
//     $(".icon").attr('src', icon);

//     // prints weather data
//     $(".weather").append(weather);
//     $(".temp").append(temp);
//     $(".wind").append(wind);
//     $(".humidity").append(humidity);
//     $(".uv").append(uv);
// }