import { getUserGroups } from '../service/service';
import {createUUID} from '../service/utils';

var groupDB = (function() {

    return function()
    {
        const getGroups = function(email) {
        
            let groups = JSON.parse(localStorage.getItem("Groups") || []);
            return groups.filter(item => item.email === email);
        }

        const getGroup = function(grpId)
        {
            let groups = JSON.parse(localStorage.getItem("Groups") || []);
            return groups.filter(item => item.id === grpId); 
        }

        const createGroup = function(groupDetails) {
            let groups = [];
            groupDetails.id = createUUID();
            groupDetails.contacts = [];           
            if(localStorage.getItem("Groups"))
            {
                groups = JSON.parse(localStorage.getItem("Groups")|| "[]");
                groups.push(groupDetails);
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
            else
            {
                groups.push(groupDetails);
                localStorage.setItem("Groups", JSON.stringify(groups));
                
            }

            return groups;
        }

        const updateGroup = function(groupDetails) {
            let group = getGroup(groupDetails.id);
            group[0].name = groupDetails.name;
            group[0].description = groupDetails.description;
            group[0].groupId = groupDetails.groupId;
            group[0].email = groupDetails.email;
            let groups = JSON.parse(localStorage.getItem("Groups"));
            localStorage.setItem("Groups", JSON.stringify(groups));
            return groups;
        }

        const removeGroup = function(groupId) {
            let groups = JSON.parse(localStorage.getItem("Groups"))
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