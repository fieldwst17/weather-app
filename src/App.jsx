import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const name = "Nonthaburi";
  const apiKey = "bb90a502d67a35dbfc20b812b47ca6ac";
  const [city, setCity] = useState({});
  const [search, setSearch] = useState("");
  const searchPressed = () => {
    console.log(searchPressed);
    console.log(search);
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
      });
  }, []);

  const convertTemp = (k) => {
    return (k - 273).toFixed();
  };
  return (
    <div className="App">
      <section>
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter your Country/City"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        <div className="location">
          <h1 className="city">{city.name}</h1>
          <p className="state">{city.sys && city.sys.country}</p>
        </div>
        <div className="card">
          <div className="weather">
            <h1>{convertTemp(city.main && city.main.temp)}&deg;C</h1>
            <p>
              Max : {convertTemp(city.main && city.main.temp_min)}&deg;C - Min :{" "}
              {convertTemp(city.main && city.main.temp_max)}&deg;C
            </p>
          </div>
          <div className="info">
            <div className="status">{city.weather && city.weather[0].main}</div>
            <div className="humidity">
              ความชื้น : {city.main && city.main.humidity}
            </div>
            <div className="windspeed">
              ความเร็วลม : {city.wind && city.wind.speed}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
