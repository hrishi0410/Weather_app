import axios from 'axios';
import React, { useState } from 'react';

export default function Weather() {
  // State Variables
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // API Key
  const apiKey = '150cc73b3fa6f1c019afaf40329f6ec5';

  // Input Change Handler
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setError(''); // Clears any previous error messages.
  };

  // Fetch Weather Function
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log('Error fetching weather data', error);
      setWeather(null);
      setError('City not found or unable to fetch weather.');
    }
  };

  // Button Click Handler
  const handleClick = () => {
    if (city.trim() !== '') {
      fetchWeather();
    } else {
      setError('Please enter a city name.'); 
    }
  };

  // Temperature Conversion
  const getCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  // JSX Rendering
  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} 
      {weather && (
        <div className="weather-info" style={{ marginTop: '20px' }}>
          <h3>{weather.name}</h3>
          <p>Temperature: {getCelsius(weather.main.temp)} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}