import React from 'react';
import classes from '../style/item.module.css';

const ConatctItem = (props) => {

    return (
        <div className={classes.item}>
            <div className={classes.details}>
                <p>{props.email}</p>
                <p>{props.phoneNumber}</p>
            </div>
            <div className={classes.action}>
                 <button onClick={props.onConatctEdit}>Edit</button>
                 <button onClick={props.onRemoveContact}>Remove</button>
            </div>
        </div>
    )
}

export default ConatctItem;