import React from 'react';
import Input from './Input';
import classes from '../style/popup.module.css';

const PopUp = (props) => {

    return(
        <div className={classes.group}> 
            <h3>{props.heading}</h3>
            {/* <div>                           
                {props.ErrorMsg.length === 0 ? null : <h4 style={{textAlign:"center", color: "red"}}>{props.ErrorMsg}</h4>}
            </div> */}
            <div className={classes.inputdiv}>            
                <Input type={props.firstInputType}     
                id = {props.firsInputId}
                name= {props.firstInputName}
                isRequired 
                placeholder= {props.firstPlaceholder}                                               
                onValueChange={props.onValueChange}
                inputValue ={props.firstInputValue}
                />
            
            </div>
            <div className={classes.inputdiv }>
                <Input type={props.secondInputType}   
                name={props.secondInputName}                         
                id ={props.secondInputId}
                isRequired 
                placeholder= {props.secondPlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.secondInputValue}
                />

            </div>
            <div className={classes.createBtn}>
                <button className={classes.logInBtn}                   
                onClick = {props.onSubmit}
                type="button">{props.buttonCaption}</button>                               
            </div>   
            <span onClick={props.onCloseButton} className={classes.closeBtn}></span>                      
        </div>
    )
    

}

export default PopUp;