import { createUUID } from "../service/utils";
import { groupDB } from "./groups";

var contactDB = (function() {
    
    return function()
    {
        const getContacts = function(grpId) {  

            return groupDB().getGroup(grpId)[0].contacts;
        }

        const getContact = function(grpId, contactId)
        {         
            return getContacts(grpId).filter(contact =>  contact.id === contactId);
        }

        const searchContact = (searchValue) => {

            let result = [];
            let groups = groupDB().getGroups();
            groups.forEach(element => {
                if(element.contacts !== undefined && element.contacts.length > 0)
                {
                    if(searchValue.length > 0)
                    {
                        result = result.concat(element.contacts.filter(contact => contact.email.includes(searchValue) || contact.phoneNumber.includes(searchValue) ));
                    }
                    else
                    {
                        result = result.concat(...element.contacts);
                    }
                }
                
            });
            return result;
        }

        const addContact = function(grpId, contactDetails) {  
            contactDetails.id = createUUID();          
            let groups = groupDB().getGroups();
            let matchIndex = groups.findIndex(item => item.groupId === grpId);
            groups[matchIndex].contacts.push(contactDetails);

            //Storing data in localstorage
            if(localStorage.getItem("Groups"))
            {
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
        }

        const updateContact = function(grpId, contactDetails) {

            let groups = groupDB().getGroups();
            let matchIndex = groups.findIndex(item => item.groupId === grpId);
            let contactINdex = groups[matchIndex].contacts.findIndex(item => item.id === contactDetails.id);

            groups[matchIndex].contacts[contactINdex].phoneNumber = contactDetails.phoneNumber;
            groups[matchIndex].contacts[contactINdex].email = contactDetails.email;

            if(localStorage.getItem("Groups"))
            {
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
        }

        const removeContact = function(groupId, contactId) {   
            let groups = groupDB().getGroups();
            let matchIndex = groups.findIndex(item => item.groupId === groupId);
            groups[matchIndex].contacts = groups[matchIndex].contacts.filter(contact => contact.id !== contactId);

            if(localStorage.getItem("Groups"))
            {
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
        }
        return {
            addContact,
            getContact,
            getContacts,
            updateContact,
            removeContact,
            searchContact        
        }
    }
}
)();


export {contactDB}