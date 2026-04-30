import { useEffect, useState } from "react";
import styles from './App.module.css'
import {Sun} from './assets/icons/sun'
import {Rain} from './assets/icons/rain'
import {Snow} from './assets/icons/snow'
import {Showers} from './assets/icons/showers'
import {Thunder} from './assets/icons/thunder'

export default function App() {
    const [weatherForecast, setWeatherForcast] = useState<any>()

    const getWeatherCode = (numberCode: number) => {
      if (numberCode <= 29) {
        return "SUN"
      }

      if (numberCode > 29 && numberCode <= 69) {
        return "RAIN"
      }

      if (numberCode > 59 && numberCode <= 79) {
        return "SNOW"
      }

      if (numberCode > 79 && numberCode <= 90) {
        return "SHOWERS"
      }

      if (numberCode > 90) {
        return "THUNDER"
      }
    }

    const getWeatherName = (weatherCode: string) => {
      if (weatherCode <= "SUN") {
        return "Sunny"
      }

      if (weatherCode <= "RAIN") {
        return 'Light Rain'
      }

      if (weatherCode <= "SNOW") {
        return "Snow"
      }

      if (weatherCode <= "SHOWERS") {
        return "Heavy Showers"
      }

      if (weatherCode <= "THUNDER") {
        return "Thunder Showers"
      }
    }

    const getWeatherIcon = (weatherCode: string) => {
      if (weatherCode <= "SUN") {
        return <Sun/>
      }

      if (weatherCode <= "Light Rain") {
        return <Rain/>
      }

      if (weatherCode <= "SNOW") {
        return <Snow/>
      }

      if (weatherCode <= "SHOWERS") {
        return <Showers/>
      }

      if (weatherCode <= "THUNDER") {
        return <Thunder/>
      }
    }

    const getWeatherForcast = async (value: string) => {
      const searchUrl: string = `https://geocoding-api.open-meteo.com/v1/search?count=10&name=${value || 'Calgary'}`
      const searchResponse: any = await fetch(searchUrl);
      const searchData: any = await searchResponse.json();

      const forecastUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${searchData.results[0].latitude}&longitude=${searchData.results[0].longitude}&forecast_days=7&daily=weather_code,temperature_2m_max,temperature_2m_min`;
      const forecastResponse: any = await fetch(forecastUrl);
      const forecastData: any = await forecastResponse.json();

      setWeatherForcast(forecastData)
    }
  
    useEffect(() => {
      getWeatherForcast()
    }, [])
  
    return (
      <div className={styles.container}>
        <div>Search For Your City:</div>
        <div><input onChange={(event: any) => getWeatherForcast(event.target.value)}/></div>
        <div style={{display: "flex"}}>
          {weatherForecast && weatherForecast.daily && weatherForecast.daily.time && weatherForecast.daily.time.map((date: string, i: number) => {
            const weatherCode = getWeatherCode(weatherForecast.daily.weather_code[i])

            return <div style={{padding: "10px"}}>
                <div>{date}</div>
                <div>                
                  {getWeatherIcon(weatherCode)}
                </div>
                {getWeatherName(weatherCode)}

                <div>High: {weatherForecast.daily.temperature_2m_max[i]}{weatherForecast.daily_units.temperature_2m_max}</div>
                <div>Low: {weatherForecast.daily.temperature_2m_min[i]}{weatherForecast.daily_units.temperature_2m_min}</div>
              </div>
          })}
        </div>
      </div>
    );
}
