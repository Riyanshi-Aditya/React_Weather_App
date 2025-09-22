import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_img from "../assets/search_img.png";
// import sun_img from "../assets/sun_img.png";
import humidity_img from "../assets/humidity_img.png";
import wind_speed from "../assets/wind_speed.png";
import broken_clouds from "../assets/broken_clouds.png";
import clear_sky_night from "../assets/clear_sky_night.png";
import clear_sky from "../assets/clear_sky.png";
import few_clouds_day from "../assets/few_clouds_day.png";
import few_clouds_night from "../assets/few_clouds_night.png";
import mist from "../assets/mist.png";
import rain_night from "../assets/rain_night.png";
import rain_day from "../assets/rain_day.png";
import scattered_clouds from "../assets/scattered_clouds.png";
import shower_rain from "../assets/shower_rain.png";
import snow from "../assets/snow.png";
import thunderstorm from "../assets/thunderstorm.png";
import { useRef } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_sky,
    "01n": clear_sky_night,
    "02d": few_clouds_day,
    "02n": few_clouds_night,
    "03d": scattered_clouds,
    "03n": scattered_clouds,
    "04d": broken_clouds,
    "04n": broken_clouds,
    "09d": shower_rain,
    "09n": shower_rain,
    "10d": rain_day,
    "10n": rain_night,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_sky;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // add your "city" name to show it by default
    // search("");
  }, []);

  return (
    <div className="weather">
      <div className="search-Bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(inputRef.current.value);
            }
          }}
        />
        <img
          src={search_img}
          alt=""
          style={{ width: "45px", height: "45px" }}
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}&deg;c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img
                src={humidity_img}
                alt=""
                style={{ width: "45px", height: "45px" }}
              />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img
                src={wind_speed}
                alt=""
                style={{ width: "45px", height: "45px" }}
              />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
