
const APIKey = "f3590b94654981da9b8d1099d19b0979";

$(function() {
    
    
    
    // const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey
    
    $('#search').click(function (e) { 
        e.preventDefault();
        const city = $('#citySearch').val();
        localStorage.setItem('city', JSON.stringify(city));
        const testCity = JSON.parse(localStorage.getItem('city'))
        if (testCity) {
            console.log(testCity);
            getCurrentWeather()
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
            console.log(data);
          });
}


