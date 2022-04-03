
// fetch API
fetch('http://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&APPID=8c8e55781e1b60ae6ad3fafe04b05cc8')
  .then(response => response.json())
  .then(data => console.log(data));