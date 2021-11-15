import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Country.css';


const Country = () => {
    const {name} = useParams();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

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

const MY_API = 'AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk';

return (
    <>
    {loading ? <div>Loading...</div> : (
        countries.filter(country => country.name.common === name).map((country, index) => (
        <div key={index}>
            <h1>{country.name.common}</h1>
            
            <div id="wrap">
      <iframe id="frame" frameBorder="0" width="100%" height="700px" src={`https://www.google.com/maps/embed/v1/place?key=${MY_API}&q=${country.latlng[0]},${country.latlng[1]}&zoom=6`}>
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
