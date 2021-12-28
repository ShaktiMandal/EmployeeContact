import {Navigate} from 'react-router-dom';

const clearLocalStorage = () => {    
    localStorage.removeItem("loginToken");
    localStorage.removeItem("email");
}

function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("token");
    return auth ? children : <Navigate to="/" />;
  }


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
  
// (function(){
//   setTimeout(() => {
//     window.alert("Your session has expired, Please log back again");
//     clearLocalStorage();
//   }, 50000)})();

export {clearLocalStorage, ProtectedRoute, debounceSearch}