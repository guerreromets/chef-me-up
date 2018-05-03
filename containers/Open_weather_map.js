const WEATHER_API_KEY="c2391be96876256abea710533eed25ba";
 //NEED TO APPLY FOR A KEY
function coordUrl(latitude, longitude) {
  //return '${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}';
  return 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + "&lon=" + longitude +'&units=imperial&APPID=' + WEATHER_API_KEY;
}
function fetchForecast(latitude, longitude){
  return fetch( coordUrl(latitude, longitude))
  .then(response => response.json())
  .then(responseJSON => {
     return {
      main: responseJSON.weather[0].main,
      description: responseJSON.weather[0].description,
      temp: responseJSON.main.temp
    };
  })
  .catch(error => {console.error(error);
  });
}
export default {fetchForecast: fetchForecast};
