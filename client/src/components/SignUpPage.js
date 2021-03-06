import react, { useState } from "react";
import '../styles/SignUpPage.css'
import { useNavigate } from "react-router-dom";

import PasswordStrengthBar from 'react-password-strength-bar'; //password strong bar
import PasswordChecklist from "react-password-checklist";// password check if a good one and stay in all requirements
import PopUpMessage from "./PopUpMessage";



function SignUpPage() {  
    const navigate = useNavigate(); 
    const [userInfo, setuserInfo] = useState({
        FirstName: "",
        LastName: "",
        EmailInput: "",
        ConfirmEmailInput: "",
        PasswordInput: "",
        ConfirmPasswordInput: "",
    });

    const [isErrorActive, setIsErrorActive] = useState([false,false,false,false]);// array that say if the input is valid or not and according to that change style
    const [signBtnDisable, setSignBtnDisable] = useState(true); //button disable until user insert all the details
    const [emailValid, setEmailValid] = useState(false) //to check if email is valid and then activate sign button
    const [showPassCheckList, setShowPassCheckList] = useState(false) //when to show password check list
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUp, setpopUp] = useState({              
        registrationSuccess: false,
        popUpTitle: "",
        popUpExplain: "",
    });
    



    function leaveInput(event){ //function that check the input when the user leave the input
        switch (event.target.name) {

            case "Email":
                if (!checkEmailValidate(userInfo.EmailInput)) {
                    setIsErrorActive([true, isErrorActive[1], isErrorActive[2], isErrorActive[3]])
                }
                else{
                    setIsErrorActive([false, isErrorActive[1], isErrorActive[2], isErrorActive[3]])
                }
                if (userInfo.ConfirmEmailInput!=="") {
                    if (!same(userInfo.EmailInput,userInfo.ConfirmEmailInput)) {
                        setIsErrorActive([true, true, isErrorActive[2], isErrorActive[3]])
                        setEmailValid(false)
                    } else {
                        setIsErrorActive([false, false, isErrorActive[2], isErrorActive[3]])
                        setEmailValid(true)
                    }
                }
                break;

            case "ConfirmEmail":
                if (!checkEmailValidate(userInfo.ConfirmEmailInput)) {
                    setIsErrorActive([isErrorActive[0], true, isErrorActive[2], isErrorActive[3]])
                    setEmailValid(false)
                } 
                else {
                    if (!same(userInfo.EmailInput, userInfo.ConfirmEmailInput)) {
                        setIsErrorActive([true, true, isErrorActive[2], isErrorActive[3]])
                        setEmailValid(false)
                    } else {
                        setIsErrorActive([false, false, isErrorActive[2], isErrorActive[3]])
                        setEmailValid(true)
                    }
                }
                break;

            case "Password":
                if (!checkPasswordValidate(userInfo.PasswordInput)) { //// if password is not valid
                    setIsErrorActive([isErrorActive[0], isErrorActive[1], true, isErrorActive[3]])
                }
                else{
                    setIsErrorActive([isErrorActive[0], isErrorActive[1], false, isErrorActive[3]])
                }
                break;

            case "ConfirmPassword":
                if (!checkPasswordValidate(userInfo.ConfirmPasswordInput)) {
                    setIsErrorActive([isErrorActive[0], isErrorActive[1],isErrorActive[2] , true])
                    setShowPassCheckList(true)
                } else {
                    if (!same(userInfo.PasswordInput,userInfo.ConfirmPasswordInput)){  //if password are not the same
                        setIsErrorActive([isErrorActive[0], isErrorActive[1], true, true])
                        setShowPassCheckList(true)
                    }
                    else{
                        setIsErrorActive([isErrorActive[0], isErrorActive[1], false, false])
                    }
                } 
                break;
            default:
                break;
        }
    }

    const backToLogin=()=>{ // return to login when click on "back"
        navigate("/login");    
    }


    const handleChange=(event)=>{
        switch (event.target.name) {
            case "FName":
                setuserInfo(prev=>({
                    ...prev,
                    FirstName: event.target.value,
                    ConfirmPasswordInput: ""
                }))
                break;
            case "LName":
                setuserInfo(prev=>({
                    ...prev,
                    LastName: event.target.value,
                    ConfirmPasswordInput: ""
                }))
                break;
            case "Email":
                setuserInfo(prev=>({
                    ...prev,
                    EmailInput: event.target.value,
                    ConfirmPasswordInput: ""
                }))
                break;
            case "ConfirmEmail":
                setuserInfo(prev=>({
                    ...prev,
                    ConfirmEmailInput: event.target.value,
                    ConfirmPasswordInput: ""
                }))
                break;
            case "Password":
                setuserInfo(prev=>({
                    ...prev,
                    PasswordInput: event.target.value
                }))
                break;
            case "ConfirmPassword":
                setuserInfo(prev=>({
                    ...prev,
                    ConfirmPasswordInput: event.target.value
                }))
                break;
            default:
                break;
        }
    }

    

    const checkPasswordValidate = ( pass ) => { //check that the password is valid and returns true or false

        // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"

        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    
        if ( re.test(pass) ) {
            // this is a valid pass
            return true
        }
        else {
            return false
        }
    
    }

    const checkEmailValidate = ( email ) => {// check if email is valid. returns true or false

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) )
            // this is a valid email address
            return true
            // invalid email, maybe show an error to the user.
        return false
    }

    const same=(val1, val2)=>{ //a function that check if two strings value are tha same. return true or false
        if(val1===val2)
            return true;
        return false;
    }

    const activateSignBtn=(valid)=>{//check if email password is valid and activate the sign button
        if (valid && emailValid && userInfo.FirstName!=="" && userInfo.LastName!=="") {
            setSignBtnDisable(false)
        } else {
            setSignBtnDisable(true)
        }
    }

    const signUpBtn=()=>{ //the actions when click on the sign up button
        fetch(("http://localhost:5000/signup"),{
            method: "post",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({FName: userInfo.FirstName, LName: userInfo.LastName, email: userInfo.EmailInput, password: userInfo.PasswordInput, withGoogle: false})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if (data.success) {
                setShowPopUp(true)
                
                setpopUp({
                    registrationSuccess: data.success,
                    popUpTitle: data.title,
                    popUpExplain: data.reason
                })
                // navigate("/login");
            } else {
                setShowPopUp(true)
                setpopUp({
                    registrationSuccess: data.success,
                    popUpTitle: data.title,
                    popUpExplain: data.reason
                })
                console.log(popUp)
            }
        })   
    }
     
   
    
    
    return(
        <div>
            <h1>TripTremp</h1>
            {!showPopUp?<div className="signUpCard">
                <div className="signUpBox">
                    <h1>Sign Up</h1>
                    <hr/>

                    <div className="name">
                        <label>First Name</label>
                    
                        <label>Last Name</label>
                    </div>

                    <div className="name">
                        <input autoComplete="off" autoFocus type={"text"} placeholder="First name:" name="FName" value={userInfo.FirstName} onChange={handleChange}></input>
                    
                        <input autoComplete="off" type={"text"} placeholder="Last Name:" name="LName" value={userInfo.LastName} onChange={handleChange}></input>
                    </div>

                    <label>Email</label>
                    <input autoComplete="off" className={isErrorActive[0] ? 'inputErr': null} type={"email"} placeholder="Your Email:" name="Email" value={userInfo.EmailInput} onChange={handleChange} onBlur={leaveInput}></input>
                    
                    <label>Confirm Email</label>
                    <input autoComplete="off" className={isErrorActive[1] ? 'inputErr': null} type={"email"} placeholder="Confirm Your Email:" name="ConfirmEmail" value={userInfo.ConfirmEmailInput} onChange={handleChange} onBlur={leaveInput}></input>
                    
                    <label>Password</label>
                    <input autoComplete="off" className={isErrorActive[2] ? 'inputErr': null} type={"password"} placeholder="Your Password:" name="Password" value={userInfo.PasswordInput} onChange={handleChange} onBlur={leaveInput}></input>
                    
                    {userInfo.PasswordInput!==""?<PasswordStrengthBar className="passwordStrongBar" password={userInfo.PasswordInput} />:null}
                    
                    <label>Confirm Password</label>
                    <input autoComplete="off" className={isErrorActive[3] ? 'inputErr': null} type={"password"} placeholder="Confirm Your Password:" name="ConfirmPassword" value={userInfo.ConfirmPasswordInput} onChange={handleChange} onBlur={leaveInput}></input>
                    
                    
                    <div hidden={!showPassCheckList}>
                        <PasswordChecklist
                            rules={["minLength", "number","capital","match"]} //i removed ,"specialChar", for special characters
                            minLength={8}
                            value={userInfo.PasswordInput}
                            valueAgain={userInfo.ConfirmPasswordInput}
                            onChange={(isValid) => activateSignBtn(isValid)}
                        />
                    </div>
                    
                    <div className="buttonsCancelLogin">
                        <button disabled={signBtnDisable} onClick={signUpBtn}>SignUp</button>
                        <button onClick={backToLogin}>Back</button>
                    </div>
                </div>
            </div>:
            <PopUpMessage 
            title={popUp.popUpTitle} 
            explain={popUp.popUpExplain}
            btnName="login"
            navigate="/login"
            />
            }
        </div>
    )
}

export default SignUpPage