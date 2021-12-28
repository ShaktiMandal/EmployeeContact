import {Navigate} from 'react-router-dom';

const clearLocalStorage = () => {    
    localStorage.removeItem("loginToken");
    localStorage.removeItem("email");
}

function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("token");
    return auth ? children : <Navigate to="/" />;
  }
  
(function(){
  setTimeout(() => {
    window.alert("Your session has expired, Please log back again");
    clearLocalStorage();
  }, 50000)})();

export {clearLocalStorage, ProtectedRoute}