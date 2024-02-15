import { useState } from 'react'
import './Weather.css'
import PropTypes from 'prop-types'



const api = {

  key: "9736c9c355f2a6a86349b4328d921092",

  base: "https://api.openweathermap.org/data/2.5/"

}

const Weather = ({ darkMode }) => {

  const [city, setCity] = useState("")
  const [result, setResult] = useState("")



  const search = evt => {
    evt.preventDefault();
    if (evt.key === "Enter" || evt.type === "click") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setResult(result);
          setCity('');
          console.log(result);
        });
    }
  }

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };


  return (

    <div className={`All ${darkMode ? "dark" : "light"}`}>

      <div className="search-box">

        <input
          className={`search-bar ${darkMode ? 'dark' : 'light'}`}
          type="text"
          onChange={e => setCity(e.target.value)}
          placeholder='search'
          value={city}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              search(e);
            }
          }}

        />

        <button className={`button ${darkMode ? 'dark' : 'light'}`} type='submit' onClick={search}>search</button>

      </div>

      {result.main && (

        <div className={`effect ${darkMode ? 'dark' :'light'}`}>

          <div className={`date ${darkMode ? 'dark' :'light'}`}>
            <p>Date:</p>
            {dateBuilder(new Date())}
          </div>

          <div className={`location ${darkMode ? 'dark' :'light'}`}>
            <p>Location:</p>
            {result.name}, {result.sys.country}
          </div>




          <div className={`temp ${darkMode ? 'dark' :'light'}`}>
            <p>Temperature:</p>
            {Math.round(result.main.temp)}°c
          </div>


          <div className={`weather-type ${darkMode ? 'dark' :'light'}`}>
            <div className="weather">
              {/* {result.weather[0].main === 'Clear' && (
                  <img src='/public/img/icons8-cloud-100.png' alt="Cloudy" />
                )} */}
              <p>
                Weather Type:
              </p>
              {result.weather[0].description}

            </div>
          </div>



          <div className={`wind ${darkMode ? 'dark' :'light'}`}>
            <p>Wind Speed: </p>
         
              {result.wind.speed} KM/H
           
          </div>

          <div className={`humidity ${darkMode ? 'dark' :'light'}`}>
            <p>Humidity :</p>
            {result.main.humidity}%
          </div>


        </div>
      )}

    </div>

  )

}

Weather.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};



export default Weather




