import { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({ country }) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)

    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=d95af6b6b3657fee391f300d5fa0d8ee`)
          .then(response => setWeather(response.data))
      }, [])

    return (
        <li>

            <h1>{country.name.common}</h1>

            <button onClick={toggleShow}>{show ? "hide" : "show"}</button>

            {show && (
                <>
                    <p><b>capital</b> {country.capital}</p>
                    <p><b>area</b> {country.area}</p>
                    <b>languages:</b>

                    {country.languages
                        ? (<ul>
                        {Object.values(country.languages).map((l, index) =>
                            <li key={index}>{l}</li>
                        )}
                        </ul>)
                        : (<div>No languages available</div>)
                    }

                    <img src={country.flags.svg} alt={country.flags.alt} />

                    <h2>Weather in {country.capital}</h2>
                    <p>temperature {weather.current.temp}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} />
                    <p>wind speed {weather.current.wind_speed} m/s</p>
                </>
            )}

        </li>
    )

}

const Countries = ({ countries }) => (
    countries.length > 10
    ?   (<p>Too many countries, specify another filter</p>)
    :   (<ul>
            {countries.map((country) => 
                <Country key={country.cca3} country={country} />
            )}
        </ul>)
)

export default Countries