import React, {useRef, useEffect, useState} from 'react';
import GroupItem from '../components/groupitem';
import SearchPanel from '../components/searchpanel';
import classes from '../style/groups.module.css';
import PopUp from '../components/popup';
import { createContactApi, deleteGroupApi, getGroupsApi, searchGroupApi, updateGroupApi } from '../proxy/serviceproxy';
import { debounceSearch } from './shared';


const Groups = (props) => {


    const initializeConatct = {
        email: "",
        phoneNumber: "",
        groupId: "",
        conatctId: "",
        error: ""
    }

    const initializeGroup = {
        groupName:"",
        description: "",
        email: "",
        id: "",
        error: ""
    }

    const [selectedGroupIndex, setGroupIndex] = useState(-1);
    const conatactRef = useRef(null);
    const [contactDetails, setContactDetails] = useState(initializeConatct)
    const [groupDetails, setGroupDetails] = useState(initializeGroup);
    const [componentName, setComponentName] = useState("");
    const [groups, setGroups] = useState([]);
    const [userSearched, setUserSearched] = useState(false);

    const onValueChange = (event) => {
        if(componentName === "Contact")
        {
            setContactDetails({...contactDetails, [event.target.name]: event.target.value});
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
                }
                else
                {
                    
                }
            })
        }

        conatactRef.current.style.display = "none"; 
    }, [props.updated])

    const onSubmit = () => {
        if(componentName === "Contact")
        {
            createContactApi( 
                {
                    email:contactDetails.email, 
                    phoneNumber: contactDetails.phoneNumber, 
                    groupId: groups[selectedGroupIndex].groupId 
                })
                .then(result => {
                    if(result.success)
                    {
                        conatactRef.current.style.display = "none";
                        setGroupDetails(initializeGroup);
                    }
                    else
                    {
                        setContactDetails({...contactDetails, error: result.errorMessage});
                    }
                })
                .catch(error => {    
                    setContactDetails({...contactDetails, error: error.errorMessage});                  
                })
               
        }
        else if(componentName === "Group")
        {
            updateGroupApi({
                groupName: groupDetails.groupName,
                description: groupDetails.description,
                email: groups[selectedGroupIndex].email,
                groupId: groups[selectedGroupIndex].groupId
            })
            .then(result => {
                if(result.success)
                {
                    setGroups(result.userGroups);
                    conatactRef.current.style.display = "none";
                }
                else
                {
                    setGroupDetails({...groupDetails, error: result.errorMessage});
                }
            })
            .catch(error => {
                setGroupDetails({...groupDetails, error: error.errorMessage});
            })           
        }
    }

    const onAddContact = (index) => {
        setComponentName("Contact");
        setGroupIndex(index)
        conatactRef.current.style.display = "block"; 
    }

    const onGroupEdit = (index) => {    
        setComponentName("Group"); 
        setGroupDetails({...groupDetails, groupName: groups[index].groupName, description: groups[index].description})
        setGroupIndex(index)
        conatactRef.current.style.display = "block"; 
    }

    const onRemoveGroup = (index) => {
        deleteGroupApi(groups[index].groupId)
        .then(result => {
                if(result.success)
                {
                    setGroups(result.userGroups);
                }
                else
                {
                    setGroupDetails({...groupDetails, error: result.errorMessage});
                }
            })
            .catch(error => {
                setGroupDetails({...groupDetails, error});
            })    
    }
    const onCloseButton = () => {
        if(componentName === "Contact")
        {
            setContactDetails(initializeConatct);
        }
        else if(componentName === "Group")
        {
            setGroupDetails(initializeGroup);
        }
        conatactRef.current.style.display = "none"; 
    }
  

    const onSearch = debounceSearch((inputEvent) => {
        setUserSearched(true);
        searchGroupApi(inputEvent.target.value)
        .then(result => {
            setGroups(result.groups);
        })
        .catch(error => {
            setGroupDetails({...groupDetails, error});
        });
    }, 100)

    return (
        <div className={classes.groupSection}> 
            { groups.length > 0 || userSearched ? <SearchPanel  placeholder= "Search group - group name" onSearch = {onSearch}/> : null}
            <div className={classes.displayGroup}> 
            {

                groups.length > 0 ?
                <ul className={classes.usergroups}>
                                    
                    {
                        groups.map((eachGroup, index) => {
                            return(
                            <li key={eachGroup.groupId}>
                                <GroupItem 
                                groupName = {eachGroup.groupName}
                                description = {eachGroup.description}
                                onAddConatct = {()=> onAddContact.call(null, index)} 
                                onGroupEdit={()=> onGroupEdit.call(null, index)}
                                onRemoveGroup = {()=> onRemoveGroup.call(null, index)}
                                />
                            </li>
                            )
                        })
                    }              
                                    
                </ul> : <>User Dont have any group</>
            }               
               
            </div>
            <div className={classes.createContact} ref={conatactRef}>
                    {componentName === "Group" ?   <PopUp 
                        heading = "Edit Group"
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
                        buttonCaption = "Update Group"
                        firstInputValue = {groupDetails.groupName}
                        secondInputValue = {groupDetails.description}
                        errorMsg = {groupDetails.error}
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
                                            secondInputName = "phoneNumber"
                                            firstInputName = "email"
                                            firstPlaceholder = "Enter email id"
                                            secondPlaceholder = "Enter phone number"
                                            buttonCaption = "Add Contact"
                                            firstInputValue = {contactDetails.email}
                                            secondInputValue = {contactDetails.phoneNumber}
                                            errorMsg = {contactDetails.error}
                                            onValueChange = {onValueChange}
                                            onSubmit = {onSubmit}
                                            onCloseButton={onCloseButton}/> : null
                        
                    }
            </div>
        </div>
    )
}

export default Groups;