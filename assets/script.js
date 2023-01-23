
const APIKey = "f3590b94654981da9b8d1099d19b0979";


$(function() {
    showSearchedCities() 
    $('#search').click(function (e) { 
        e.preventDefault();
        removeAppend()
        const city = $('#citySearch').val();
        // localStorage.setItem('city', JSON.stringify(city));
        // const getCity = JSON.parse(localStorage.getItem('city'))
        if (city) {
            // console.log(getCity);
            showCurrentWeather(city);
            
            
            
        }
        else {
            console.log('false');
        }
    });
    
    $('li').each(function() {
        $(this).click(function (e) { 
            e.preventDefault; 
            removeAppend();
            const city = $(this).text();
            console.log(city);
            showCurrentWeather(city);
    
        })


    })  
   


})



function showCurrentWeather(city) {
    // const city = JSON.parse(localStorage.getItem('city'))
    const queryURLcurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    fetch(queryURLcurrent)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
            if (!searchedCities.includes(data.name)) {
                searchedCities.push(data.name)
            }
            
            
            const lat = data.coord.lat;
            const lon = data.coord.lon
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
            showSearchedCities() 
            localStorage.setItem('lat', JSON.stringify(lat));
            localStorage.setItem('lon', JSON.stringify(lon));


            console.log(data);
            const icon = data.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          
            console.log(data.name);
            $('#currentDayInfo').append('<h2>' + data.name + ' ' + dayjs().format('MM/DD/YY') + '</h2>');
            $('#currentDayInfo').append("<img src='"+ iconURL + "'></img>")
            $('#currentInfo').append('<p>' + 'Temperature: ' + data.main.temp + '°F' + '</p>');
            $('#currentInfo').append('<p>' + 'Wind: ' + data.wind.speed + ' MPH' + '</p>');
            $('#currentInfo').append('<p>' + 'Humidity: ' + data.main.humidity + ' %' + '</p>');
            showForecastWeather();
            
          });
}

function showForecastWeather() {
    const lat = JSON.parse(localStorage.getItem('lat'));
    const lon = JSON.parse(localStorage.getItem('lon'));
    const oneCallForecastURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial" + "&appid=" + APIKey;
    fetch(oneCallForecastURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
           
            
            for (let i = 1; i<=5; i++) {
                appendForecastInfo(i, i)
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
                $('#day-' + id).append('<p>' + 'Temp: ' + data.daily[index].temp.day + '°F' + '</p>');
                $('#day-' + id).append('<p>' + 'Wind: ' + data.daily[index].wind_speed + ' MPH' + '</p>');
                $('#day-' + id).append('<p>' + 'Humidity: ' + data.daily[index].humidity + ' %' + '</p>');
            }
        })
}

function showSearchedCities() {
    const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    for (let i = 0; i < searchedCities.length; i++) {
        $('#citiesList').prepend('<li>' + searchedCities[i] + '</li>')
    }
}


function removeAppend() {
    $('#currentDayInfo').empty();
    $('#currentInfo').empty();
    for (let id = 1; id<=5; id++) {
        $('#day-' + id).empty()
    };
    $('#citiesList').empty()
  }
