import {createUUID} from '../service/utils';

var groupDB = (function() {

    let groups = [];
    return function()
    {
        const getGroups = function(email) {
        
            return groups.filter(item => item.email === email);
        }

        const getGroup = function(grpId)
        {
            return groups.filter(item => item.id === grpId); 
        }

        const createGroup = function(groupDetails) {
            groupDetails.id = createUUID();
            groupDetails.contacts = [];
            groups.push(groupDetails);
            return groups;
        }

        const updateGroup = function(groupDetails) {
            let group = getGroup(groupDetails.id);
            group[0].name = groupDetails.name;
            group[0].description = groupDetails.description;
            group[0].groupId = groupDetails.groupId;
            group[0].email = groupDetails.email;
            return groups;
        }

        const removeGroup = function(groupId) {
            groups = groups.filter(group =>  group.id !== groupId);
            return groups;
        }


        return {
            getGroup,
            getGroups,
            updateGroup,
            createGroup,
            removeGroup
        }
    }
}
)();


export {groupDB}