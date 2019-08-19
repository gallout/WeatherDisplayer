import React from "react";
import AddNewCard from "./AddNewCard";

import { fetchOpenWeatherCity } from "../utils/api";

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {}
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleInput = e => {
    e.preventDefault();
    this.changeLocation(e.target.value);
  };

  changeLocation = city => {
    fetchOpenWeatherCity(city)
      .then(res => {
        this.setState({
          currentItem: {
            city: res.name,
            temperature: res.main.temp,
            description_icon: res.weather[0].icon,
            description: res.weather[0].description,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            wind: res.wind.speed
          }
        });
      })
      .catch(err =>
        this.setState({
          errorText: "city does not exist"
        })
      );
  };

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.city != "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems
      });
    }
  };

  render() {
    return (
      <div>
        <div
          width="100px"
          margin-left="auto"
          margin-right="auto"
          className="main-form"
        >
          <input
            type="text"
            name="city"
            placeholder="Город..."
            //value={form["city"]}
            //value={this.state.currentItem.city}
            //onChange={handleChange}
            onChange={this.handleInput}
          />

          <form onSubmit={this.addItem}>
            <button type="submit">Поиск</button>
            <button className="add-btn" type="submit">
              Добавить
            </button>
          </form>
        </div>
        <AddNewCard items={this.state.items} />
      </div>
    );
  }
}

export default Form2;
