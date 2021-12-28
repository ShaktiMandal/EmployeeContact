import React from 'react';
import { Navigate } from 'react-router';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
const Authentication = React.lazy(()=> import("../container/authentication"));
const Home = React.lazy(()=> import("../container/home"));


const AppRoutes = () => {
  
    let isUserAuthenticated = false;
    if(localStorage.getItem("loginToken"))
    {
      console.log("Called for authentication");
      isUserAuthenticated = true;
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/signin" element={<Authentication />} />
          <Route exact path="/register" element={<Authentication />} />
          {
            isUserAuthenticated ?
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/home/group" element={<Home />} />
              <Route exact path="/home/contact" element={<Home />} />
            </> : <Route path ="*" element={<Authentication />}/>

          }
          <Route path="*" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes;

//private route
// return (
//     <BrowserRouter>
//       <Routes>
//         {!isUserAuthenticated && (
//           <>
//             <Route exact path="/signin" element={<Authentication />} />
//             <Route exact path="/register" element={<Authentication />} />
//           </>
//         )}
//         {isUserAuthenticated && (
//           <>
//             <Route exact path="/home" element={<Home />} />
//             <Route exact path="/home/group" element={<Home />} />
//             <Route exact path="/home/contact" element={<Home />} />
//           </>
//         )}
//         <Route exact path="*" element={<Navigate to={ isUserAuthenticated ? "/home" : "/"}/>}/>
//       </Routes>
//     </BrowserRouter>
//   );