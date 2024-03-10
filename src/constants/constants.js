const API_KEY = '0651101b1fbde1f693e8b5e044b36973';

export const getUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
