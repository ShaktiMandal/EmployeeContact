
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
            error: "user already exits"
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

    let errorMessage = validUser == null || validUser.length === 0 ? "User does not exist" : isPasswordMatched === false ? "Incorrect Password" : ""
    console.log("User signing", errorMessage);
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
    
    // let userGroups;
    // let matchedUser = users.find(item =>  item.email === email);
    // if(matchedUser.length > 0)
    // {
    //     userGroups = groups.filter(group => group.email === email);
    // }

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
                updatedGroup: groups,
                errorMessage: ""
            }
    }
    else
    {
        return {
            success : false, 
            updatedGroup: [],
            errorMessage: "No group present to update"
        }
    }
}

const deleteGroup = (grpId) => {

    let groups = groupDB().removeGroup(grpId);

    return {
        success : true, 
        groups,
        errorMessage: ""
    }
}

const createContact = (groupId, contactDetails) => {

    // let group = groups.filter(item => item.groupId === groupId);

    // if(group.length >  0)
    // {
    //     group[0].contacts.push(contactDetails);

    //     return {
    //         success : true, 
    //         groups,
    //         errorMessage: ""
    //     }
    // }

    // return {
    //     success : false, 
    //     groups,
    //     errorMessage: "Unable to create conatct"
    // }

    contactDB().addContact(groupId, contactDetails)
    return {
        groups: groupDB().getGroups(groupId),
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
    
    // if(groups.length > 0)
    // {
    //     let group = groups.filter(item => item.groupId === grpId);
    //     if(group.length > 0)
    //     {
    //         let contact = group[0].contacts.filter(item => item.id === contactDetails.id);
    //         if(contact.length > 0)
    //         {
    //             contact[0].email = contactDetails.email;
    //             contact[0].name = contactDetails.name;
    //         }

    //         return {
    //             success : true, 
    //             updatedContacts: group[0].contacts,
    //             errorMessage: ""
    //         }
    //     }

    //     return {
    //         success : false, 
    //         updatedContacts: [],
    //         errorMessage: "No contact present to update"
    //     }
    // }
    // return {
    //     success : false, 
    //     updatedGroup: [],
    //     errorMessage: "There is no group for this user"
    // }


    contactDB().updateContact(grpId, contactDetails);
    return {
        success : true, 
        updatedGroup: groupDB().getGroups(grpId),
        errorMessage: ""
    }
}

const deleteConatct = (grpId, contactId) => {

    // let contacts;
    // groups = groups.filter(item => item.groupId === grpId);

    // if(groups.length > 0)
    // {
    //     contacts = groups[0].conatcts = groups[0].conatcts.filter(contact =>  contact.id === contactId);
        
    // }

    // return {
    //     success : true, 
    //     contacts,
    //     errorMessage: ""
    // }

    contactDB().removeContact(grpId, contactId);
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
    deleteGroup
};