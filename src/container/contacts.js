import React, { useEffect, useState, useContext } from 'react';
import Conatct from '../components/contactitem';
import SearchPanel from '../components/searchpanel';
import classes from '../style/groups.module.css';
import PopUp from '../components/popup';
import { AppContext } from './appContext';


const Contacts = () => {

    let items = [];
    const {context} = useContext(AppContext);
    let conatactRef = React.useRef(null);
    const[contactDetails, setContactDetails] = useState({
        email: "",
        phoneNumber: ""
    });

    useEffect((props)=> {
        conatactRef.current.style.display = "none";
        console.log("Printing context", context);
    }, [])

    const onSearch = (event) => {
        
    }

    const onRemoveContact = () => {
        alert("Remove");
    }

    const onConatctEdit = () => {
        conatactRef.current.style.display = "block";
    }

    const onSubmit = () => {
        conatactRef.current.style.display = "none";
    }

    const onCloseButton =() => {
        conatactRef.current.style.display = "none";
    }

    const onValueChange = (event) =>{
        setContactDetails({...contactDetails, [event.target.name]: event.target.value});
    }

    items.push(<Conatct onRemoveContact={onRemoveContact} onConatctEdit ={onConatctEdit} />);
    items.push(<Conatct onRemoveContact={onRemoveContact} onConatctEdit ={onConatctEdit} />);
    items.push(<Conatct onRemoveContact={onRemoveContact} onConatctEdit ={onConatctEdit} />);
    items.push(<Conatct onRemoveContact={onRemoveContact} onConatctEdit ={onConatctEdit} />);

    return (
        <div>
            <SearchPanel onSearch = {onSearch}/>
            <div className={classes.displayGroup}>                
                <ul style={{margin: "0px"}}>
                    {
                        items.map(item => item)
                    }
                </ul>
            </div>
            <div className={classes.createContact} ref={conatactRef}>
                
                        <PopUp 
                            heading = "Add contact"
                            firstHeading = "Email"
                            secondHeading = "Phone Number"
                            firstInputType= "email"
                            secondInputType = "tel"
                            firsInputId = "emailId"              
                            secondInputId = "phoneNumberId"
                            secondInputName = "email"
                            firstInputName = "phoneNumber"
                            firstPlaceholder = "Enter email id"
                            secondPlaceholder = "Enter phone number"
                            buttonCaption = "Add Contact"
                            firstInputValue = {contactDetails.email}
                            secondPlaceholder = {contactDetails.phoneNumber}
                            onValueChange = {onValueChange}
                            onSubmit = {onSubmit}
                            onCloseButton={onCloseButton}/>
            </div>
        </div>
    )
}

export default Contacts;