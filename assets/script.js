
const APIKey = "f3590b94654981da9b8d1099d19b0979";
http://openweathermap.org/img/wn/10d@2x.png

$(function() {
   
    
    // const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey
    
    $('#search').click(function (e) { 
        e.preventDefault();
        removeAppend()
        const city = $('#citySearch').val();
        localStorage.setItem('city', JSON.stringify(city));
        const getCity = JSON.parse(localStorage.getItem('city'))
        if (getCity) {
            console.log(getCity);
            getCurrentWeather();
            
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
          
            console.log(data.name);
            $('#currentDayInfo').append('<h2>' + data.name + ' ' + dayjs().format('MM/DD/YY') + '</h2>');
            $('#currentInfo').append(`<img src='http://openweathermap.org/img/wn/10d@2x.png'>`)
            $('#currentInfo').append('<p>' + 'Temperature: ' + data.main.temp + '°F' + '</p>');
            $('#currentInfo').append('<p>' + 'Wind: ' + data.wind.speed + ' MPH' + '</p>');
            $('#currentInfo').append('<p>' + 'Humidity: ' + data.main.humidity + ' %' + '</p>');
          });
}


function removeAppend() {
    
        $('#currentInfo').empty();
    
  }
