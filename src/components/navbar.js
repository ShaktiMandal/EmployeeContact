import React, {useEffect, useRef, useState} from 'react';
import classes from '../style/navbar.module.css';

const Navbar = (props) => {

    
    const toggleNavRef = useRef(null);
  

    // this function is used to display item in case of mobile 
    // view by toggling the button
    const onClcik = function () {
      if (toggleNavRef.current.classList.contains("active")) {
        toggleNavRef.current.classList.remove("active");
        toggleNavRef.current.style.visibility = "hidden";
        toggleNavRef.current.style.opacity = "0";
        toggleNavRef.current.style.zIndex = "-1";
        toggleNavRef.current.style.transform = "translateY(-100%)";
      } else {
        toggleNavRef.current.classList.add("active");
        toggleNavRef.current.style.visibility = "visible";
        toggleNavRef.current.style.opacity = "1";
        toggleNavRef.current.style.zIndex = "2";
        toggleNavRef.current.style.transform = "translateY(0)";
      }
    };

    return (
        <div className={classes.siteheader}>
        <div className={classes.siteheaderwrapper}>
          <div className={classes.siteheaderstart}>
            <a href="/home" className={classes.brand}>Conatcts</a>
          </div>
          <div className={classes.siteheaderend}>
            <nav className={classes.nav}>
              <button   onClick={onClcik} className={classes.navtoggle} aria-expanded="false" type="button">
                menu
              </button>
              <ul className={classes.navwrapper} ref={toggleNavRef}>
                <li className={classes.navitem}><a href="/home/contact">Contacts</a></li>
                <li className={classes.navitem}><a href="/home/group">Groups</a></li>
                <li className={classes.navitem}><button onClick={props.onOpenGroup}>Create Group</button></li>
                <li className={classes.navitem}><button onClick={props.onSignOut}>Sign Out</button></li>
              </ul>
            </nav>            
          </div>
        </div>
      </div>
  
    )
}

export default Navbar;