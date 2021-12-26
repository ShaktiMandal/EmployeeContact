var userDB = (function() {
        let users = [];

        return function()
        {
            const getUser = function(user) {
            
                return users.filter(item => item.email === user.email);
            }

            const setUser = function(user) {
                users.push(user);
            }


            return {
                getUser,
                setUser
            }
        }
    }
)();


export {userDB}