import React from "react";
import '../styles/YourTripsCard.css'

function YourTripsCard(){
    return(
        <div className="tripCard">
            <h1>Your Trips</h1>
            <hr/>
            <div className="tripCardTrips">
                <p >Gan Yavne  →  jerusalem</p>
            </div>
            <button>New Trip</button>
        </div>
    )
}


export default YourTripsCard