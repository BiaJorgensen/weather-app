
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
            getForecast();
            getCoord()
            
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
            const lat = data.coord.lat;
            localStorage.setItem('lat', JSON.stringify(lat))
            const lon = data.coord.lon
            localStorage.setItem('lon', JSON.stringify(lon))


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

function getCoord() {
    const lat = JSON.parse(localStorage.getItem('lat'));
    const lon = JSON.parse(localStorage.getItem('lon'));
    const oneCallForecastURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial" + "&appid=" + APIKey;
    fetch(oneCallForecastURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // $('#day-1').append('<h3>' + dayjs.unix(data.daily[1].dt).format('MM/DD/YY') + '</h3>');
            appendForecastInfo(1, 1)
            for (let i = 1; i<=5; i++) {
               
                console.log(dayjs.unix(data.daily[i].dt).format('MM/DD/YY'));
                console.log(data.daily[i].weather[0].icon);
                console.log(data.daily[i].temp.day + '°F');
                console.log(data.daily[i].wind_speed + ' MPH');
                console.log(data.daily[i].humidity + ' %');
            }
            function appendForecastInfo(id, index) {
                const icon = data.daily[index].weather[0].icon
                const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                $('#day-' + id).append('<h3>' + dayjs.unix(data.daily[index].dt).format('MM/DD/YY') + '</h3>');
                $('#day-' + id).append("<img src='"+ iconURL + "'></img>");
                $('#day-' + id).append('<p>' + 'Temperature: ' + data.daily[index].temp.day + '°F' + '</p>');
                $('#day-' + id).append('<p>' + 'Wind: ' + data.daily[index].wind_speed + ' MPH' + '</p>')
                $('#day-' + id).append('<p>' + 'Humidity: ' + data.daily[index].humidity + ' %' + '</p>')
            }
        })
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
                const newDay = (dayjs().add(1, 'day').format('YYYY-MM-DD') + ' 12:00:00');
                console.log(newDay);
                
                
            }
            else {console.log('not the same');}

            
            
            


        })
}

function removeAppend() {
    $('#currentDayInfo').empty();
    $('#currentInfo').empty();
  }
