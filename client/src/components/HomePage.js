import { useEffect, useState } from 'react';
import YourTripsCard from './YourTripsCard';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import NavBar from './NavBar';

import { connect } from "react-redux"
import {
  changeShowProfileInfo,
  changeShowAddTripWindow
} from "../redux/Counter/actions"
import AddTripCard from './AddTripCard';

function HomePage(props) {
  const navigate = useNavigate(); 
  const cookies = new Cookies() //the cookies
  const [withEmail, setwithEmail] = useState(Boolean);
  const [userInfo, setUserInfo] = useState({ //the email user login info
    FirstName: "",
    LastName: "",
    Email: "",
  });

  const [showAddWindow, setshowAddWindow] = useState(false);


  const newTrip =()=>{  // the function to add or disable the add new trip window
    setshowAddWindow(true)
  }

  console.log(props.showAddNewTrip)


  useEffect(() => {
    if (cookies.get("googleAccount")===undefined && cookies.get("emailAccount")===undefined){
      navigate('/login')
    }
    else{
      if (cookies.get("googleAccount")!==undefined) {
        setwithEmail(false)
        setUserInfo({ //set user info with google info
          FirstName: cookies.get("googleAccount").firstName,
          LastName: cookies.get("googleAccount").lastName,
          Email: cookies.get("googleAccount").email,
          GoogleID: cookies.get("googleAccount").googleID,
          ProfileImg: cookies.get("googleAccount").profileImg,
        })
      } else {
        setwithEmail(true)
        setUserInfo({ //set google account with email info
          FirstName: cookies.get("emailAccount").firstName,
          LastName: cookies.get("emailAccount").lastName,
          Email: cookies.get("emailAccount").email,
          UserID: cookies.get("emailAccount").userID,
          firstChar: (cookies.get("emailAccount").firstName).charAt(0).toUpperCase(),
        })
      }
    }    
  },[]);

  
const screenClick=()=>{
  // setshowProfileInfo(false)
  if (props.show) {
    props.changeShowProfileInfo()
  }

}
  

  return (
  <div>
    {/* the Navbar div */}
    <NavBar
      FirstName={userInfo.FirstName}
      LastName={userInfo.LastName}
      Email={userInfo.Email}
      ProfileImg={userInfo.ProfileImg}
      firstChar={userInfo.firstChar}
      withEmail={withEmail}
    />

    {/* the Search input */}
    <div  onClick={screenClick}>
      <div className='search'>
        <input placeholder='your destination...'></input>
        <button>search</button>
      </div>
                      
      <div className='yourTripsCard'>
      {!props.showAddNewTrip?<YourTripsCard/>:
      <AddTripCard/>}  
      </div>
    </div>
    
    
  </div>
  );
}

const mapStateToProps = state => {
  return {
    show: state.showProfileInfo.show,
    showAddNewTrip: state.showAddTripWindow.showAddNewTrip,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeShowProfileInfo: () => dispatch(changeShowProfileInfo()),
    changeShowAddTripWindow: () => dispatch(changeShowAddTripWindow()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
