import React from 'react';
import classes from '../style/item.module.css';


const Conatct = (props) => {

    return (
        <div className={classes.item}>
            <div className={classes.details}>
                <p>zsdasdasdasdasd adasdasdasd</p>
                <p>asdasdasdad asdasdasdasd asdasdasdasdasdad asASASAS</p>
            </div>
            <div className={classes.action}>
                 <button onClick={props.onConatctEdit}>Edit</button>
                 <button onClick={props.onRemoveContact}>Remove</button>
            </div>
        </div>
    )
}

export default Conatct;