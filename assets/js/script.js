// get elements from html
var weatherDetailsTableEl = document.getElementById('weatherDetailsTable');
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
            var tableRow = document.createElement('tr');
            
            // call the getUV function by passing in city lat/long
            getUV(data.city.coord.lat, data.city.coord.lon);

            // display remaining data
            tableRow.innerHTML = `<td> ${data.city.name} </td>
            <td>${data.list[0].dt_txt}</td>
            <td><img src="${weatherIconVariable}" alt="Weather Icon"></img></td>
            <td> ${data.list[0].main.temp} </td>
            <td>${data.list[0].main.humidity}</td>
            <td>${data.list[0].wind.speed}</td>
            <td id="uvIndexTableElement"></td>`;
            
            // append it to the html
            weatherDetailsTable.append(tableRow);

            // call the display function to show multiple days of weather
            displayFiveDayWeather(data.list);
        })    
}

function displayFiveDayWeather(dataListItems){

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
      </div>`

      fiveDayForecastCardsEl.innerHTML += card;
    }
}

// takes in what city the user inputted
$(document).on('click', '#userInputCityButton', function(){
    var userInputCityEl = document.getElementById('userInputCity').value;
    console.log('userInputCityEl');
    getApi(userInputCityEl)
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

            var tableColumn = document.getElementById('uvIndexTableElement');

            tableColumn.innerHTML = `${data.value}`;
        })    
}