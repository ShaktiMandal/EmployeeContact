import React from 'react';
import classes from '../style/authentication.module.css';
import Input from './Input';
import Hyperlink from './Hyperlink';


const Registration = (props) => {

    return(
            <div className={classes.logInform}> 
            <h3>Registration</h3>
            <div>                           
                {props.errorMsg == undefined || props.errorMsg.length === 0 ? null : <h4 style={{textAlign:"center", color: "red"}}>{props.errorMsg}</h4>}
            </div>
            <div className={classes.inputdiv}>
                <h5>Email</h5>
                <Input type="email"   
                name="email"   
                id = {props.emailId}
                isRequired         
                placeholder= {props.emailPlaceholder}                                          
                onValueChange={props.onValueChange}
                InputValue ={props.email}
                />
            
            </div>
            <div className={classes.inputdiv }>
                <h5>Password</h5>
                <Input type="password"   
                name="password"                             
                id = {props.passwordId}
                isRequired 
                placeholder= {props.passwordPlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.password}
                />
            </div>
            <div className={classes.inputdiv }>
                <h5>Frist Name</h5>
                <Input type="text"  
                name="firstName"                              
                id = {props.firstNameId}
                isRequired 
                placeholder= {props.firstNamePlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.firstName}
                />
            </div>
            <div className={classes.inputdiv }>
                <h5>Last Name</h5>
                <Input type="text"    
                    name="lastName"                            
                id = {props.lastNameId}
                isRequired 
                placeholder= {props.lastNamePlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.lastName}
                />
            </div>
            <div className={classes.inputdiv }>
                <h5>Adhar No</h5>
                <Input type="text" 
                name="adharNo"                               
                id = {props.adharId}
                isRequired 
                placeholder= {props.adharPlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.adharNo}
                />
            </div>
             
            <div className={classes.loginbtndiv}>
                <button className={classes.logInBtn}                   
                onClick = {props.onRerister}
                type="button">Register</button>                               
            </div>                         
        </div>
    )
}


export default Registration;