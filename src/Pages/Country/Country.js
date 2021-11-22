import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import './Country.css';


const Country = () => {
    const {name} = useParams();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
      };

    useEffect(() => {
  
      axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
          console.log(res.data);
          setCountries(res.data);
      })
      .then(() => setLoading(false))
      .catch((err) => {
          console.log(err);
      });  
  
  }, [] );

const My_Key = 'AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk';

const getCountry = countries.filter(country => country.name.common === name);

let languages = getCountry.map(country => !country.languages ? null : Object.keys(country.languages).length >= 2 ? (<span>, and the official languages are {Object.values(country.languages).toString().split(',').join(', ')}</span>) : (<span>, and the official language is {Object.values(country.languages).toString()}</span>) )

return (
    <>
    <button className="back-btn" onClick={goBack}>&#8592; Back</button>
    {loading ? <div>Loading...</div> : (
        getCountry.map((country, index) => (
        <div key={index} className="description-container">
        {country.name.official === country.name.common ? <h1>Learn more about {country.name.common} {country.flag}</h1> : <h1>Learn more about {country.name.official} ({country.name.common}) {country.flag}</h1>}
        {country.subregion ? <p><b>{country.name.common}</b> is a country in {country.subregion}{languages}.</p> : <p><b>{country.name.common}</b> is a country in {country.region}{languages}.</p>}
        {country.capital ? <p>With <b>{country.capital}</b> as capital, the country covers a total area of {country.area} km2 and has {country.population} inhabitants.</p> : <p>The country covers a total area of {country.area} km2 and has {country.population} inhabitants.</p>}
            
    <div id="map-container">
      <iframe id="frame" frameBorder="0" width="100%" height="500px" src={`https://www.google.com/maps/embed/v1/place?key=${My_Key}&q=${country.latlng[0]},${country.latlng[1]}&zoom=6`}>
      </iframe>
    </div>
    
        </div>
    ))
    )
        }
    
    </>
)
}

export default Country;
