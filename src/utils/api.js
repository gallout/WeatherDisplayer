export const fetchOpenWeatherCity = async city => {
  const weather_API_KEY = "659acd0d726fc231ff96bc4e69f3b5fb";
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      weather_API_KEY +
      "&units=metric"
  );

  const json = await response.json();

  return json;
};

export const callWeatherApi = async (latitude, longitude) => {
  const weather_API_KEY = "659acd0d726fc231ff96bc4e69f3b5fb";
  let response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?appid=" +
      weather_API_KEY +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude
  );

  let body = await response.json();
  if (body.cod == 404) {
    throw Error(body.message);
  } else {
    return {
      error: "",
      loading: false,
      data: body,
      city: body.name,
      temperature: body.main.temp,
      description_icon: body.weather[0].icon,
      description: body.weather[0].description,
      humidity: body.main.humidity,
      pressure: body.main.pressure,
      wind: body.wind.speed,
    };
  }
};

export const callUnsplashApi = async location => {
  const unsplash_API_KEY =
    "7a4e4d26cd4e7c49197d518c7b16d6965222651500b0cb612460eb516bc8b801";
  let response = await fetch(
    "https://api.unsplash.com/search/photos/?client_id=" +
      unsplash_API_KEY +
      "&query=" +
      "london"
  );

  let body = await response.json();

  if (response.status !== 200) throw Error(body.message);
  var randomPhotoNumber = Math.floor(Math.random() * 10);

  return {
    currentCityImage: body.results[randomPhotoNumber].urls.regular
  };
};
