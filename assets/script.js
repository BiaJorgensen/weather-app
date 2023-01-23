// Open Weather Map's API key
const APIKey = "f3590b94654981da9b8d1099d19b0979";

// Wrapping functions to only start after the document is ready
$(function() {
    showSearchedCities();
    // Function is called when search button is clicked 
    $('#search').click(function (e) { 
        e.preventDefault();
        showMainPage();
        removeAppend();
        // Variable to hold name of city on search box
        const city = $('#citySearch').val();
        // If the city is not blank, function showCurrentWeather is called using the city name as a parameter
        if (city) {
            showCurrentWeather(city);   
        }
        // If the city name is blank, it goes back to initial page and shows alert
        else {
            showSearchedCities();
            $('#mainPage').hide();
            // jquery-confirm alert
            $.alert({
                title: 'City cannot be blank',
                content: 'Please try again',
            });
        }
    });
    // Function is called when any of the created lis for the searched cities is clicked
        $(document).on('click', 'li', function(e){
            e.preventDefault; 
            showMainPage()
            removeAppend();
            // Variable to hold name of city in the li that is clicked
            const city = $(this).text();
            // Function showCurrentWeather is called using the city name on li as a parameter
            showCurrentWeather(city);
        })      
})

// Function to show the current weather
function showCurrentWeather(city) {
    // Variable to hold the API link - link changes according to city name
    const queryURLcurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    fetch(queryURLcurrent)
    // Fetch URL's response
        .then(function(response) {
            // If status code is different than 200 (OK), goes back to initial page only showing search box, searched cities if any and an alert
            if (response.status !== 200) {
                $('#mainPage').hide();
                showSearchedCities();
                $.alert({
                    title: 'City not recognized',
                    content: 'Please try again',
                });
            }
            // If status code is 200 (OK), returns response in JSON format
            return response.json();
        })
        // Using JSON response to fetch data
        .then(function (data) {
            // Variable to get all searched cities if any from local storage
            const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
            // Only adds name of searched city to variable if the name is not yet saved - this avoids duplicates
            if (!searchedCities.includes(data.name)) {
                searchedCities.push(data.name)
            }
            // Variables to hold coordinates of searched cities
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            // Saving searcher cities and coordinates in local storage
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
            showSearchedCities() 
            localStorage.setItem('lat', JSON.stringify(lat));
            localStorage.setItem('lon', JSON.stringify(lon));
            // Variable to hold the code for the weather icon
            const icon = data.weather[0].icon
            // Variable to hold link to access png of weather icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // Creating, adding text and appending city's name with current day, icon that represents the weather, temperature,
            // wind speed and humidity to currentInfo div
            $('#currentInfo').append('<h2>' + data.name + ' ' + dayjs().format('MM/DD/YY') + '</h2>');
            $('#currentInfo').append("<img src='"+ iconURL + "'></img>")
            $('#currentInfo').append('<p>' + 'Temperature: ' + data.main.temp + '°F' + '</p>');
            $('#currentInfo').append('<p>' + 'Wind: ' + data.wind.speed + ' MPH' + '</p>');
            $('#currentInfo').append('<p>' + 'Humidity: ' + data.main.humidity + ' %' + '</p>');
            // ShowForecastWeather function is only called after showCurrentWeather because it needs coordinates fetched from queryURLcurrent
            showForecastWeather(); 
          });
}

// Function to show forecast weather
function showForecastWeather() {
    // Variables to get coordinates of searched city from local storage
    const lat = JSON.parse(localStorage.getItem('lat'));
    const lon = JSON.parse(localStorage.getItem('lon'));
    // Variable to hold the API link - link changes according to coordinates
    const oneCallForecastURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial" + "&appid=" + APIKey;
    // Fetch URL's response
    fetch(oneCallForecastURL)
    // Returns response in JSON format to extract data
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            // Loop to do appendForecastInfo for data objects from index 1 to 5 (representing five future days)
            for (let i = 1; i<=5; i++) {
                appendForecastInfo(i, i)
            }
            // Funtion to create, add text and append future days, icon that represents the weather, temperature,
            // wind speed and humidity to currentInfo div
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
// Shows searched cities on initial page if there are any
function showSearchedCities() {
    const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    // Adds citie's names on page (new ones go on top)
    for (let i = 0; i < searchedCities.length; i++) {
        $('#citiesList').prepend('<li>' + searchedCities[i] + '</li>')
    }
}

// Function to remove JS created elements to avoid duplicates when functions to created them are called again
function removeAppend() {
    $('#currentInfo').empty();
    for (let id = 1; id<=5; id++) {
        $('#day-' + id).empty()
    };
    $('#citiesList').empty()
  }
// Shows main page with current and forecast weather for searched city
  function showMainPage() {
    $('#mainPage').show()
  }
