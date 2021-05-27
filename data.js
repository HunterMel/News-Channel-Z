const apiKey = '631b54059a7685cd2a3b02d495ec1018'
//api call for weather ??


//form variables
// var cityFormEl = document.querySelector("#city-form");
// var cityInputEl = document.querySelector("#city");

const inputEl = $("#city");
const searchEl = $("#searchButton");

function searchFunction1() {
    const cityName = inputEl.val();

    getCityData(cityName)

}

function addtotextbox(id) {
    $('#city').val(recentSearches[id]);
    console.log(recentSearches[id]);
}

var recentSearches = []; // create an empty javascript array

searchEl.on("click", searchFunction1)

//get current weather by City unique Id
//5 day forecast/future conditions call is displayed 
//display current date, temp, wind, humidity, UV index and city name using server APIs
// function runWeather(data) {

//     //const inputEl = document.getElementById("city-search");
//     const inputEl = $("#city-search");
//     //element to search for history
//     //const searchEl = document.getElementById("search-btn");
//     const searchEl = $("#search-btn");
//     //button to clear history
//     //const clearEl = document.getElementById("clear-btn");
//     const clearEl = $("#clear-btn");
//     //const cityNameEl = document.getElementById("city-name");
//     const cityNameEl = $("#city-name");
//     //const weatherIcon = document.getElementById("icon");
//     const weatherIcon = $("#icon");
//     // const tempEl = document.getElementById("temperature");
//     const tempEl = $('#temperature');
//     tempEl.text("temperature: " + data.main.temp);


//     const windEl = $("#wind-speed");
//     windEl.text("wind-speed: " + data.wind.speed);
//     const humidityEl = $("#humidity");

//     const uvEl = $("#UV-index");
//     // tempEl.textContent = "New value"




// }

//display current temp
var getCityData = function (city) {
    const apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=631b54059a7685cd2a3b02d495ec1018";

    // JS fetch vs ajax
    //make a request to url
    // fetch(apiWeather).then(function (response) {
    //     console.log(response);
    //     response.json().then(function (weather) {
    //         console.log(weather);
    //     });
    // });

    // $.ajax({
    //     url: apiWeather,
    //     success: function(data) {
    //         console.log(data)
    //     }, 
    // })

    $.get(apiWeather, function (data) {
        console.log(data)

        // start rendering data for current weather
        const cityH3El = $('#currentCity');
        const tempH4El = $('#currentTemp');
        const windH4El = $('#currentWind');
        const humidityH4El = $('#currentHumidity');
        const indexH4El = $('#currentIndex');


        cityH3El.text(data.name)
        tempH4El.text("Temperature: " + data.main.temp + "K")
        windH4El.text("Wind: " + data.wind.speed + "mph")
        humidityH4El.text("Humidity: " + data.main.humidity + "%")
        indexH4El.text("Index")


        const apiWeatherFor5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=631b54059a7685cd2a3b02d495ec1018";

        $.get(apiWeatherFor5Day, function (fiveDayData) {
            console.log(fiveDayData)

            const tempDay1El = $('#tempDay1')
            const tempDay2El = $('#tempDay2')
            const tempDay3El = $('#tempDay3')
            const tempDay4El = $('#tempDay4')
            const tempDay5El = $('#tempDay5')

            tempDay1El.text("Temperature: " + fiveDayData.list[0].main.temp)
            tempDay2El.text("Temperature: " + fiveDayData.list[8].main.temp)
            tempDay3El.text("Temperature: " + fiveDayData.list[15].main.temp)
            tempDay4El.text("Temperature: " + fiveDayData.list[23].main.temp)
            tempDay5El.text("Temperature: " + fiveDayData.list[31].main.temp)
        })

        searchFunction();
    })



    // function addtotextbox(id) {
    //   $('#city').val(recentSearches[id]);
    // console.log(recentSearches[id]);
    //  }
    //this function is called using the search buttons "onclick"
    function searchFunction(data) {
        recentSearches.push($('#city').val()); // This line puts the value from the text box in an array
        console.log($('#city').val());
        $('#city').val(""); //  clear the text box after search
        $('#searchHistory').text(""); //clear the seach history window then repopulate with the new array

        // the function below loops through the array and adds each item in the array
        // to the span element within the Search history arear
        $.each(recentSearches, function (index, value) {
            $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox(" + index + ")'>" + value + '</li>');
        });
    }


};

//get value from city input
// var formSubmitHandler = function (event) {
//     event.preventDefault();
//     //get value from input element
//     var city = cityInputEl.value.trim();

//     if (city) {
//         getCityData(city);
//         cityInputEl.value = "";
//     } else {
//         alert("Please enter a city name");
//     }
// }
// cityFormEl.addEventListener("submit", formSubmitHandler);

//fetch data from api
// fetch("http://api.openweathermap.org").then(function(response) {
//     console.log("inside", response);
// });

// console.log("outside");
