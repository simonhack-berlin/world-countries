import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import Button from '../../Components/Button';

const HomePage = () => {
const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(true);
const [countryName, setCountryName] = useState("");
const [region, setRegion] = useState("");

const API = 'https://restcountries.com/v3.1/all';

useEffect(() => {

        axios
        .get(API)
        .then((res) => {
            // console.log(res.data);
            setCountries(res.data);
        })
        .then(() => setLoading(false))
        .catch((err) => {
            console.log(err);
        });  
    
}, [] );

const contryNameOnChange = (event) => {
    //console.log(event.target.value);
    setCountryName(event.target.value);
};

const contryRegionOnChange = (event) => {
   // console.log(event.target.value);
    setRegion(event.target.value);
};

const filteredByName =  countries.filter((country) =>{
    if (country.name.common.toLowerCase().includes(countryName.toLowerCase())) {
        return country;
    }
 });

 const filteredByRegion = countries.filter((country) =>{
     if (country.region.toLowerCase().includes(region.toLowerCase())) {
         return country;
     }
 });

return ( 
    <>
    <form className="input-container">
    <input 
    className="search-bar"
    type="text" 
    placeholder="search for a country..." 
    onChange={contryNameOnChange}
    />
    <select className="select-container" onChange={contryRegionOnChange}>
        <option value="">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
    </select>
    </form>
    <div className="countries-container">
{loading ? <div style={{textAlign: 'center'}}><h1>Loading...</h1></div> : countryName ? (
    filteredByName
    .map(country =>
    
<div key={country.name.common} className="country-card">
    <img src={country.flags.png} alt={country.name.common} className="flag-img" />
    <div className="country-name">
        <h1>{country.name.common}</h1>
    </div>
    <div className="country-details">
        <p><b>Region:</b> {country.region}</p>
        {country.capital ? <p><b>Capital:</b> {country.capital.join(', ')}</p> : <p><b>Capital:</b> No capital</p>}
        <p><b>{country.independent ? 'Independent' : 'Not independent' }</b></p>
    </div>
    <Button link={`/${country.name.common}`}>More Details</Button>
</div>
  
    )
    ) : region ? (
        filteredByRegion
        .map(country =>

<div key={country.name.common} className="country-card">
    <img src={country.flags.png} alt={country.name.common} className="flag-img" />
    <div className="country-name">
        <h1>{country.name.common}</h1>
    </div>
    <div className="country-details">
        <p><b>Region:</b> {country.region}</p>
        {country.capital ? <p><b>Capital:</b> {country.capital.join(', ')}</p> : <p><b>Capital:</b> No capital</p>}
        <p><b>{country.independent ? 'Independent' : 'Not independent' }</b></p>
    </div>
    <Button link={`/${country.name.common}`}>More Details</Button>
</div>

    )
    ) : countries
    .map(country =>

<div key={country.name.common} className="country-card">
    <img src={country.flags.png} alt={country.name.common} className="flag-img" />
    <div className="country-name">
        <h1>{country.name.common}</h1>
    </div>
    <div className="country-details">
        <p><b>Region:</b> {country.region}</p>
        {country.capital ? <p><b>Capital:</b> {country.capital.join(', ')}</p> : <p><b>Capital:</b> No capital</p>}
        <p><b>{country.independent ? 'Independent' : 'Not independent' }</b></p>
    </div>
    <Button link={`/${country.name.common}`}>More Details</Button>
</div>

    )
 }
    </div>
    </>
)
}

export default HomePage;
