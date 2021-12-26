import React from 'react';
import classes from '../style/Input.module.css';


const Input = (props) =>{
    
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
        />
    )
}

export default Input;