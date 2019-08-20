import React from "react";
import "./card-style.css";

const Card = props => (
  <div className="card text-center">
    <div
      className="overflow"
      style={{
        backgroundImage: `url(${props.currentCityImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "30rem",
        height: "38rem",
        paddingTop: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 0 150px rgba(0, 0, 0, 0.33) inset"
      }}
    >
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <h2>
                  <p className="card-title">
                    <b>{props.city}</b>
                  </p>
                </h2>
                <h1>
                  <p className="card-title" id="margin-center">
                    <b>
                      <div className="temperature-title">
                        {Math.round(props.temperature) - 273}°C
                      </div>
                    </b>
                  </p>
                </h1>

                <h3>
                  <p className="card-title">
                    <b>
                      {" "}
                      <span>
                        <img
                          src={`http://openweathermap.org/img/wn/${
                            props.description_icon
                          }.png`}
                          width="30px"
                          height="30px"
                        />
                        {props.description}
                      </span>{" "}
                    </b>
                  </p>
                </h3>

                <h4>
                  {" "}
                  <div className="card-title">
                    <div className="card-element">
                      <div className="card-elem-size">
                        <b>{props.humidity}% </b>
                      </div>
                      <div className="card-elem-name-size">Humidity</div>
                    </div>

                    <div className="card-element">
                      <div className="card-elem-size">
                        <b>{props.pressure} </b>
                      </div>
                      <div className="card-elem-name-size">Pressure, hpa</div>
                    </div>

                    <div className="card-element">
                      <div className="card-elem-size">
                        <b>{props.wind} </b>
                      </div>
                      <div className="card-elem-name-size">Wind, ms</div>
                    </div>
                  </div>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Card;
