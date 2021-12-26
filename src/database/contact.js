import { createUUID } from "../service/utils";
import { groupDB } from "./groups";

var contactDB = (function() {
    
    return function()
    {
        const getContacts = function(grpId) {  

            return groupDB().getGroup(grpId)[0].Contacts;
        }

        const getContact = function(grpId, contactId)
        {         
            return getContacts(grpId).filter(contact =>  contact.id === contactId);
        }

        const addContact = function(grpId, contactDetails) {  
            contactDetails.id = createUUID();          
            let group = groupDB().getGroup(grpId);
            return group.contacts.push(contactDetails);
        }

        const updateContact = function(grpId, contactDetails) {

            let contacts = groupDB().getGroup(grpId);
            let contact = contacts.filter(item => item.id === contactDetails.id);
            contact[0].phoneNumber = contactDetails.phoneNumber;
            contact[0].email = contactDetails.email;
        }

        const removeContact = function(groupId, contactId) {     
            let group = groupDB().getGroup(groupId);;
            let contacts = group[0].contacts;
            group[0].Contacts = contacts.filter(contact => contact.id !== contactId)
        }
        return {
            addContact,
            getContact,
            getContacts,
            updateContact,
            removeContact        
        }
    }
}
)();


export {contactDB}