import React, { useState } from 'react';
import axios from 'axios';

import { getUrl } from './constants/constants';

function App() {
  const [data, setData] = useState({});
  const [apiError, setApiError] = useState('');
  const [location, setLocation] = useState('');
  const url = getUrl(location);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setApiError('');
        })
        .catch((error) => {
          setApiError(error.response.data.message);
          setData({});
        });
      setLocation('');
    }
  };

  const convertToKMPH = (measure) => {
    return ((measure * 3600) / 1000).toFixed();
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder={
            apiError !== '' ? apiError.toUpperCase() : 'Enter Location'
          }
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>
        {data.main && data.wind && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{convertToKMPH(data.wind.speed)} Km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
