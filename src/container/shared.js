import {Navigate} from 'react-router-dom';

const clearLocalStorage = () => {    
    localStorage.removeItem("loginToken");
    localStorage.removeItem("email");
}


//Created protected route.
//however, currently not being used
// can be used in future
function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("token");
    return auth ? children : <Navigate to="/" />;
  }



  // Common debounce function, can be used through out all application
const debounceSearch = (callbackFn, waitTime) => {

  let timeOutHandler = null;
  return function(...args)
  {
    if(timeOutHandler == null)
    {
      callbackFn.call(null, args[0]);
    }

    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(()=> {
        timeOutHandler = null;
      }, waitTime)
  }

}


// This function is used to auto log out 
//the user if session is inactive for certain amount of time
//As of now, not added in this applicaiton.

// (function(){
//   setTimeout(() => {
//     window.alert("Your session has expired, Please log back again");
//     clearLocalStorage();
//   }, 50000)})();

export {clearLocalStorage, ProtectedRoute, debounceSearch}