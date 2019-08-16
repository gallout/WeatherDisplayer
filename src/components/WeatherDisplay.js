import React from "react";

const WeatherDisplay = props => (
  <div>
    {props.city && (
      <p className="weather__key">
        <span className="weather__value">{props.city}</span>
      </p>
    )}

    <p>
      <img src={props.currentCityImage} width="350px" height="350px" />
    </p>
  </div>
);

export default WeatherDisplay;
