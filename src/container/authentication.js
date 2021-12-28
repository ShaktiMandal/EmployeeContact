import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router'
import SignIn from '../components/signin';
import Registration from '../components/resgistration';
import { userRegistration, userAuthentication } from '../proxy/serviceproxy';
import { AppContext } from './appContext';

const Authentication = () => {

    let initializeAuthData = {
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        adharNo:"",
        authenticationError: ""
    }

    const navigate = useNavigate();
    const {context, setContext} = useContext(AppContext);   
    const [autheticationData, setAuthenticationData] = useState(initializeAuthData);

    

    const onValueChange = (event) =>{
        setAuthenticationData({...autheticationData, [event.target.name]: event.target.value})
    }

    const onSignIn = () => { 
        const {email, password} = autheticationData;
        userAuthentication({email, password})
        .then(result => { 
            if(result.success)
            {  
                //set the token and email for authentication purpose
                localStorage.setItem("loginToken", result.token);
                localStorage.setItem("email", result.email);
                navigate("/home");
                setContext({email: result.email});
            }
            else
            {
                //set error message in case have any error
                setAuthenticationData({...autheticationData, authenticationError: result.error});
            }
        })
        .catch(error => {
            setAuthenticationData({...autheticationData, authenticationError: error.errorMessage});
        })
    }

    const onRegister = () =>{
        userRegistration(autheticationData)
        .then(result => {
            const {success} = result;
            if(success)
            { 
                //initialize all data to avoid displaying on then 
                //screen if reopens.
                setAuthenticationData(initializeAuthData);
                navigate('/signin')
            }
            else
            {
                //setting error  to display same on the screen
                setAuthenticationData({...autheticationData, authenticationError: result.error});
            }
        })
        .catch(error => {
            setAuthenticationData({...autheticationData, authenticationError: error.errorMessage});
        })
    }


    //Getting the current location 
    //to decide which component to be 
    //rerendered.
    let path = window.location;
    let renderScreen;
    
    
    if(path.toString().includes("/register"))
    {
            renderScreen =      <Registration
                                emailId="emailId" 
                                passwordId="password"
                                firstNameId="firstNameId" 
                                lastNameId="lastNameId"
                                adharId="adharId"
                                isRequired="true" 
                                emailPlaceholder = "example@inmar.com"    
                                passwordPlaceholder = "Enter password" 
                                firstNamePlaceholder = "Enter first name"    
                                lastNamePlaceholder = "Enter last name"  
                                adharPlaceholder = "Enter adhar no" 
                                onValueChange={onValueChange} 
                                email = {autheticationData.email}
                                password = {autheticationData.password}    
                                firstName = {autheticationData.firstName}
                                lastName = {autheticationData.lastName}  
                                adharNo = {autheticationData.adharNo}                             
                                errorMsg = {autheticationData.authenticationError}
                                onRerister = {onRegister}
                            />;
    }
    else
    {
            renderScreen =    <SignIn emailId="emailId" 
                                passwordId="password"
                                isRequired="true" 
                                emailPlaceholder = "example@inmar.com"    
                                passwordPlaceholder = "Enter password"    
                                onValueChange={onValueChange} 
                                onSignIn={onSignIn} 
                                email = {autheticationData.email}
                                password = {autheticationData.password}                               
                                errorMsg = {autheticationData.authenticationError}      
                                />;
    }
    return renderScreen;   
}

export default Authentication;