import React, {useEffect, useState, useRef, useContext, memo} from 'react';
import Navbar from '../components/navbar';
import Groups from './groups';
import classes from '../style/home.module.css'
import Conatcts from './contacts';
import PopUp from '../components/popup';
import { createGroupApi } from '../proxy/serviceproxy';
import { AppContext } from './appContext';


const Home = () => {

    const {context} = useContext(AppContext);
    const [groupDetails, setGroupDetails] = useState({
        groupName:"",
        description: "",
        email: "",
        error: ""
    });

    const groupRef = useRef(null);

    const onValueChange = (event) => {
        setGroupDetails({...groupDetails, [event.target.name]: event.target.value});
    }

    useEffect(()=> {

        if(localStorage.getItem("email") == null && context)
        {
            localStorage.setItem("email", context.email);
        }

        let email = localStorage.getItem("email");
        setGroupDetails({...groupDetails, email})
        
        groupRef.current.style.display = "none"; 
    },[])

    const onOpenGroup = () => {
        groupRef.current.style.display = "block"; 
    }

    const onSubmit = () => {
        if(groupDetails.email)
        {
            createGroupApi({
                groupName: groupDetails.groupName, 
                description: groupDetails.description, 
                email: groupDetails.email
            })
            .then(result => {
                if(result.success)
                {
                    // setGroupDetails({
                    //     email: result.userGroups
                    // })
                    groupRef.current.style.display = "none";
                }
            })
            .catch(error => {
                setGroupDetails({...groupDetails, error: error.errorMessage});
            })
        }
    }

    const onCloseButton = () => {
        groupRef.current.style.display = "none"; 
        setGroupDetails({});
    }

    return(
        <React.Fragment>
            <Navbar onOpenGroup={onOpenGroup}/>
            {window.location.toString().includes('/contact') ? <Conatcts context={context}/> : <Groups context={context}/> }
            <div className={classes.creategroup} ref={groupRef}>
                <PopUp 
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
                    secondPlaceholder = {groupDetails.description}
                    onValueChange = {onValueChange}
                    onSubmit = {onSubmit}
                    onCloseButton={onCloseButton}/>
            </div>
        </React.Fragment>        
    )
}

export default memo(Home);