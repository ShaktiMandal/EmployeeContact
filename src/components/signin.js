import React from 'react';
import classes from '../style/authentication.module.css';
import Input from './Input';
import Hyperlink from './Hyperlink';

const SignIn = (props) => {

    return(
                <div className={classes.logInform}> 
                    <h3>Sign in</h3>
                    <div>                           
                        {props.errorMsg === undefined || props.errorMsg.length === 0 ? null : <h4>{props.errorMsg}</h4>}
                    </div>
                    <div className={classes.inputdiv}>                     
                        <Input type="email"      
                        id = {props.emailId}
                        name="email"
                        isRequired 
                        placeholder= {props.emailPlaceholder}                                                 
                        onValueChange={props.onValueChange}
                        inputValue ={props.email}
                        />
                       
                    </div>
                    <div className={classes.inputdiv }>                       
                        <Input type="password"    
                                 name="password"                         
                        id = {props.passwordId}
                        isRequired 
                        placeholder= {props.passwordPlaceholder}       
                        onValueChange={props.onValueChange}
                        inputValue ={props.password}
                        />
               
                    </div>
                    <div className={classes.HyperLinkItem}>
                        <div className={classes.SignUpLink}>
                            Don't have accunt ?<Hyperlink className={classes.SignUp} LinkedTo='/register'> Sign up </Hyperlink>
                        </div>
                    </div>      
                    <div className={classes.loginbtndiv}>
                        <button className={classes.logInBtn}                   
                        onClick = {props.onSignIn}
                        type="button">Sign in</button>                               
                    </div>                         
                </div>

    )
}

export default SignIn;