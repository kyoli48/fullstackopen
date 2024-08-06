import { useState } from "react"

const Country = ({ country }) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)

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