import {
    getUserDetails, 
    registerUser, 
    signinUser,  
    updateContact, 
    updateGroup, 
    createContact, 
    createGroup, 
    getEmployeeContact, 
    getUserGroups,
    deleteConatct,
    deleteGroup} from '../service/service'
import {formValidation } from '../validator'


const userRegistration = (userDetails) => {
    console.log("Register data2", userDetails);
    return new Promise((resolve, reject) => {

        let errorMessage = formValidation(userDetails);        
        if(errorMessage.length === 0)
        {    console.log("Register data3", errorMessage);
            resolve(registerUser(userDetails))
        }
        else
        {
            console.log("Register data3", errorMessage);
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
        resolve(getUserGroups(emailId))
    })
}

const createGroupApi = (groupDetails) => {
    return new Promise((resolve, reject) => {
        resolve(createGroup(groupDetails))
    })
}

const getGroupsApi = (user) => {

    return new Promise((resolve, reject) => {
        resolve(getUserGroups(user))
    })
}

const updateGroupApi = (grpDetails) => {

    return new Promise((resolve, reject) => {
        resolve(updateGroup(grpDetails))
    })
}

const deleteGroupApi = (groupId) => {

    return new Promise((resolve, reject) => {
        resolve(deleteGroup(groupId))
    })
}

const createContactApi = (contactDetails) => {

    return new Promise((resolve, reject) => {
        resolve(createContact(contactDetails))
    })
}

const updateContactApi = (contactDetails) => {

    return new Promise((resolve, reject) => {
        resolve(updateContact(contactDetails))
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


// (Array.prototype.formatedString = () => 
// {
//     console.log("Formated string called");
//     if(this.length === 0)
//     {
//         return ""
//     }
//     else
//     {
//         let formatedString;
//         let split = this.split(",");
//         console.log("Formated string called", split);
//         for(let index = 0; index < split.length; index++)
//         {
//             if(this.length === 1)
//             {
//                 formatedString = split[index]
//             }
//             else
//             {
//                 formatedString += "\n" + split[index]
//             }
//         }

//         console.log("Formated string called", split);
//         return formatedString;
//     }
// })()


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
    getGroupsApi
}