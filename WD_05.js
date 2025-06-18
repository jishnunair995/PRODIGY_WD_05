    const apiKey = "95c38d527e86f3cc74f4843f2ef88092"; // Replace with your OpenWeatherMap API key

    function displayWeather(data) {
      const weatherDiv = document.getElementById('weatherInfo');
      if (data.cod === 200) {
        weatherDiv.style.display = "block";
        weatherDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>${data.weather[0].main} - ${data.weather[0].description}</strong></p>
          <p>🌡️ Temperature: ${Math.round(data.main.temp)}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
        `;
      } else {
        weatherDiv.style.display = "block";
        weatherDiv.innerHTML = `<p>⚠️ ${data.message}</p>`;
      }
    }

    function getWeatherByCity() {
      const city = document.getElementById('cityInput').value;
      if (!city) {
        alert("Please enter a city name!");
        return;
      }
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
          console.error("Error:", error);
        });
    }

    function getWeatherByLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => {
              console.error("Error:", error);
            });
        }, () => {
          alert("Unable to retrieve your location.");
        });
      } else {
        alert("Geolocation not supported by your browser.");
      }
    }