import {
    registerUser, 
    signinUser,  
    updateContact, 
    updateGroup, 
    createContact, 
    createGroup, 
    getEmployeeContact, 
    getUserGroups,
    deleteConatct,
    searchContacts,
    deleteGroup,
    searchGroups} from '../service/service'
import {fieldValidation, formValidation } from '../validator'


const userRegistration = (userDetails) => {
    return new Promise((resolve, reject) => {

        let errorMessage = formValidation(userDetails);        
        if(errorMessage.length === 0)
        {   
            resolve(registerUser(userDetails))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }
    })
}

const userAuthentication = (userDetails) => {
    return new Promise((resolve, reject) => {
        let errorMessage = formValidation(userDetails);        
        if(errorMessage.length === 0)
        {
            resolve(signinUser(userDetails));
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }
    })
}

const getUserApi = (emailId) => {

    return new Promise((resolve, reject) => {
        let errorMessage = fieldValidation(emailId);
        if(errorMessage.length === 0)
        {
            resolve(getUserGroups(emailId))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }
        
    })
}

const createGroupApi = (groupDetails) => {
    return new Promise((resolve, reject) => {

        let errorMessage = formValidation(groupDetails);
        if(errorMessage.length === 0)
        {
            resolve(createGroup(groupDetails))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }
        
    })
}

const getGroupsApi = (email) => {

    return new Promise((resolve, reject) => {

        let errorMessage = fieldValidation(email);
        if(errorMessage.length === 0)
        {
            resolve(getUserGroups(email))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }        
    })
}

const updateGroupApi = (grpDetails) => {

    return new Promise((resolve, reject) => {
        let errorMessage = formValidation(grpDetails);

        if(errorMessage.length === 0)
        {
            resolve(updateGroup(grpDetails))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }        
    })
}

const deleteGroupApi = (groupId) => {

    return new Promise((resolve, reject) => {
        resolve(deleteGroup(groupId))
    })
}

const createContactApi = (contactDetails) => {

    return new Promise((resolve, reject) => {
        let errorMessage = formValidation(contactDetails);

        if(errorMessage.length === 0)
        {
            resolve(createContact(contactDetails))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }   
      
    })
}

const updateContactApi = (groupId, contactDetails) => {

    return new Promise((resolve, reject) => {
      
        let errorMessage = formValidation(contactDetails);

        if(errorMessage.length === 0)
        {
            resolve(updateContact(groupId, contactDetails))
        }
        else
        {
            reject({
                success: false,
                errorMessage
            })
        }   
    })
}


const deleteConatctApi = (grpId, contactId) => {

    return new Promise((resolve, reject) => {
        resolve(deleteConatct(grpId, contactId))
    })
}


const getConactsApi = (grpId) => {

    return new Promise((resolve, reject) => {
        resolve(getEmployeeContact(grpId))
    })
}

const searchContactApi = (searchValue) => {
    return new Promise((resolve, reject) => { 
        resolve(searchContacts(searchValue));
    })
}

const searchGroupApi = (searchValue) => {
    return new Promise((resolve, reject) => { 
        resolve(searchGroups(searchValue));
    })
}

export {
    userRegistration, 
    userAuthentication, 
    getConactsApi, 
    updateContactApi, 
    createContactApi,
    getUserGroups,
    createGroupApi,
    updateGroupApi,
    deleteConatctApi,
    deleteGroupApi,
    getUserApi,
    getGroupsApi,
    searchContactApi,
    searchGroupApi
}