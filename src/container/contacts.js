import React, { useEffect, useState } from 'react';
import SearchPanel from '../components/searchpanel';
import classes from '../style/groups.module.css';
import PopUp from '../components/popup';
import { deleteConatctApi, updateContactApi, searchContactApi } from '../proxy/serviceproxy';
import ConatctItem from '../components/contactitem';
import { debounceSearch } from './shared';


const Contacts = () => {

    const initializeContacts = {
        email: "",
        phoneNumber: "",
        groupId: "",
        id: "",
        error: ""
    }
    
    const conatactRef = React.useRef(null);
    const[contactDetails, setContactDetails] = useState(initializeContacts);
    const [contacts, setContacts] = useState([]);
    const [selectedIndex, setIndex] = useState(-1);
    const [userSearched, setUserSearched] = useState(false);

    useEffect(()=> {

        if(localStorage.getItem("Groups"))
        {
            // If tere is any contact present in the 
            //storage then just display on the sceen/
            let contacts = [];
            let groups = JSON.parse(localStorage.getItem("Groups") || "[]");

            //Taking each group , getiing the contact list from that group
            //then concatinating it to make it one array which will be used to 
            // display on the screen
            groups.forEach(group => {
                if(group.contacts !== undefined && group.contacts.length > 0)
                {
                    contacts = contacts.concat(...group.contacts);
                }
                
            });

            setContacts(contacts);

        }
        // This is to make sure that there is no 
        //pop when navigating to the screen
        // display pop up only when asked to display
        //used useRef to access the dom.
        conatactRef.current.style.display = "none";
        
    }, [])

    //Created debouncing function tlo improve serach 
    //functionlity/
    const onSearch = debounceSearch((event) => {
        //updated the value if user used search functionality
        //based on this, have to displau search panel on the screen.
        setUserSearched(true);
        searchContactApi(event.target.value)
        .then(result => {
            setContacts(result.contacts);
        })
        .catch(error => {
            setContactDetails({...contactDetails, error});
        });
    }, 100)

    const onRemoveContact = (index) => {
        deleteConatctApi(contacts[index].groupId, contacts[index].id)
        .then(result => {
            if(result.success)
            {
                let contacts = [];
                let groups = JSON.parse(
                  localStorage.getItem("Groups") || "[]"
                );
                groups.forEach((group) => {
                  if (
                    group.contacts !== undefined &&
                    group.contacts.length > 0
                  ) {
                    contacts = contacts.concat(...group.contacts);
                  }
                });

                if(contacts.length === 0)
                {
                    setUserSearched(false);
                }
                setContacts(contacts);
            }
            else
            {
                setContactDetails({...setContactDetails, error: result.errorMessage})
            }
        })
        .catch(error => {
            setContactDetails({...setContactDetails, error})
        })
    }

    const onConatctEdit = (index) => {

        //display the data when opening the pop up on edit mode.
        setContactDetails({...contactDetails, 
            email: contacts[index].email, 
            phoneNumber: contacts[index].phoneNumber});
        //setting the slected item index
        setIndex(index);
        //display pop up to edit the item
        conatactRef.current.style.display = "block";        
    }

    const onSubmit = () => {
        updateContactApi(contacts[selectedIndex].groupId, 
            {
                id: contacts[selectedIndex].id,
                email: contactDetails.email, 
                phoneNumber: contactDetails.phoneNumber
            })
        .then(result => {
            if(result.success)
            {
                    let contacts = [];
                    let groups = JSON.parse(
                      localStorage.getItem("Groups") || "[]"
                    );
                    groups.forEach((group) => {
                      if (
                        group.contacts !== undefined &&
                        group.contacts.length > 0
                      ) {
                        contacts = contacts.concat(...group.contacts);
                      }
                    });
                    conatactRef.current.style.display = "none";  
                    setContacts(contacts);
            }
            else
            {
                setContactDetails({...contactDetails, error: result.errorMessage})
            }
        })
        .catch(error => {
            setContactDetails({...contactDetails, error: error.errorMessage})
        })
       
    }

    const onCloseButton =() => {
        // clearing all data by initializing it
        setContactDetails(initializeContacts);
        // closing the pop up
        conatactRef.current.style.display = "none";
    }

    const onValueChange = (event) =>{
        setContactDetails({...contactDetails, [event.target.name]: event.target.value});
    }

    return (
        <div>            
            {contacts.length > 0 || userSearched ? <SearchPanel placeholder= "Search contact - email/phone number" onSearch = {onSearch}/> : null }
            <div className={classes.displayGroup}> 
                {
                    contacts.length > 0 ?
                    <ul className={classes.usergroups}>                                    
                    {
                        contacts.map((contact, index) => {
                            return(
                            <li key={contact.id}>
                                <ConatctItem 
                                email = {contact.email}
                                phoneNumber = {contact.phoneNumber}
                                onConatctEdit={()=> onConatctEdit.call(null, index)}
                                onRemoveContact = {()=> onRemoveContact.call(null, index)}
                                />
                            </li>
                            )
                        })
                    }              
                                                    
                    </ul> : <>User Dont have any contact</>
                }               
                
            </div>
            <div className={classes.createContact} ref={conatactRef}>
                
                        <PopUp 
                            heading = "Edit contact"
                            firstHeading = "Email"
                            secondHeading = "Phone Number"
                            firstInputType= "email"
                            secondInputType = "tel"
                            firsInputId = "emailId"              
                            secondInputId = "phoneNumberId"
                            firstInputName = "email"
                            secondInputName = "phoneNumber"
                            firstPlaceholder = "Enter email id"
                            secondPlaceholder = "Enter phone number"
                            buttonCaption = "Edit Contact"
                            firstInputValue = {contactDetails.email}
                            secondInputValue = {contactDetails.phoneNumber}
                            errorMsg = {contactDetails.error}
                            onValueChange = {onValueChange}
                            onSubmit = {onSubmit}
                            onCloseButton={onCloseButton}/>
            </div>
        </div>
    )
}

export default Contacts;