import React from 'react';
import classes from '../style/Input.module.css';


const Input = (props) =>{
    
    //made dynamically input emlement so that 
    //any one use it for the own purpose by
    //passign the respective props details
    return (
        <input
        name = {props.name}
        type={props.type} 
        readOnly = {props.isReadOnly}       
        autoComplete = "off"
        style = {props.customizeStyle}
        placeholder={props.placeholder} 
        required={props.isRequired}   
        maxLength={props.requiredLength}
        minLength ={props.minLength}
        pattern={props.inputPattern}
        onChange ={props.onValueChange} 
        onKeyDown = {props.onKeyPress}  
        value= {props.inputValue}   
        id = {props.id}  
        className={classes.InputStyle}
        autoComplete="off"
        />
    )
}

export default Input;