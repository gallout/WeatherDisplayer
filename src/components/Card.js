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
                        paddingTop: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 0 0 150px rgba(0, 0, 0, 0.33) inset"
                      }} >
                        <div>
      <table>
        <tbody>
          <tr>
            <td>
            <h2><p className="card-title"><b>{props.city}</b></p>
            <div class="edit-button"> Edit </div>
           </h2> 
           
              <h1><p className="card-title"> 
              <b> <span class="temperature-title"> { Math.round(props.temperature - 273,1) }°C</span> </b>
              </p></h1>

              <h3><p className="card-title"> 
              <b> <span>       
              <img  src={`http://openweathermap.org/img/wn/${props.description_icon}.png`}  width="30px" height="30px" />
              {props.description}
              </span> </b>
              </p></h3>

              <h4> <p className="card-title"> 
              <span>
              <td className="card-element"> <p><b><td className="card-elem-size">{props.humidity} % </td></b> <td className="card-elem-name-size">Humidity</td></p> </td> 
              <td className="card-element"><p><b><td className="card-elem-size">{props.pressure}</td></b> <td className="card-elem-name-size">Pressure, hpa</td> </p>  </td> 
              <td className="card-element"> <p><b><td className="card-elem-size">{props.wind}</td> </b> <td className="card-elem-name-size">Wind, ms</td></p> </td>  
              </span>
               </p></h4>
            
             
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
);

export default Card;
