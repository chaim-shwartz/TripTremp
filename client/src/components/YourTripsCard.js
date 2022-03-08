import React, { useEffect, useState } from "react";
import '../styles/YourTripsCard.css'
import AddTripCard from "./AddTripCard";
import Cookies from 'universal-cookie';


import { connect } from "react-redux"
import {
  changeShowAddTripWindow,
} from "../redux/Counter/actions"


function YourTripsCard(props){
    const [userCards, setuserCards] = useState([]);
    const cookies = new Cookies() //the cookies
    const [userID, setuserID] = useState(""); // the user id


    useEffect(() => {  // set the user id if its google or email
        if (cookies.get("emailAccount")!==undefined) {
            setuserID(cookies.get("emailAccount").userID)
        } else if(cookies.get("googleAccount")!==undefined){
            setuserID(cookies.get("googleAccount").googleID)
        }
    }, []);
    


    // console.log(props.showAddNewTrip)

    useEffect(() => {
        fetch(("http://localhost:5000/bringcards"),{
            method: "post",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({userID: userID})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setuserCards(data)
        })   
    }, [userID]);
    console.log(userCards[0])
    const newTrip =()=>{  // the function to add or disable the add new trip window
        // setshowAddWindow(true)
        props.changeShowAddTripWindow()
    }
   

    return(
        <div className="tripCard">
<<<<<<< HEAD
            <h1>Your Trips</h1>
            <hr/>
            <div className="tripCardTrips">
                <p >Gan Yavne  →  jerusalem</p>
                <p> time </p>

                
=======
            <div>
                <h1>Your Trips</h1>
                <hr/>
                {
                    userCards.map((card, index) => {
                        return(
                            <div key={index} className="tripCardTrips">
                                <p>"{card.start}"  →  "{card.destination}"</p>
                                <p> on {card.dateTime}</p>
                                <p> There are {card.peoples} places left</p>
                            </div>
                        )
                        
                    })
                }
                
                <button onClick={newTrip}>New Trip</button>
>>>>>>> development
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        showAddNewTrip: state.showAddTripWindow.showAddNewTrip,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        changeShowAddTripWindow: () => dispatch(changeShowAddTripWindow()),
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(YourTripsCard);