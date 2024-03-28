import React, { useEffect, useState } from 'react'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import searchIcon from '../Assets/search.png'
import wind from '../Assets/wind.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import "./weatherApp.css"
import useGoogleMapApi from '../googleMap'
import { Autocomplete } from '@react-google-maps/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Donut from './Graph'


const HomePage = () => {
  const { isLoaded } = useGoogleMapApi()

  let weatherApi = "9e6f3c991f66cf1cbbb332fd166d3feb"
  const [wIcon, setwIcon] = useState(cloud)


  const [location, setLocation] = useState()
  const [values,setvalue]=useState()

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")

    if (element[0].value === "") {

      return 0
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${weatherApi}`
    let response = await fetch(url)
    let data = await response.json()
    if (data.cod == "404") {
      return toast.error("This location is not available")
    }
    setvalue(data)



    let humidity = document.getElementsByClassName("humidity-percentage")
    let wind = document.getElementsByClassName("wind-rate")
    let temperature = document.getElementsByClassName("weather-temp")
    let location = document.getElementsByClassName("weather-location")
    let type = document.getElementsByClassName("weather-type")
 
    humidity[0].innerHTML = data?.main.humidity + "%"
    type[0].innerHTML=data.weather[0]?.description
    wind[0].innerHTML = Math.floor(data?.wind?.speed) + "km/h"
    temperature[0].innerHTML = Math.floor(data?.main?.temp) + "°c";
    location[0].innerHTML = data?.name
   



    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setwIcon(clear)
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setwIcon(cloud)

    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setwIcon(cloud)

    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setwIcon(drizzle)

    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setwIcon(drizzle)

    }
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setwIcon(rain)

    }
    else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setwIcon(snow)

    } else {
      setwIcon(clear)
    }



  }



  // googleMap logic

  const handleAutoComplete = (id, setValue) => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementsByClassName(id),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setValue(place.name);
      });
    }
  };
  useEffect(() => {
    handleAutoComplete("cityInput", setLocation);
  }, [isLoaded]);

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="top-bar">
            {/* gooogle map logic start */}
            {isLoaded && (
              <Autocomplete>
                <input
                  type="text"
                  className="cityInput"
                  placeholder="Any location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}

                />
              </Autocomplete>
            )}
            {/* google map logic enc */}
            <div className="search-icon" onClick={() => { search() }}>

              <img src={searchIcon} alt="search" />
            </div>
          </div>
          <div className="weather-image">
            <img src={wIcon} alt="weather" />
          </div>
              <div className="weather-type">--</div>
          <div className="weather-temp">--</div>
          <div className="weather-location">Enter location</div>

        
          <div className="data-container">
            <div className="element">
              <img src={humidity} alt="" />
              <div className="data">
                <div className="humidity-percentage">--</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind} alt="" />
              <div className="data">
                <div className="wind-rate">--</div>
                <div className="text">wind speed</div>
              </div>
            </div>

            <div className='chart'>
            <Donut data={values}/>
            </div>

          </div>
          

        </div>
      </div>
    </>
  )
}

export default HomePage
