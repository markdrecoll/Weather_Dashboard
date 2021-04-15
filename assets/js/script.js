// get elements from html
var weatherDetailsDivEl = document.getElementById('weatherDetailsDiv');
var futureDayOneWeatherEl = document.getElementById('futureDayOneWeather');
var fiveDayForecastCardsEl = document.getElementById('fiveDayForecastCards');


// this fetches api data based on what city the user wrote in
// original API URL: http://api.openweathermap.org/data/2.5/forecast?q={city name}&units={api key}'
function getApi(cityChoice){
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityChoice + '&units=imperial&appid=952a31c8c46b04b367ae5571aed08c79';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // concatenate the image file name with the url for image thumbnails
            var weatherIconVariable = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";

            // create a table row to display elements
            var pToBeAdded = document.createElement('p');
            
            // call the getUV function by passing in city lat/long
            getUV(data.city.coord.lat, data.city.coord.lon);

            // display remaining data
            pToBeAdded.innerHTML = `<p id="UVparagraph"> ${data.city.name} ${data.list[0].dt_txt}
            <img src="${weatherIconVariable}" alt="Weather Icon"></img><br>
            Temperature: ${data.list[0].main.temp} F<br>
            Humidity: ${data.list[0].main.humidity}%<br>
            Wind Speed: ${data.list[0].wind.speed} MPH<br>`;
            
            // append it to the html
            weatherDetailsDiv.append(pToBeAdded);

            // call the display function to show multiple days of weather
            displayFiveDayWeather(data.list);
        })    
}

function displayFiveDayWeather(dataListItems){

    // console log to see what data is attached
    console.log(dataListItems);

    // create an array to hold days for weather
    var cleanFiveDays = [];

    // for loop that takes the weather only at 0 hours, so that it returns only for days not every 3 hours
    for(var i=0; i<dataListItems.length; i++){
        if(dataListItems[i].dt_txt.split(" ")[1]==="00:00:00"){
            cleanFiveDays.push(dataListItems[i]);
        }
    }

    // console log just to see whats happening
    console.log(cleanFiveDays);

    // for the for loop before, try passing in this for the date instead and figure out formatting
    // ${new Date(dataListItems[i].dt)}
  

    // create five cards to display weather each day
    for(var i=0; i<cleanFiveDays.length; i++){

        // concatenate the image file name with the url for image thumbnails
        var weatherIconVariable = "http://openweathermap.org/img/w/" + dataListItems[i].weather[0].icon + ".png";

        // create the cards
        var card = `<div class="card text-white bg-primary mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${dataListItems[i].dt_txt.split(" ")[0]}</h5>
          <p class="card-text"><img alt='cardweatherdetails' src='${weatherIconVariable}'></img><br>
          Temp: ${dataListItems[i].main.temp} F<br
          >Humidity: ${dataListItems[i].main.humidity}%</p>
        </div>
      </div>`;

    //   write the data to the page, += so it adds each time and doesn't erase itself
      fiveDayForecastCardsEl.innerHTML += card;
    }
}

// takes in what city the user inputted
$(document).on('click', '#userInputCityButton', function(){
    var userInputCityEl = document.getElementById('userInputCity').value;
    getApi(userInputCityEl);
})

// this function takes a latitude and longitude and puts it into an API URL in order to obtain the UV index
// original API URL: http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
function getUV(lat, lon){
    var requestUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=952a31c8c46b04b367ae5571aed08c79';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // attaches a variable to the UVparagraph element
            var UVparagraphEl = document.getElementById('UVparagraph');

            // take in the uv data and display a background color that represents the severity of sun exposure
            if(data.value<3){
                UVparagraphEl.innerHTML += (`UV Index: <span background-color="black" class="UVfavorable">${data.value}</span>`);

            }else if(data.value>2 && data.value<7){
                UVparagraphEl.innerHTML += (`UV Index: <span background-color="black" class="UVmoderate">${data.value}</span>`);

            }else{
                UVparagraphEl.innerHTML += (`UV Index: <span background-color="black" class="UVsevere">${data.value}</span>`);
            }            
        })    
}