const API_KEY = process.env.REACT_APP_API_KEY;

export const getUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
