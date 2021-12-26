import React from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
const Authentication = React.lazy(()=> import("../container/authentication"));
const Home = React.lazy(()=> import("../container/home"));


const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signin" element = {<Authentication/>} />
                <Route exact path="/register" element = {<Authentication/>} />
                <Route exact path="/home" element = {<Home/>}/>    
                <Route exact path="/home/group" element = {<Home/>}/>
                <Route exact path="/home/contact" element = {<Home/>}/>       
                <Route exact path="/" element = {<Authentication/>} />
            </Routes>
        </BrowserRouter> 
    )
}

export default AppRoutes;