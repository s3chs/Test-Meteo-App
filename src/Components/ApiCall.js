import React, { useEffect, useState } from "react";
import "./ApiCall.css";

export default function ApiCall() {
  // Weather state where we are storing our data //
  const [weatherData, setWeatherData] = useState(null);
  // Search input state where we are storing the input value //
  const [searchWeather, setSearchWeather] = useState(10);

  // API call done after the component is mounted, we only call it once for performance efficiency //
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=Paris&units=metric&cnt=7&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Declaring formatting options for dates //
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        // Formatting date accordingly and adding a new key to our data object //
        for (let i = 0; i < data.list.length; i++) {
          const dateKey = new Date(data.list[i].dt * 1000);
          const newDate = dateKey.toLocaleDateString("fr-FR", options);
          data.list[i].newDateFormatted = newDate;
        }
        // SetState of the weather data //
        setWeatherData(data);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  // Function where we set the input value to our searchWeather state //
  const filterTemp = (event) => {
    setSearchWeather(event.target.value);
  };

  return (
    <div className="global-container">
      <div className="content-container">
        <p className="title">Weather Forecast</p>
        <p className="app-info">next 7 days</p>

        <div className="search-container">
          <div className="weather-search-details">
            <p className="detail-info white">min temp</p>
            <p className="blue-txt">{searchWeather}°</p>
          </div>
          <div className="search-input-container">
            <input
              className="search-input"
              onChange={(e) => filterTemp(e)}
              id="temp"
              name="temp"
              type="range"
              min="0"
              max="25"
              value={searchWeather}
            />
          </div>
        </div>
        {/* Mapping the weatherData and applying dynamic filter to it so our data does not disappear once filter is applied/changed */}
        {weatherData &&
          weatherData.list
            .filter((val) => {
              return val.temp.min > searchWeather;
            })
            .map((val, index) => (
              <div className="weather-container" key={index}>
                <div className="weather-info">
                  <img
                    src={`http://openweathermap.org/img/w/${val.weather[0].icon}.png`}
                    alt="weather-icon"
                  />
                  <div className="weather-date">
                    <p className="date">
                      {val.newDateFormatted.split(" ")[0].substr(0, 3)}.
                    </p>
                    <p className="date big">
                      {val.newDateFormatted.split(" ")[1]}
                    </p>
                    <p className="date">{val.newDateFormatted.split(" ")[2]}</p>
                  </div>
                </div>

                <div className="weather-details">
                  <div className="weather-stat">
                    <p className="detail-info">min temp</p>
                    <p className="blue-txt">{val.temp.min}° </p>
                  </div>
                  <div className="weather-stat">
                    <p className="detail-info">chance of rain</p>
                    <p className="blue-txt">{val.pop * 100}% </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
