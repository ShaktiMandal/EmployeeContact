import { contactDB } from '../database/contact';
import { groupDB } from '../database/groups';
import {userDB} from '../database/users'
import {createUUID} from './utils';

const registerUser = (userDetails) => {
    let user = userDB().getUser(userDetails);
    if(user.length > 0)
    {
        return{
            success: false,
            email: user.email,
            error: "user already exists"
        }
    }
    else
    {
        userDB().setUser(userDetails);      
        return{
           
            success: true,
            email: user.email,
            error: ""
        }
    }
}

const signinUser = (userDetails) => {

    let isPasswordMatched = false;
    let validUser = userDB().getUser(userDetails);
    if(validUser.length > 0)
    {
        isPasswordMatched = validUser[0].password === userDetails.password;
    }

    let errorMessage = validUser == null || validUser.length === 0 ? "User does not exists" : isPasswordMatched === false ? "Incorrect Password" : ""

    return {
        success: errorMessage.length === 0 ? true: false,
        email: userDetails.email,
        token: errorMessage.length === 0 ? createUUID() : "",
        error: errorMessage 
    }
}

const getUserDetails = (user) => {
    return userDB().getUser(user);
}

const createGroup = (grpDetails) => {

    let groups = groupDB().createGroup(grpDetails);
    return {
        groups: groups,
        success: true,
        errorMesssage: ""
    }
}

const getUserGroups = (email) => {
   
    let userGroups = groupDB().getGroups(email);
    if(userGroups.length > 0)
    {
        return {
            success: true, 
            userGroups,
            errorMessage: ""
        }
    }
    else
    {
        return {
            success: false, 
            userGroups: [],
            errorMessage: "Please create group"
        }
    }
}

const updateGroup = (grpDetails) => {    

    let groups = groupDB().updateGroup(grpDetails);
    if(groups.length > 0)
    {
            return {
                success : true, 
                userGroups: groups,
                errorMessage: ""
            }
    }
    else
    {
        return {
            success : false, 
            userGroups: [],
            errorMessage: "No group present to update"
        }
    }
}

const deleteGroup = (grpId) => {

    let groups = groupDB().removeGroup(grpId);

    return {
        success : true, 
        userGroups: groups,
        errorMessage: ""
    }
}

const createContact = (contactDetails) => {

    contactDB().addContact(contactDetails.groupId, contactDetails)
    return {
        groups: groupDB().getGroups(contactDetails.groupId),
        success: true,
        errorMesssage: ""
    }

}

const getEmployeeContact = (grpId) => {
    
    // let group;
    // let user = users.find(item =>  item.email === user.email);
    // if(user.length > 0)
    // {
    //     group = groups.filter(group => group.email === user.email);
    // }

    // if(group.length > 0 && group[0].length > 0)
    // {
    //     return {
    //         success: true, 
    //         userContacts: group[0].contacts,
    //         errorMessage: ""
    //     }
    // }
    // else
    // {
    //     return {
    //         success: false, 
    //         userContacts: [],
    //         errorMessage: "No Contact available for this group"
    //     }
    // }
}

const updateContact = (grpId, contactDetails) => {
    
    contactDB().updateContact(grpId, contactDetails);
    return {
        success : true, 
        updatedGroup: groupDB().getGroups(grpId),
        errorMessage: ""
    }
}

const deleteConatct = (grpId, contactId) => {
    let currentCount = contactDB().getContacts(grpId).length;
    contactDB().removeContact(grpId, contactId);
    let updatedCount = contactDB().getContacts(grpId).length;
    return {
        success : currentCount - updatedCount === 1 ? true : false, 
        contacts: groupDB().getGroups(grpId),
        errorMessage: currentCount - updatedCount === 1 ? "" : "Unable to remove contact"
    }
}

const searchContacts = (searchValue) => {
    let searchedResult = contactDB().searchContact(searchValue);
    if(searchedResult.length > 0)
    {
        return{
            success: true, 
            contacts: searchedResult,
            error: ""
        }
    }
    else
    {
        return{
            success: false,
            contacts: [],
            error: "No search result found"
        }
    }
}

const searchGroups = (searchValue) => {
    let searchedResult = groupDB().SearchGroup(searchValue);
    if(searchedResult.length > 0)
    {
        return{
            success: true, 
            groups: searchedResult,
            error: ""
        }
    }
    else
    {
        return{
            success: false,
            groups: [],
            error: "No search result found"
        }
    }
}


export {
    registerUser, 
    signinUser, 
    updateContact, 
    updateGroup, 
    createContact, 
    createGroup, 
    getEmployeeContact, 
    getUserGroups, 
    getUserDetails,
    deleteConatct,
    deleteGroup,
    searchContacts,
    searchGroups,
};