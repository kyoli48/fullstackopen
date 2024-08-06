const Countries = ({ countriesToShow }) =>
    countriesToShow.length > 10
        ?   (<p>Too many countries, specify another filter</p>)
        :   (<ul>
            {countriesToShow.map((c, i) =>
                <li key={i}>

                <h1>{c.name.common}</h1>
                <p><b>capital</b> {c.capital}</p>
                <p><b>area</b> {c.area}</p>
                <b>languages:</b>

                {c.languages
                    ? (<ul>
                    {Object.values(c.languages).map((l, index) =>
                        <li key={index}>{l}</li>
                    )}
                    </ul>)
                    : (<div>No languages available</div>)
                }

                <img src={c.flags.svg} alt={c.flags.alt} />
                </li>
            )}
            </ul>)

export default Countries