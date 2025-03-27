import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import "./Country.css";

const Country = () => {
  const { countryCode } = useParams();
  const [country, setCounty] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/alpha/" + countryCode)
      .then((res) => {
        // console.log(res.data);
        setCounty(res.data[0]);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, [countryCode]);

  const My_Key = "AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk";

  let languages = !country.languages
    ? null
    : Object.keys(country.languages).length === 2
    ? ", and the official languages are " +
      Object.values(country.languages).join(" and ")
    : Object.keys(country.languages).length > 2
    ? ", and the official languages are " +
      Object.values(country.languages).slice(0, -1).join(", ") +
      ", and " +
      Object.values(country.languages).slice(-1)
    : ", and the official language is " +
      Object.values(country.languages).toString();

  let population = country.population === 0 ? "no" : country.population;

  let capital = !country.capital
    ? null
    : country.capital.length === 2
    ? country.capital.join(" and ")
    : country.capital.length > 2
    ? country.capital.slice(0, -1).join(", ") +
      ", and " +
      country.capital.slice(-1)
    : country.capital;

  return (
    <section className="country">
      <Button onClick={goBack}>&#8592; Home</Button>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="description-container">
          <div className="img-container">
            <img src={country.flags.png} alt={country.name.common} />
          </div>

          <div className="description-txt">
            {country.name.official === country.name.common ? (
              <h1>{country.name.common}</h1>
            ) : (
              <h1>
                {country.name.official} ({country.name.common})
              </h1>
            )}
            {country.subregion ? (
              <p>
                Is a country in {country.subregion}
                {languages}.
              </p>
            ) : (
              <p>
                Is a country in {country.region}
                {languages}.
              </p>
            )}
            {country.capital ? (
              <p>
                With <b>{capital}</b> as capital, the country covers a total
                area of {country.area} km2 and has {population} inhabitants.
              </p>
            ) : (
              <p>
                The country covers a total area of {country.area} km2 and has{" "}
                {population} inhabitants.
              </p>
            )}
          </div>
          <div id="map-container">
            <iframe
              title="location"
              id="frame"
              frameBorder="0"
              width="100%"
              src={`https://www.google.com/maps/embed/v1/place?key=${My_Key}&q=${country.latlng[0]},${country.latlng[1]}&zoom=6`}
            ></iframe>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className="borders">
              <b>Borders: </b>
              {country.borders.map((border, index, {length}) => (
                <Link className="border-item" key={border} to={`/${border}`}>
                  {border}{index !== length -1 && ","}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Country;
