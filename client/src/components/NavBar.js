import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GoogleLogout } from 'react-google-login';
import "../styles/NavBar.css"


export default function NavBar(props) {

    const cookies = new Cookies() //the cookies
    const navigate = useNavigate(); 

    const [showLogoutBtnGoogle, setShowLogoutBtnGoogle] = useState(false) //show logout button
    const clientId=process.env.REACT_APP_CLIENT_ID; //google client id
    const [showProfileInfo, setshowProfileInfo] = useState(false);

    
    useEffect(() => {
        if (cookies.get("googleAccount")!==undefined) {
            setShowLogoutBtnGoogle(true)
          }
    }, []);

    const logoutSuccess = () => { // when logout success show alert and hide logout
        setShowLogoutBtnGoogle(false)
        cookies.remove("googleAccount")
        navigate('/login')
    }
    
    const logoutEmailBtn=()=>{   // logout from the email account
      cookies.remove("emailAccount")
      navigate('/login')
    }
    
    const clickAvatar=()=>{ //avatar button shows profile info
      setshowProfileInfo(!showProfileInfo)
    }



  return (
    <div>
        <nav className="navbar navbar-light fixed-top">
          <div className="container-fluid">
            <button onClick={clickAvatar} className='avatarBtn' style={!props.withEmail?{backgroundImage: `url(${props.ProfileImg})`}:null}>{props.withEmail?props.firstChar:null}</button>
            {showProfileInfo?<div className='profileInfo'>
              <p>{props.FirstName} {props.LastName}</p>
              <p>{props.Email}</p>
              <button>Edit Your Account</button>
            </div>:null}
            <div className='title'><h1>Welcome To TripTremp</h1></div>

            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item dropdown">
                    {showLogoutBtnGoogle?<GoogleLogout
                    clientId={clientId}
                    buttonText="Logout from google"
                    onLogoutSuccess={logoutSuccess}
                    />:<button onClick={logoutEmailBtn}>
                      Logout
                    </button>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
    </div>
  )
}
