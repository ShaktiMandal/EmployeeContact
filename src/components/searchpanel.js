import React from 'react'
import classes from '../style/searchpanel.module.css'
const SearchPanel = (props) => {

    return (

        <div className={classes.searchpanel}>
            <input onKeyUp={props.onSearch} type="text" width="300px"></input>
        </div>
    )
}

export default SearchPanel;