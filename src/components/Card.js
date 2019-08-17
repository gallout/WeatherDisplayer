import React from "react";
import "./card-style.css";

const Card = props => (
  /*<div id="card-id" className="card text-center">
    {props.city && (
      <p className="weather__key">
        <span className="weather__value">{props.city}</span>
      </p>
    )}

    <p>
      <img src={props.currentCityImage} width="350px" height="350px" />
    </p>
    </div> */

  
    <div className="card text-center">
    <div className="overflow"
                      style={{  
                        backgroundImage: `url(${props.currentCityImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: "30rem",
                        height: "38rem",
                        paddingTop: "80px",
                        borderRadius: "10px",
                      }} >
                      
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <p className="card-title">
                <b>{props.city}</b>
              </p>
              <p className="card-title"> 
              <b> Температура: <span className="weather__value"> {props.temperature}</span> </b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>


);

export default Card;
