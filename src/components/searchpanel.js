import React from 'react'
import classes from '../style/searchpanel.module.css'

//Generic serach panel component, can be used 
//anywhere in the application
const SearchPanel = (props) => {

    return (

        <div className={classes.searchpanel}>
            <input placeholder={props.placeholder} onKeyUp={props.onSearch} 
            style={{color: "black"}} type="text" width="300px"></input>
        </div>
    )
}

export default SearchPanel;