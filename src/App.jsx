import React, { useState } from "react";
import "./App.css";

const API_KEY = "6a6d0e638b4b64c7ee3613e7e59ce726";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="weather-box">
        {/* Theme Toggle */}
        <div className="toggle-row">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <h1 className="title">Weather App</h1>

        {/* Search Form */}
        <form onSubmit={fetchWeather} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit">Search</button>
        </form>

        {/* Weather Info */}
        {weather && (
          <div className="weather-info">
            <div className="weather-main">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].main}
              />
              <div>
                <h2>{weather.name}</h2>
                <p>{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="weather-details">
              <p>
                <span className="temp">{Math.round(weather.main.temp)}</span>°C
              </p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} km/h</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
