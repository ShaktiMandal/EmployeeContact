import { Route } from "react-router";
import {Navigate} from 'react-router-dom';

const clearLocalStorage = () => {    
    localStorage.removeItem("token");
    localStorage.removeItem("email");
}


// const ProtectedRoute = ({component:Component, ...rest}) =>{
   
//     let isAuthenticated = localStorage.getItem("token");
//     return (
//         <Route
//         {...rest}
//         render={(props) =>
//           isAuthenticated ? <Component {...props} /> : <Navigate to="/"/>
//         }/>
        
//         )
// }

function ProtectedRoute({ children }) {
    const auth = localStorage.getItem("token");
    return auth ? children : <Navigate to="/" />;
  }

export {clearLocalStorage, ProtectedRoute}