
// fetch API
fetch('http://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&APPID=8c8e55781e1b60ae6ad3fafe04b05cc8')
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
}