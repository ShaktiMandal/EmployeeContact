import React, {useRef, useEffect, useState, useContext} from 'react';
import GroupItem from '../components/groupitem';
import SearchPanel from '../components/searchpanel';
import classes from '../style/groups.module.css';
import PopUp from '../components/popup';
import { getGroupsApi } from '../proxy/serviceproxy';
import { AppContext } from './appContext';


const Groups = () => {

    const conatactRef = useRef(null);
    const [contactDetails, setContactDetails] = useState({
        email: "",
        phoneNumber: "",
        error: ""
    })

    const [groupDetails, setGroupDetails] = useState({
        groupName:"",
        description: "",
        error: ""
    });

    const [componentName, setComponentName] = useState("");
    const [groups, setGroups] = useState([]);

    const onValueChange = (event) => {
        if(componentName === "Contact")
        {
            setContactDetails({...contactDetails, [event.target.name]: event.target.name});
        }
        else if(componentName === "Group")
        {
            setGroupDetails({...groupDetails, [event.target.name]: event.target.value});
        }
    }

    useEffect(()=> {

        if(localStorage.getItem("email"))
        {
            getGroupsApi(localStorage.getItem("email"))
            .then( result => {
                if(result.success)
                {
                    setGroups(result.userGroups);
                    console.log("Printing the result", result);
                }
                else
                {
                    console.log("no the result", result);
                }
            })
        }

        conatactRef.current.style.display = "none"; 
    },[])

    const onSubmit = () => {
        if(componentName === "Contact")
        {
            onAddContact();
        }
        else if(componentName === "Group")
        {
            onGroupEdit();
        }
    }

    const onAddContact = () => {

        setComponentName("Contact")
        conatactRef.current.style.display = "block"; 
    }

    const onGroupEdit = () => {
        setComponentName("Group")
        conatactRef.current.style.display = "block"; 
    }

    const onRemoveGroup = () => {
        alert("remove");
    }
    const onCloseButton = () => {
        conatactRef.current.style.display = "none"; 
    }
  

    const onSearch = (event) => {

    }

    return (
        <div> 
            <SearchPanel onSearch = {onSearch}/>
            <div className={classes.displayGroup}> 
            {

                groups.length > 0 ?

                <ul style={{margin: "0px"}}>
                                    
                    {
                        groups.map(eachGroup => {
                            return <GroupItem 
                            groupName = {eachGroup.groupName}
                            description = {eachGroup.description}
                            onAddConatct = {onAddContact} 
                            onGroupEdit={onGroupEdit}
                            onRemoveGroup = {onRemoveGroup}
                            />
                        })
                    }              
                                    
                </ul> : <>User Dont have any group</>
            }               
               
            </div>
            <div className={classes.createContact} ref={conatactRef}>
                    {componentName === "Group" ?   <PopUp 
                        heading = "Create Group"
                        firstHeading = "Group Name"
                        secondHeading = "Description"
                        firstInputType= "text"
                        secondInputType = "text"
                        firsInputId = "groupNameId"              
                        secondInputId = "descriptionId"
                        secondInputName = "description"
                        firstInputName = "groupName"
                        firstPlaceholder = "Enter group name"
                        secondPlaceholder = "Enter description"
                        buttonCaption = "Create Group"
                        firstInputValue = {groupDetails.groupName}
                        secondInputValue = {groupDetails.description}
                        onValueChange = {onValueChange}
                        onSubmit = {onSubmit}
                        onCloseButton={onCloseButton}/> :
                        componentName === "Contact" ?
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
                                            secondInputValue = {contactDetails.phoneNumber}
                                            onValueChange = {onValueChange}
                                            onSubmit = {onSubmit}
                                            onCloseButton={onCloseButton}/> : null
                        
                    }
            </div>
        </div>
    )
}

export default Groups;