import React from "react";
import "./card-style.css";

class AddNewCard extends React.Component  {

    render() {
       
        return (
            <div className="card text-center">
                <button className="add-location-button">
                <p>Add Location</p>
                </button>
            </div>
        );
    };
}   

export default AddNewCard;