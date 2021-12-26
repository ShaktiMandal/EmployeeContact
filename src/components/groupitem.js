import React from 'react'
import classes from '../style/item.module.css';

const GroupItem = (props) => {

    return (
        <div className={classes.item}>
            <div className={classes.details}>
                <p>{props.groupName}</p>
                <p>{props.description}</p>
            </div>
            <div className={classes.action}>
                 <button onClick={props.onAddConatct}>Add Conatct</button>
                 <button onClick={props.onGroupEdit}>Edit</button>
                 <button onClick={props.onRemoveGroup}>Remove</button>
            </div>
        </div>
    )
}

export default GroupItem;