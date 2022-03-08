import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'
import "../styles/AddTripCard.css"
import styled from 'styled-components';
import dateFormat, { masks } from "dateformat";

import Cookies from 'universal-cookie';



export default function AddTripCard(props) {
    // const CalendarContainer = styled.div`
    //     /* ~~~ container styles ~~~ */
    //     max-width: 600px;
    //     margin: auto;
    //     margin-top: 20px;
    //     background-color: #b3a795c7;
    //     padding: 10px;
    //     border-radius: 8px;


    //     .react-calendar__navigation {
    // display: flex;

    // .react-calendar__navigation__label {
    //   font-weight: bold;
    // }

    // .react-calendar__navigation__arrow {
    //   flex-grow: 0.333;
    // }
    // }
    // .react-calendar__month-view__weekdays {
    //   text-align: center;
    // }
    // button {
    //   margin: 10px;
    //   background-color: #a6caa6;
    //   border: 0;
    //   border-radius: 8px;
    //   ${'' /* color: white; */}
    //   ${'' /* padding: 5px 0; */}
    
    //   &:hover {
    //     background-color: #e79d90;
    //   }
    
    //   &:active {
    //     background-color: #e66852;
    //   }
    // }
    // .react-calendar__month-view__days {
    //   display: grid !important;
    //   grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 
    
    //   .react-calendar__tile {
    //     max-width: initial !important;
    //   }
    // }
    // .react-calendar__month-view__days__day--neighboringMonth {
    //   opacity: 0.5;
    // }
    // .react-calendar__month-view__days__day--weekend {
    //   ${'' /* color: #dfdfdf; */}
    // }
    // .react-calendar__tile--range {
    //     box-shadow: 0 0 6px 2px black;
    // }
    // .react-calendar__year-view__months, 
    // .react-calendar__decade-view__years, 
    // .react-calendar__century-view__decades {
    //   display: grid !important;
    //   grid-template-columns: 20% 20% 20% 20% 20%;
    
    //   &.react-calendar__year-view__months {
    //     grid-template-columns: 33.3% 33.3% 33.3%;
    //   }
    
    //   .react-calendar__tile {
    //     max-width: initial !important;
    //   }
    // }
    // `;    

    // const navigate = useNavigate(); 
    
    // const now = new ;
    
    const cookies = new Cookies() //the cookies

    
    const [now, setnow] = useState(Date());
    const [today, setDateState] = useState(dateFormat(now, "yyyy-mm-dd/hh:MM")) //  date today
    const [selectedDateTime, setSelectedDateTime] = useState(""); // the selected date and time from the user
    const [startLocation, setstartLocation] = useState(""); // the start location input from the user
    const [destination, setDestination] = useState("");// the destination input from the user
    const [numberOfPeople, setnumberOfPeople] = useState(2); // the number of people input from the user
    const [disableAddButton, setdisableAddButton] = useState(true); // to disable the add trip button 

    const [userID, setuserID] = useState("");

    var datearray = today.split("/");
    var minDate = datearray[0] + 'T' + datearray[1]
    
    useEffect(() => {
        if (cookies.get("emailAccount")!==undefined) {
            setuserID(cookies.get("emailAccount").userID)
        } else if(cookies.get("googleAccount")!==undefined){
            setuserID(cookies.get("googleAccount").googleID)
        }
    }, []);
    
    

    // const [today, setDateState] = useState(dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")) //  date today all details
    
    // const changeDate = (e) => { // on change from calendar
    //     setDateState(e)
    // }

    // var datearray = localDate.split("/"); //split at / to change for dd/mm/yyyy
    // var minDate = datearray[2] + '-' + datearray[0] + '-' + datearray[1]   ;    // change to yyyy-mm-dd
    // console.log("local: "+localDate)

    // setDateState(dateFormat(dateState, "dd, mm dS, yyyy, h:MM:ss TT"))
    
    const addTrip=()=>{// the button in the pop up window for going to login
        
        fetch(("http://localhost:5000/addnewtrip"),{
            method: "post",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({userID: userID, startLocation: startLocation, destination: destination, dateTime:selectedDateTime, numberOfPeople:numberOfPeople})
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)})  
        window.location.reload();
    }
    
    useEffect(() => {
       if(startLocation!=="" && destination!=="" &&selectedDateTime!=="" && numberOfPeople!==""){
           setdisableAddButton(false)
       }
       else{
           setdisableAddButton(true)
       }
    }, [startLocation, selectedDateTime, destination , numberOfPeople]);

    const handleChange=(event)=>{  // save the user inputs
        switch (event.target.name) {
            case "startLocation":
                setstartLocation(event.target.value)
                break;
            case "destination":
                setDestination(event.target.value)
                break;
            case "numOfPeople":
                setnumberOfPeople(event.target.value)
                break;
            case "dateTime":
                var datearray = event.target.value.split("T");
                var datetosave = datearray[0] + ' ' + datearray[1]
                setSelectedDateTime(datetosave)
                break;
            default:
                break;
        }
    }

  return (
    <div className="addTripWindow">
        <h1>Add a new TripTremp</h1>
            <hr/>
            <label>Start Location</label>
            <input type="text" onChange={handleChange} name="startLocation" value={startLocation} placeholder='Start Location...'></input>
            <label>Destination</label>
            <input type="text" onChange={handleChange} name="destination" value={destination} placeholder='Choose Destination...'></input>
            <label>Number Of People</label>

            <input type="number" min="1" value={numberOfPeople} name="numOfPeople" onChange={handleChange} placeholder='Number Of Peoples... (1 or more)'></input>
            <label>Select date and time</label>
            <input type="datetime-local" min={minDate} name="dateTime" onChange={handleChange} ></input>


            {/* <CalendarContainer>
            <Calendar         
                // showNeighboringMonth={false}
                className="calendar" 
                calendarType="Hebrew" 
                value={dateState} 
                onChange={changeDate}
            />
            </CalendarContainer> */}
            
            
            <button disabled={disableAddButton} onClick={addTrip}>Add TripTremp</button>
    </div>
  )
}
