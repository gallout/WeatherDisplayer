import React from "react";
import "./card-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddNewCard = props => {
  const items = props.items;

  const listItems = items.map(item => {
    return (
      <div className="card text-center" key={item.key}>
        <div
          className="overflow"
          style={{
            backgroundImage: `url(${item.currentCityImage})`,
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
                        <b>{item.city}</b>
                      </p>
                    </h2>
                    <div className="edit-button">
                      <span>
                        <FontAwesomeIcon
                          className="faicons"
                          icon="trash"
                          onClick={() => props.deleteItem(item.key)}
                        />
                      </span>
                    </div>
                    <h1>
                      <p className="card-title">
                        <b>
                          <span className="temperature-title">
                            {Math.round(item.temperature)}°C
                          </span>
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
                                item.description_icon
                              }.png`}
                              width="30px"
                              height="30px"
                            />
                            {item.description}
                          </span>
                        </b>
                      </p>
                    </h3>

                    <h4>
                      <div className="card-title">
                        <div className="card-element">
                          <div className="card-elem-size">
                            <b>{item.humidity}% </b>
                          </div>
                          <div className="card-elem-name-size">Humidity</div>
                        </div>

                        <div className="card-element">
                          <div className="card-elem-size">
                            <b>{item.pressure} </b>
                          </div>
                          <div className="card-elem-name-size">
                            Pressure, hpa
                          </div>
                        </div>

                        <div className="card-element">
                          <div className="card-elem-size">
                            <b>{item.wind} </b>
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
  });
  return <div className="main-form">{listItems}</div>;
};

export default AddNewCard;
