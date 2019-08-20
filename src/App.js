import React from "react";

import Form from "./components/Form";
import Card from "./components/Card";
import "./App.css";
import AddNewCard from "./components/AddNewCard";

import {
  fetchOpenWeatherCity,
  callWeatherApi,
  callUnsplashApi
} from "./utils/api";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {},
      city: undefined,
      temperature: undefined,
      description_icon: undefined,
      description: undefined,
      humidity: undefined,
      pressure: undefined,
      wind: undefined,
      error: undefined,
      currentCityImage: undefined
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

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
    } else {
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
          callUnsplashApi("Russia")
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
    const newItem = this.state.currentItem;

    var bool = 1;
    this.state.items.forEach(function(item) {
      if (item.city == newItem.city) {
        alert("Такая карточка уже есть, либо такого города нету");
        bool = 0;
      }
    });

    if (bool != 0) {
      if (newItem.city != "") {
        const newItems = [...this.state.items, newItem];
        this.setState({
          items: newItems,
          key: ""
        });
      }
    } else {
    }
  };

  changeLocationAndImage = city => {
    const fetchCityData = fetchOpenWeatherCity(city);
    const fetchUnsplashData = callUnsplashApi(city);
    Promise.all([fetchCityData, fetchUnsplashData])
      .then(responses => {
        this.setState({
          currentItem: {
            currentCityImage: responses[1].currentCityImage,
            city: responses[0].name,
            temperature: responses[0].main.temp,
            description_icon: responses[0].weather[0].icon,
            description: responses[0].weather[0].description,
            humidity: responses[0].main.humidity,
            pressure: responses[0].main.pressure,
            wind: responses[0].wind.speed,
            key: responses[0].id
          }
        });
      })
      .catch(err =>
        this.setState({
          errorText: "city does not exist"
        })
      );
  };

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
  }

  componentWillMount() {
    document.title = "WeatherDisplayer App";
  }

  render() {
    const {
      currentCityImage,
      city,
      temperature,
      description_icon,
      description,
      humidity,
      pressure,
      wind
    } = this.state;
    return (
      <div>
        <div className="col-md-4">
          <Form
            onSubmit={this.onSubmit}
            changeLocationAndImage={this.changeLocationAndImage}
          />

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
            <AddNewCard items={this.state.items} deleteItem={this.deleteItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
