import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
axios
.get('https://restcountries.com/v2/all')
.then((res) => {
    console.log(res.data);
    setCountries(res.data);
})
.then(() => setLoading(false))
.catch((err) => {
    console.log(err);
});
}, [] );

return ( 
    <div className="countries-container">
{loading ? <div>Loading...</div> : (countries.map(country => 
<div key={country.name} className="country-card">
<img src={country.flag} alt={country.name} className="flag-img" />
<h1>{country.name}</h1>
<p><b>Population:</b> {country.population}</p>
<p><b>Region:</b> {country.region}</p>
<p><b>Capital:</b> {country.capital}</p>
</div>
)
)  }
    </div>
)

};

export default HomePage;
