import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const My_Key = 'AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk';

return (
    <>
    <button className="back-btn" onClick={goBack}>&#8592; Back</button>
    {loading ? <div>Loading...</div> : (
        countries.filter(country => country.name === name).map((country, index) => (
        <div key={index} className="description-container">
            {/* <h1>{country.altSpellings[1]}</h1> */}
            <p><b>{country.name}</b> is a country in {country.subregion}, and the official language is {country.languages[0].name}.</p>
            <p>With <b>{country.capital}</b> as capital, the country covers a total area of {country.area} km2 and has {country.population} inhabitants.</p>
            
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
