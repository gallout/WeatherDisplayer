import React, { useState } from "react";
import AddNewCard from "./AddNewCard";

import { fetchOpenWeatherCity, callUnsplashApi } from "../utils/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { randomBytes } from "crypto";

library.add(faTrash);

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {},
      count: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleInput = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.changeLocation(e.target.value);

    this.setState({
      currentItem: {
        city: value
      }
    });
  };

  changeLocation = city => {
    this.setState({}, async () => {
      const [resA, resB] = await Promise.all([
        fetchOpenWeatherCity(city),
        callUnsplashApi()
      ]);

      this.setState({
        currentItem: {
          currentCityImage: resB.currentCityImage,
          city: resA.name,
          temperature: resA.main.temp,
          description_icon: resA.weather[0].icon,
          description: resA.weather[0].description,
          humidity: resA.main.humidity,
          pressure: resA.main.pressure,
          wind: resA.wind.speed,
          key: resA.id
        }
      });
    });
  };

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);

    if (newItem.city != "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        key: ""
      });
    }
  };

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
  }

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
        <AddNewCard items={this.state.items} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default Form2;
