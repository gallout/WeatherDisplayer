import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Card from "./components/Card";
import "./App.css";

import {
  fetchOpenWeatherCity,
  callWeatherApi,
  callUnsplashApi
} from "./utils/api";
import AddNewCard from "./components/AddNewCard";

class App extends React.Component {
  state = {
    city: undefined,
    temperature: undefined,
    description_icon: undefined,
    description: undefined,
    humidity: undefined,
    pressure: undefined,
    wind: undefined,
    error: undefined,
    //currentLocation: undefined,
    currentCityImage: undefined,
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
    let cachedLon = localStorage.getItem("longitude");

    cachedLat
      ? this.setCoordsFromLocalStorage(cachedLat, cachedLon)
      : this.setCoords();
  };

  setCoords = () => {
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
        console.log(resA);
        this.setState({
          currentCityImage: resB.currentCityImage,
          city: resA.city,
          temperature: resA.temperature,
          description_icon: resA.description_icon,
          description: resA.description,
          humidity: resA.humidity,
          pressure: resA.pressure,
          wind: resA.wind
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
        this.setState({ 
          city: res.name,
          temperature: res.main.temp,
          description_icon: res.weather[0].icon,
          description: res.weather[0].description,
          humidity: res.main.humidity,
          pressure: res.main.pressure,
          wind: res.wind.speed

        });
      })
      .catch(err =>
        this.setState({
          errorText: "city does not exist"
        })
      );
  };

  componentWillMount() {
    document.title = "Weather App";
  }


  render() {
    const { currentCityImage, city, temperature, description_icon, description, humidity,pressure, wind  } = this.state;
    return (
      <div>
        <div className="col-md-4">
               <Form onSubmit={this.onSubmit} />
              <div className="cards-list">
                <Card
                  currentCityImage={currentCityImage}
                  city={city}
                  temperature={temperature}
                  description_icon={description_icon}
                  description={description}
                  humidity={humidity}
                  pressure={pressure}
                  wind={wind}
                />
                
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
