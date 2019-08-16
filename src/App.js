import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

import {
  fetchOpenWeatherCity,
  callWeatherApi,
  callUnsplashApi
} from "./utils/api";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    currentLocation: undefined,
    currentCityImage: undefined
  };

  /*getWeather = async e => {
    const weather_API_KEY = "659acd0d726fc231ff96bc4e69f3b5fb";
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weather_API_KEY}&units=metric`
    );
    const data = await api_call.json();

    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please, enter the values"
      });
    }
  };*/

  componentDidMount() {
    this.handleGetLocation();
  }

  handleGetLocation = async () => {
    let cachedLat = localStorage.getItem("latitude");
    console.log(localStorage);
    let cachedLon = localStorage.getItem("longitude");

    cachedLat
      ? this.setCoordsFromLocalStorage(cachedLat, cachedLon)
      : this.getCoords();
  };

  getCoords = () => {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          localStorage.setItem("latitude", pos.coords.latitude);
          localStorage.setItem("longitude", pos.coords.longitude);
          callWeatherApi(pos.coords.latitude, pos.coords.longitude)
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
        },
        error => {
          this.setState({
            error: error.message
          });
        }
      );
    }
  };

  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState(
      {
        latitude: cachedLat,
        longitude: cachedLon
      },
      async () => {
        const [resA, resB] = await Promise.all([
          callWeatherApi(this.state.latitude, this.state.longitude),
          callUnsplashApi()
        ]);
        this.setState({
          city: resA.city,
          currentCityImage: resB.currentCityImage
        });
      }
    );
  }

  onSubmit = e => {
    this.changeLocation(e.city);
  };

  changeLocation = city => {
    fetchOpenWeatherCity(city)
      .then(res => {
        this.setState({ city: res.name });
      })
      .catch(err =>
        this.setState({
          errorText: "city does not exist"
        })
      );
  };

  render() {
    const { city, currentCityImage } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <Form onSubmit={this.onSubmit} />
                <WeatherDisplay
                  city={city}
                  currentCityImage={currentCityImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /*
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>

                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    */
  }
}

export default App;
