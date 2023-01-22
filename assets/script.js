
const APIKey = "f3590b94654981da9b8d1099d19b0979";

$(function() {
    
    function upFirstLetter(x) {

        // converting first letter to uppercase
        return x.charAt(0).toUpperCase() + x.slice(1);
    }
    
    // const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey
    
    $('#search').click(function (e) { 
        e.preventDefault();
        const city = $('#citySearch').val();
        localStorage.setItem('city', JSON.stringify(upFirstLetter(city)));
        const testCity = JSON.parse(localStorage.getItem('city'))
        if (testCity) {
            console.log(testCity);
            getCurrentWeather();
            getCurrentDayCity()
        }
        else {
            console.log('false');
        }
       
    
    });
    
})

function getCurrentWeather() {
    const city = JSON.parse(localStorage.getItem('city'))
    const queryURLcurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    fetch(queryURLcurrent)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            // const currentTemp = data.main.temp;
            // const currentWind = data.wind.speed;
            // const currentHumidity = data.main.humidity

            // console.log(currentTemp);
            // console.log(currentWind);
            // console.log(currentHumidity);
            console.log(data);
            
            $('#currentInfo').append('<p>' + 'Temperature: ' + data.main.temp + '°F' + '</p>');
            $('#currentInfo').append('<p>' + 'Wind: ' + data.wind.speed + ' MPH' + '</p>');
            $('#currentInfo').append('<p>' + 'Humidity: ' + data.main.humidity + ' %' + '</p>');


          });
}

function getCurrentDayCity() {
    const city = JSON.parse(localStorage.getItem('city'))
    $('#currentInfo').append('<h2>' + city + ' ' + dayjs().format('MM/DD/YY') + '</h2>');
}

