var userDB = (function() {
        let users = [];

        return function()
        {
            const getUser = function(user) {
            
                let users = JSON.parse(localStorage.getItem("Users") || "[]");
                return users.filter(item => item.email === user.email);
            }

            const setUser = function(user) {

                let users = [];
                if(localStorage.getItem("Users"))
                {
                    users = JSON.parse(localStorage.getItem("Users")|| "[]");
                    users.push(user);
                    localStorage.setItem("Users", JSON.stringify(users));
                }
                else
                {
                    users.push(user);
                    localStorage.setItem("Users", JSON.stringify(users));                
                }
            }

            return {
                getUser,
                setUser
            }
        }
    }
)();


export {userDB}