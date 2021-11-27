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
        //   console.log(res.data);
          setCountries(res.data);
      })
      .then(() => setLoading(false))
      .catch((err) => {
          console.log(err);
      });  
  
  }, [] );

const My_Key = 'AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk';

const getCountry = countries.filter(country => country.name.common === name);

let languages = getCountry.map(country => !country.languages ? null : Object.keys(country.languages).length === 2 ? (', and the official languages are ' + Object.values(country.languages).join(' and ')) : Object.keys(country.languages).length > 2 ? (', and the official languages are ' + Object.values(country.languages).slice(0, -1).join(', ') + ', and '+ Object.values(country.languages).slice(-1)) : (', and the official language is ' + Object.values(country.languages).toString()) );

let population = getCountry.map(country => country.population === 0 ? 'no' : country.population);

let capital = getCountry.map(country => !country.capital ? null : country.capital.length === 2 ? (country.capital.join(' and ')) : country.capital.length > 2 ? country.capital.slice(0, -1).join(', ') + ', and '+ country.capital.slice(-1) : country.capital);

return (
    <>
    <button className="back-btn" onClick={goBack}>&#8592; Back</button>
    {loading ? <div style={{textAlign: 'center', marginTop: '30px'}}><h1>Loading...</h1></div> : (
        getCountry.map((country, index) => (
        <div key={index} className="description-container">
        <div className="description-txt">
        {country.name.official === country.name.common ? <h1>Learn more about {country.name.common} {country.flag}</h1> : <h1>Learn more about {country.name.official} ({country.name.common}) {country.flag}</h1>}
        {country.subregion ? <p><b>{country.name.common}</b> is a country in {country.subregion}{languages}.</p> : <p><b>{country.name.common}</b> is a country in {country.region}{languages}.</p>}
        {country.capital ? <p>With <b>{capital}</b> as capital, the country covers a total area of {country.area} km2 and has {population} inhabitants.</p> : <p>The country covers a total area of {country.area} km2 and has {population} inhabitants.</p>}
        </div>    
    <div id="map-container">
      <iframe id="frame" frameBorder="0" width="100%" src={`https://www.google.com/maps/embed/v1/place?key=${My_Key}&q=${country.latlng[0]},${country.latlng[1]}&zoom=6`}>
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
