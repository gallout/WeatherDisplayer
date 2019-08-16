import React from "react";

const Weather = props => (
  <div>
    {props.city && props.country && (
      <p className="weather__key">
        Локация:{" "}
        <span className="weather__value">
          {props.city}, {props.country}
        </span>
      </p>
    )}
    {props.temperature && (
      <p className="weather__key">
        Температура:{" "}
        <span className="weather__value"> {props.temperature}</span>
      </p>
    )}
    {props.humidity && (
      <p className="weather__key">
        Влажность: <span className="weather__value">{props.humidity}</span>
      </p>
    )}
    {props.description && (
      <p className="weather__key">
        Погодные условия:{" "}
        <span className="weather__value">{props.description}</span>
      </p>
    )}
    {props.error && (
      <p className="weather__key">
        <span className="weather__error">{props.error}</span>
      </p>
    )}
  </div>
);

export default Weather;
