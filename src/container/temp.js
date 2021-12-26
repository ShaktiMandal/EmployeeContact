import React, { useContext,  useEffect} from 'react';
import { AppContext } from './appContext';


const Temp = () => {

    const {context} = useContext(AppContext);
    useEffect(()=> {
        console.log("Context in temp", context);
    })

    return (
        <h1>temp</h1>
    )
}


export default Temp;