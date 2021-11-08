import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(true);
const [countryName, setCountryName] = useState("");

useEffect(() => {
    if (countryName) {
axios
.get(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
.then((res) => {
    console.log(res.data);
    setCountryName(res.data);
})
.then(() => setLoading(false))
.catch((err) => {
    console.log(err);
});
    } else {
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
    }
}, [] );

const contryOnChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value);
};

return ( 
    <>
    <form className="input-container">
    <input 
    className="search-bar"
    type="text" 
    placeholder="search for a country..." 
    onChange={contryOnChange}
    />
    </form>
    <div className="countries-container">
{loading ? <div>Loading...</div> :  (
    countries.filter((country) =>{
       if (country.name.toLowerCase().includes(countryName.toLowerCase())) {
           return country
       }
    })
    .map(country =>
        <div className="country-card">
<img src={country.flag} alt={country.name} className="flag-img" />
<h1>{country.name}</h1>
<p><b>Population:</b> {country.population}</p>
<p><b>Region:</b> {country.region}</p>
<p><b>Capital:</b> {country.capital}</p>
</div>
    )
    )
 }
    </div>
    </>
)

};

export default HomePage;
