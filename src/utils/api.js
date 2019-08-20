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
  console.log(json);
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
      wind: body.wind.speed
    };
  }
};

export const callUnsplashApi = async location => {
  const unsplash_API_KEY =
    "e17647ee71ab63ab4a25fc056672400b9c2e006b978baff9b318a7a96a41f699";
  let response = await fetch(
    "https://api.unsplash.com/search/photos/?client_id=" +
      unsplash_API_KEY +
      "&query=" +
      location
  );

  let body = await response.json();

  if (response.status !== 200) throw Error(body.message);
  var randomPhotoNumber = Math.floor(Math.random() * 10);

  return {
    currentCityImage: body.results[randomPhotoNumber].urls.regular
  };
};
