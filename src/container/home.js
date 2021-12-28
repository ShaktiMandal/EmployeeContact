import React, {useEffect, useState, useRef, useContext, memo} from 'react';
import Navbar from '../components/navbar';
import Groups from './groups';
import classes from '../style/home.module.css'
import Conatcts from './contacts';
import PopUp from '../components/popup';
import { createGroupApi } from '../proxy/serviceproxy';
import { AppContext } from './appContext';
import { clearLocalStorage } from './shared';
import { useNavigate } from 'react-router';


const Home = () => {

    const groupRef = useRef(null);
    const [isUpdated, setUpdate] = useState(false);
    const {context} = useContext(AppContext);
    const [groupDetails, setGroupDetails] = useState({
        groupName:"",
        description: "",
        email: "",
        error: ""
    });

    const navigate = useNavigate();

    const onValueChange = (event) => {
        setGroupDetails({...groupDetails, [event.target.name]: event.target.value});
    }

    useEffect(()=> {

        groupRef.current.style.display = "none";
        let email = localStorage.getItem("email");
        setGroupDetails({...groupDetails, email})
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
                    setUpdate(true);                   
                    groupRef.current.style.display = "none";
                    setGroupDetails(
                    {   ...groupDetails,   
                        groupName:"",
                        description: "",
                        email: "",
                        error: ""
                    })
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

    const onSignOut = () => {
        clearLocalStorage();
        navigate("/signin");
    }

    return(
        <React.Fragment>
            <Navbar onOpenGroup={onOpenGroup} onSignOut= {onSignOut}/>
            {window.location.toString().includes('/contact') ? <Conatcts context={context}/> : <Groups updated = {isUpdated} context={context}/> }
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
                    secondInputValue = {groupDetails.description}
                    onValueChange = {onValueChange}
                    onSubmit = {onSubmit}
                    onCloseButton={onCloseButton}/>
            </div>
        </React.Fragment>        
    )
}

export default Home;