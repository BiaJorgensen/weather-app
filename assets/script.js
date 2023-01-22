
const APIKey = "f3590b94654981da9b8d1099d19b0979";


$(function() {
   
    
    
    
    $('#search').click(function (e) { 
        e.preventDefault();
        removeAppend()
        const city = $('#citySearch').val();
        localStorage.setItem('city', JSON.stringify(city));
        const getCity = JSON.parse(localStorage.getItem('city'))
        if (getCity) {
            console.log(getCity);
            getCurrentWeather();
            getForecast()
            
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
            const searchedCity = {
                name:data.name,
                temp: data.main.temp,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                
            };
            localStorage.setItem('searchedCity', JSON.stringify(searchedCity))



            console.log(data);
            const icon = data.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          
            console.log(data.name);
            $('#currentDayInfo').append('<h2>' + data.name + ' ' + dayjs().format('MM/DD/YY') + '</h2>');
            $('#currentDayInfo').append("<img src='"+ iconURL + "'></img>")
            $('#currentInfo').append('<p>' + 'Temperature: ' + data.main.temp + '°F' + '</p>');
            $('#currentInfo').append('<p>' + 'Wind: ' + data.wind.speed + ' MPH' + '</p>');
            $('#currentInfo').append('<p>' + 'Humidity: ' + data.main.humidity + ' %' + '</p>');
          });
}


function getForecast() {
    const city = JSON.parse(localStorage.getItem('city'))
    const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey
    fetch(queryURLforecast)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(dayjs().isSame(data.list[0].dt_txt, 'day')) {
                console.log('is the same');
            }
console.log(data);


        })
}

function removeAppend() {
    $('#currentDayInfo').empty();
    $('#currentInfo').empty();
  }
