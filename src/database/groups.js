import { getUserGroups } from '../service/service';
import {createUUID} from '../service/utils';

var groupDB = (function() {

    return function()
    {
        const getGroups = function(email="") {
        
            let groups = JSON.parse(localStorage.getItem("Groups") || "[]");
            if(email.length > 0)
            {
                return groups.filter(item => item.email === email);
            }
            return groups;
        }

        const getGroup = function(grpId)
        {
            let groups = JSON.parse(localStorage.getItem("Groups") || []);
            return groups.filter(item => item.groupId === grpId); 
        }

        const createGroup = function(groupDetails) {
            let groups = [];
            groupDetails.groupId = createUUID();
            groupDetails.contacts = [];           
            if(localStorage.getItem("Groups"))
            {
                groups = JSON.parse(localStorage.getItem("Groups")|| "[]");
                groups.push({
                    groupId: groupDetails.groupId,
                    email: groupDetails.email,
                    groupName : groupDetails.groupName,
                    description: groupDetails.description,
                    contacts: []
                });

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

            let groups = groupDB().getGroups(groupDetails.email);
            let matchIndex = groups.findIndex(item => item.groupId === groupDetails.groupId); 
            
            groups[matchIndex].groupName = groupDetails.groupName;
            groups[matchIndex].description = groupDetails.description;

            if(localStorage.getItem("Groups"))
            {
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
            return groups;
        }

        const removeGroup = function(groupId) {
            
            let groups = JSON.parse(localStorage.getItem("Groups"))
            groups = groups.filter(group =>  group.groupId !== groupId);          

            if(localStorage.getItem("Groups"))
            {
                localStorage.setItem("Groups", JSON.stringify(groups));
            }
            return groups;
        }


        const SearchGroup = (searchValue) => {
            let groups = groupDB().getGroups();

            if(groups.length > 0)
            {
                return groups.filter(group => {
                    return group.groupName.includes(searchValue);
                })
            }
            return [];
        }


        return {
            getGroup,
            getGroups,
            updateGroup,
            createGroup,
            removeGroup,
            SearchGroup
        }
    }
}
)();


export {groupDB}