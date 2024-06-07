const apiKey = 'd733171a393f28330560a3aac9e5f1ee';
const inputElement = document.getElementById('inputElement');
let spinnerEl = document.getElementById("spinner");

//Initially set Hyderabad location
inputElement.value = 'Hyderabad';

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {            
            displayWeather(data);           
        })
        .catch(error => {
            spinnerEl.classList.add('spin');
            document.getElementById('weather').innerHTML = '<p>Error fetching weather data.</p>';           
        });
    inputElement.value="";
}
fetchWeather(inputElement.value);

document.getElementById('getData').addEventListener('click', () => {
    
    const city = inputElement.value;
    if (city) {
       spinnerEl.classList.remove('spin');
        fetchWeather(city);
    } else {
        
        alert('Please enter a city name.');
    }
});

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data.cod === 200) {
        spinnerEl.classList.add('spin');
        const temperature = (data.main.temp - 273.15).toFixed(2); 
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherDiv.innerHTML = `
            <div class="city">
                <h1>Weather Details</h1>
                <p><strong>${data.name}</strong></p>
                <p>Temperature: ${temperature} °C --- <i class="fa-solid fa-temperature-three-quarters"></i></p>
                <p>Weather: ${weatherDescription} --- <i class="fa-solid fa-cloud"></i></p>
                <p>Humidity: ${humidity}% --- <i class="fa-solid fa-water"></i></p>
                <p>Wind Speed: ${windSpeed} m/s --- <i class="fa-solid fa-wind"></i></p>
            </div>
            `;
    } else {
        spinnerEl.classList.add('spin');
    
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}

