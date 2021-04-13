// http://api.openweathermap.org/data/2.5/weather?q=Chicago,US&APPID=952a31c8c46b04b367ae5571aed08c79

// get the drink table element from the html
var weatherDetailsTableEl = document.getElementById('weatherDetailsTable');



function getApi(cityChoice){
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityChoice + '&appid=952a31c8c46b04b367ae5571aed08c79';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            // var weatherIconVariable = "http://openweathermap.org/img/w/" + data.weather.icon + ".png";

            var tableRow = document.createElement('tr');

            tableRow.innerHTML = `<td> ${data.main.temp} </td>
            <td> ${data.main.humidity} </td>
            <td> ${data.weather[0].main} </td>`;

            weatherDetailsTable.append(tableRow);

        })    
}


$(document).on('click', '#userInputCityButton', function(){
    var userInputCityEl = document.getElementById('userInputCity').value;
    console.log('userInputCityEl');
    getApi(userInputCityEl)
})