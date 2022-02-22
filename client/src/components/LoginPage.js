import react, { useEffect, useState } from "react";
import '../styles/LoginPage.css'
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import PopUpMessage from "./PopUpMessage";
import NavBar from "./NavBar";



function LoginPage() {        // the login page  
    const clientId=process.env.REACT_APP_CLIENT_ID; //google client id
    const [showLoginBtnGoogle, setShowLoginBtnGoogle] = useState(true) //show login button
    const [showLoginBtnEmail,setShowLoginBtnEmail] =useState(true) //toggle between button for login with email to login box
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setpasswordInput] = useState("")
    const [showPopUp, setshowPopUp] = useState(false);
    const navigate = useNavigate(); 
    const cookies = new Cookies();
    const [popUpContent, setpopUpContent] = useState({              
        registrationSuccess: false,
        popUpTitle: "",
        popUpExplain: "",
    });

    useEffect(() => {
        if(cookies.get("emailAccount")!==undefined){
            navigate('/')
        }
    },);
    
    


    const loginSuccess = (response) => { //when login success get the data and hide the login button)
        fetch(("http://localhost:5000/googlelogin"),{
            method: "post",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({email: response.profileObj.email, name: response.profileObj.givenName, family: response.profileObj.familyName,googleID:response.profileObj.googleId,profileImg:response.profileObj.imageUrl, withGoogle: true})
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)})   


        setShowLoginBtnGoogle(false)
        cookies.set("googleAccount",{firstName: response.profileObj.givenName, lastName: response.profileObj.familyName, email: response.profileObj.email, profileImg:response.profileObj.imageUrl, googleID:response.profileObj.googleId},{ path: '/' })

        navigate('/')
    }
    const failureSuccess = (response) => {// if its fail
      console.log("failure success"+response);
    }


    const loginWithEmail=()=>{
        setShowLoginBtnEmail(false)
    }

    const cnacelShowLogin=()=>{
        setShowLoginBtnEmail(true)

    }

    const loginWithEmailBtn=(event)=>{   //when user click on the login button
        event.preventDefault()
        if(checkEmailValidate(emailInput)){
            fetch(("http://localhost:5000/login"),{
                method: "post",
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({email: emailInput, password: passwordInput, withGoogle: false})
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    cookies.set("emailAccount",{firstName: data.userFound.firstName, lastName: data.userFound.lastName, email: emailInput, password: passwordInput, userID: data.userFound._id},{ path: '/' })
                    navigate('/')
                }
                else if(!data.success){
                    setshowPopUp(true)
                    setpopUpContent({
                        popUpTitle: data.title,
                        popUpExplain: data.reason
                    })
                }
            })   
        }
        
    }

    const handleChange = (event)=>{
        switch (event.target.name) {
            case "email":
                setEmailInput(event.target.value)
                break;
            case "password":
                setpasswordInput(event.target.value)
                break;
            default:
                break;
        }
    }

    const checkEmailValidate = ( email ) => {// check the email from the user if its valid

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            // this is a valid email address
            return true
        }
        else {
            // invalid email
            return false
        }
    
    }
      

      
    return(
        <div>
            <h1>TripTremp</h1>
            {!showPopUp?
            <form method="post">
                <div className="loginBox">
                    <h1>Login</h1>
                    <hr/>
                    {showLoginBtnEmail?
                    <button onClick={loginWithEmail}>Login With Email</button>
                    :
                    <div className="loginWithEmail">
                        <p>Email</p>
                        <input type={"email"} placeholder="Your Email:"name="email" value={emailInput} onChange={handleChange}></input>
                        <p>Password</p>
                        <input type={"password"} placeholder="Your Password:" name="password" value={passwordInput} onChange={handleChange}></input>
                        <div className="buttonsCancelLogin">
                            <button onClick={loginWithEmailBtn}>Login</button>
                            <button onClick={cnacelShowLogin}>Cancel</button>
                        </div>
                    </div>
                    }

                    {showLoginBtnGoogle?
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login With Google"
                        onSuccess={loginSuccess}
                        onFailure={failureSuccess}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        
                    />
                    :null}

                    {/* {showLogoutBtnGoogle?
                    
                    :null} */}
                    <p>Don't have an account? <a href="/signup">Sign Up</a> to do it now!</p>
                </div>
            </form>:
            <PopUpMessage 
            title={popUpContent.popUpTitle} 
            explain={popUpContent.popUpExplain}
            btnName="Try Again"
            refresh={true}
            />
            }
        </div>
    )

}

export default LoginPage;